# System Architecture

## Overview

This project implements a distributed data processing system for analyzing NYC Yellow Taxi trip data using the Hadoop MapReduce framework. The system processes large-scale Parquet-formatted taxi data to identify pickup hotspots across New York City boroughs and zones.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Data Input Layer                               │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐    ┌──────────────────────────────────┐    │
│  │ yellow_tripdata.parquet │    │  taxi_zone_lookup.csv            │    │
│  │ (Trip Records)          │    │  (Location Metadata)             │    │
│  └──────────┬──────────────┘    └─────────────┬────────────────────┘    │
│             │                                 │                         │
│             │ HDFS                            │ Distributed Cache       │
└─────────────┼─────────────────────────────────┼─────────────────────────┘
              │                                 │
              ▼                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Hadoop MapReduce Framework                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                    Input Format Layer                          │    │
│  │  ┌──────────────────────────────────────────────────────┐      │    │
│  │  │ ParquetInputFormat (with GroupReadSupport)           │      │    │
│  │  └──────────────────────────────────────────────────────┘      │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                             │                                          │
│                             ▼                                          │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │                    Map Phase                                  │     │
│  │  ┌──────────────────────────────────────────────────────┐     │     │
│  │  │ PickupLocationMapper                                 │     │     │
│  │  │  • Reads Parquet Group records                       │     │     │
│  │  │  • Extracts PULocationID                             │     │     │
│  │  │  • Validates data (null checks, type checks)         │     │     │
│  │  │  • Emits: (LocationID, 1)                            │     │     │
│  │  └──────────────────────────────────────────────────────┘     │     │
│  └───────────────────────────────────────────────────────────────┘     │
│                             │                                          │
│                             ▼                                          │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │                 Combine Phase (Optional)                      │     │
│  │  ┌──────────────────────────────────────────────────────┐     │     │
│  │  │ PickupLocationCombiner                               │     │     │
│  │  │  • Performs local aggregation                        │     │     │
│  │  │  • Reduces network traffic                           │     │     │
│  │  │  • Emits: (LocationID, partial_sum)                  │     │     │
│  │  └──────────────────────────────────────────────────────┘     │     │
│  └───────────────────────────────────────────────────────────────┘     │
│                             │                                          │
│                             ▼                                          │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │              Shuffle & Sort Phase                             │     │
│  │  • Groups all values by LocationID key                        │     │
│  │  • Handled automatically by Hadoop framework                  │     │
│  └───────────────────────────────────────────────────────────────┘     │
│                             │                                          │
│                             ▼                                          │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │                    Reduce Phase                               │     │
│  │  ┌──────────────────────────────────────────────────────┐     │     │
│  │  │ PickupLocationReducer                                │     │     │
│  │  │  Setup Phase:                                        │     │     │
│  │  │    • Loads taxi_zone_lookup.csv from cache           │     │     │
│  │  │    • Builds in-memory lookup map                     │     │     │
│  │  │  Reduce Phase:                                       │     │     │
│  │  │    • Sums all counts for each LocationID             │     │     │
│  │  │    • Enriches with zone name and borough             │     │     │
│  │  │    • Emits: ("Zone (Borough)", count)                │     │     │
│  │  └──────────────────────────────────────────────────────┘     │     │
│  └───────────────────────────────────────────────────────────────┘     │
│                                                                        │
└───────────────────────────────────────┬────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         Output Layer                                   │
├────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │  HDFS Output Directory                                        │     │
│  │    part-r-00000, part-r-00001, ...                            │     │
│  │    Format: "Zone Name (Borough)" \t count                     │     │
│  └───────────────────────────────────────────────────────────────┘     │
│                             │                                          │
│                             ▼                                          │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │  Post-Processing (Python)                                     │     │
│  │    • get_top_n.py - Extracts top N hotspots                   │     │
│  │    • analysis.py - Data exploration and validation            │     │
│  └───────────────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Data Input Layer

#### 1.1 Trip Data (Parquet Format)
- **Source**: NYC TLC Yellow Taxi Trip Records
- **Format**: Apache Parquet (columnar storage)
- **Storage**: HDFS
- **Key Fields**: 
  - `PULocationID` (Pickup Location ID)
  - Trip metadata (timestamps, distances, fares, etc.)
- **Advantages**:
  - Efficient columnar storage
  - Built-in compression
  - Schema preservation
  - Fast read performance for selective column access

#### 1.2 Zone Lookup Data (CSV)
- **Source**: NYC TLC Taxi Zone Lookup Table
- **Format**: CSV
- **Distribution**: Hadoop Distributed Cache
- **Schema**:
  - LocationID (integer)
  - Borough (string)
  - Zone (string)
  - Service Zone (string)
- **Purpose**: Enrichment of location IDs with human-readable names

### 2. Hadoop MapReduce Framework

#### 2.1 Driver Class: `NYCTaxiDriver`
**Responsibilities**:
- Job configuration and initialization
- Input/output path specification
- Format specification (ParquetInputFormat)
- Mapper, Combiner, Reducer class assignment
- Distributed cache setup for lookup data
- Job execution and monitoring

**Configuration Details**:
```java
- InputFormat: ParquetInputFormat with GroupReadSupport
- Mapper: PickupLocationMapper
- Combiner: PickupLocationCombiner
- Reducer: PickupLocationReducer
- Map Output: <IntWritable, IntWritable>
- Final Output: <Text, IntWritable>
```

#### 2.2 Map Phase: `PickupLocationMapper`

**Input**: `<LongWritable, Group>` (offset, Parquet record)
**Output**: `<IntWritable, IntWritable>` (LocationID, 1)

**Processing Logic**:
1. **Null Validation**: Check if input Group record is null
2. **Schema Validation**: Verify `PULocationID` field exists
3. **Type Validation**: Ensure field is INT32 or INT64
4. **Value Extraction**: Read `PULocationID` value
5. **Data Validation**: Filter invalid IDs (≤ 0)
6. **Emission**: Emit (LocationID, 1) for each valid record

**Error Handling**:
- Comprehensive counter tracking for various error types
- Graceful handling of malformed records
- Detailed error logging to stderr
- Counter categories:
  - `MapperErrors.NullInputGroupRecord`
  - `MapperErrors.Missing_PULocationID_Field_In_Record_Schema`
  - `MapperErrors.PULocationID_Not_IntegerType`
  - `MapperInfo.InvalidPULocationID_Value_NonPositive`
  - `MapperInfo.PULocationID_Field_PresentButNullOrEmpty`

#### 2.3 Combine Phase: `PickupLocationCombiner`

**Input**: `<IntWritable, Iterable<IntWritable>>` (LocationID, list of 1s)
**Output**: `<IntWritable, IntWritable>` (LocationID, partial_sum)

**Purpose**:
- **Network Optimization**: Reduces data transfer between Map and Reduce phases
- **Performance**: Performs local aggregation on mapper nodes
- **Scalability**: Critical for large datasets with many duplicate keys

**Processing Logic**:
1. Sum all values for each LocationID within a single mapper
2. Emit aggregated count per location
3. Reduces intermediate data size significantly

#### 2.4 Shuffle & Sort Phase (Framework-Managed)
- Automatic grouping of all values by key (LocationID)
- Sorting of keys for efficient reducer processing
- Network transfer of data from mappers to reducers
- Partitioning across reducers for parallel processing

#### 2.5 Reduce Phase: `PickupLocationReducer`

**Input**: `<IntWritable, Iterable<IntWritable>>` (LocationID, counts)
**Output**: `<Text, IntWritable>` ("Zone (Borough)", total_count)

**Setup Phase**:
1. **Cache File Retrieval**: Access distributed cache files
2. **Lookup Table Loading**: Parse `taxi_zone_lookup.csv`
3. **In-Memory Map Construction**: Build HashMap<LocationID, [Borough, Zone]>
4. **Validation**: Check for empty lookup data

**Reduce Phase**:
1. **Aggregation**: Sum all counts for each LocationID
2. **Lookup**: Retrieve zone name and borough from in-memory map
3. **Enrichment**: Format output as "Zone Name (Borough)"
4. **Fallback Handling**: Use default values for unknown LocationIDs
5. **Emission**: Write enriched data to output

**Error Handling**:
- Counters for tracking lookup misses
- Default values for missing zone data
- Comprehensive error logging
- Counter categories:
  - `ReducerSetup.ZoneLookupEmpty`
  - `LookupParseErrors.EmptyFile`
  - `LookupParseErrors.MalformedLocationID`
  - `LookupParseErrors.MissingFields`
  - `LookupErrors.IDNotFoundInCache`

### 3. Data Flow

```
Input: yellow_tripdata_2016-01.parquet (10+ GB, millions of records)
         ↓
    [Split by HDFS blocks - typically 128MB or 256MB chunks]
         ↓
    [Map Tasks - One per split]
         ├─ Mapper 1: Processes Split 1 → Emits (LocationID, 1) pairs
         ├─ Mapper 2: Processes Split 2 → Emits (LocationID, 1) pairs
         └─ Mapper N: Processes Split N → Emits (LocationID, 1) pairs
         ↓
    [Combiner Tasks - Local aggregation per mapper]
         ├─ Combiner 1: (237, [1,1,1,...]) → (237, 150)
         └─ Combiner N: (237, [1,1,1,...]) → (237, 180)
         ↓
    [Shuffle & Sort - Framework groups by key]
         LocationID 237: [150, 180, 220, ...]
         LocationID 161: [300, 250, 275, ...]
         ↓
    [Reduce Tasks - Parallel processing]
         ├─ Reducer 1: 
         │    LocationID 237 → Sum: 550 → Lookup → "Upper East Side South (Manhattan)" 550
         ├─ Reducer 2:
         │    LocationID 161 → Sum: 825 → Lookup → "Midtown Center (Manhattan)" 825
         └─ Reducer N: ...
         ↓
Output: part-r-00000, part-r-00001, ... (Text files in HDFS)
```

### 4. Technology Stack

#### 4.1 Core Technologies
- **Java 8**: Primary programming language
- **Hadoop 3.3.4**: Distributed processing framework
- **Apache Parquet 1.12.3**: Columnar file format
- **Maven**: Build and dependency management

#### 4.2 Hadoop Components
- **HDFS**: Distributed file system for data storage
- **YARN**: Resource management and job scheduling
- **MapReduce**: Distributed processing paradigm

#### 4.3 Supporting Technologies
- **Python 3.x**: Data investigation and post-processing
- **Pandas**: DataFrame operations for analysis
- **PyArrow**: Parquet file reading in Python

### 5. Build and Deployment

#### 5.1 Build Process (Maven)
```xml
<build>
  <plugins>
    <maven-compiler-plugin> (Java 1.8 compilation)
    <maven-shade-plugin> (Uber JAR creation with dependencies)
  </plugins>
</build>
```

**Output**: `NYCTaxiAnalysis-1.0-SNAPSHOT.jar` (Fat JAR with all dependencies)

#### 5.2 Deployment Architecture
```
Client Machine (Job Submission)
    ↓ (Submit JAR + arguments)
ResourceManager (YARN)
    ↓ (Allocate resources)
ApplicationMaster
    ↓ (Request containers)
NodeManagers (Worker Nodes)
    ├─ Map Containers (Run mapper tasks)
    ├─ Reduce Containers (Run reducer tasks)
    └─ Distributed Cache (Shared lookup data)
```

### 6. Performance Optimizations

#### 6.1 Combiner Usage
- **Impact**: Reduces network I/O by up to 70-90%
- **Mechanism**: Local pre-aggregation on mapper nodes
- **Trade-off**: Minimal CPU overhead for significant network savings

#### 6.2 Parquet Format
- **Column Pruning**: Read only `PULocationID` column (not all 19 columns)
- **Compression**: Built-in encoding reduces storage and I/O
- **Predicate Pushdown**: Potential for future filtering optimizations

#### 6.3 Distributed Cache
- **Purpose**: Share small lookup data (265 zones) across all tasks
- **Benefit**: Avoid redundant HDFS reads per task
- **Memory**: In-memory HashMap for O(1) lookup performance

#### 6.4 Data Locality
- **HDFS Block Placement**: Mappers scheduled on nodes with data blocks
- **Rack Awareness**: Minimizes cross-rack network traffic
- **Speculative Execution**: Handles straggler tasks

### 7. Scalability Considerations

#### 7.1 Horizontal Scalability
- **Mappers**: Scales linearly with input data size
- **Reducers**: Configurable based on distinct LocationID count
- **Cluster Size**: Can process TBs of data across hundreds of nodes

#### 7.2 Data Partitioning
- **Input Splits**: Automatic partitioning by HDFS block boundaries
- **Key Distribution**: Hash partitioning for reducer load balancing
- **Skew Handling**: Potential issue if few locations dominate (e.g., Manhattan)

#### 7.3 Resource Configuration
```
Typical Configuration:
- Map Memory: 2-4 GB per task
- Reduce Memory: 4-8 GB per task
- Map Tasks: ~100-1000 concurrent
- Reduce Tasks: ~10-100 concurrent
```

### 8. Monitoring and Observability

#### 8.1 Hadoop Counters
- **Built-in**: Records read, bytes written, spilled records
- **Custom**: 
  - Mapper error tracking (null records, schema issues)
  - Reducer lookup statistics (cache hits/misses)
  - Data quality metrics (invalid IDs)

#### 8.2 Job History Server
- Task-level execution times
- Resource utilization graphs
- Failed task diagnostics
- Counter summaries

#### 8.3 YARN ResourceManager UI
- Real-time job progress
- Container logs
- Application metrics
- Queue status

### 9. Data Quality and Validation

#### 9.1 Input Validation (Mapper)
- Null record detection
- Schema conformance checks
- Type validation
- Range validation (LocationID > 0)

#### 9.2 Output Validation
- Missing zone ID detection
- Default value assignment
- Comprehensive logging

#### 9.3 Post-Processing Validation
- Python scripts for result verification
- Top-N extraction with sorting
- Statistical analysis

### 10. Extension Points

#### 10.1 Future Enhancements
1. **Time-based Analysis**: Add pickup time as secondary key
2. **Multi-dimensional Analysis**: Include drop-off locations
3. **Real-time Processing**: Migrate to Spark Streaming
4. **Visualization**: Direct integration with BI tools
5. **Machine Learning**: Predictive hotspot modeling

#### 10.2 Alternative Architectures
- **Spark**: For iterative processing and ML
- **Hive**: For SQL-like querying
- **Flink**: For stream processing
- **Presto**: For interactive analytics

