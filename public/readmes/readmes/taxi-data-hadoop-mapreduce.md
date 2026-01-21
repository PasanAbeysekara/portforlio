# NYC Taxi Pickup Hotspot Analysis using Hadoop MapReduce

[![Hadoop](https://img.shields.io/badge/Hadoop-3.3.x-yellow)](https://hadoop.apache.org/)
[![Java](https://img.shields.io/badge/Java-1.8+-blue)](https://www.java.com/)
[![Maven](https://img.shields.io/badge/Maven-3.x-red)](https://maven.apache.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)


## 🚖 Project Overview

This project implements a distributed data processing system using **Hadoop MapReduce** to analyze NYC Yellow Taxi trip data and identify pickup hotspots across New York City. By processing **10.9 million trip records** from January 2016, we extract meaningful insights about taxi demand patterns across NYC's 265 taxi zones.

**Key Achievements:**
- ✅ Processed 10.9M+ trip records using Hadoop MapReduce
- ✅ 99.77% reduction in network traffic using Combiner optimization
- ✅ Identified top pickup hotspots across Manhattan, Queens, Brooklyn, Bronx, and Staten Island
- ✅ Successfully handled Parquet format data in MapReduce
- ✅ Implemented efficient reduce-side join using Distributed Cache

**📄 [Download Full Report (PDF)](./Group_03_DOC.pdf)**

---

## 📚 Documentation

This project includes comprehensive documentation organized into focused documents:

| Document | Description |
|----------|-------------|
| **demo.md** | 🚀 **Start Here!** Complete setup guide, execution steps, and results visualization |
| **architecture.md** | 🏗️ Detailed system architecture, component design, and data flow |
| **challenges.md** | 💡 Technical challenges faced, solutions implemented, and lessons learned |
| **README.md** | 📖 This file - Project overview and quick reference |

---

## Table of Contents

*   [Quick Start](#quick-start)
*   [Project Objective](#project-objective)
*   [Dataset Information](#dataset-information)
*   [MapReduce Implementation](#mapreduce-implementation)
*   [Project Structure](#project-structure)
*   [Key Results](#key-results)
*   [Documentation Links](#documentation-links)
*   [Contributing](#contributing)

---

## Quick Start

Get started in 5 minutes! For detailed setup instructions, see **demo.md**.

**Prerequisites:** Java 1.8+, Maven 3.x, Hadoop 3.3.x, Git

```bash
# 1. Clone and build
git clone https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce
cd Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/NYCTaxiAnalysis
mvn clean package
cd ..

# 2. Download data files (place in ./data/ directory)
# - yellow_tripdata_2016-01.parquet (1.5 GB)
# - taxi_zone_lookup.csv (10 KB)

# 3. Upload to HDFS (replace <username>)
hdfs dfs -put ./data/yellow_tripdata_2016-01.parquet /user/<username>/nyctaxi_input/
hdfs dfs -put ./data/taxi_zone_lookup.csv /user/<username>/nyctaxi_lookup/

# 4. Run MapReduce job
hadoop jar NYCTaxiAnalysis/target/NYCTaxiAnalysis-1.0-SNAPSHOT.jar com.nyctaxi.NYCTaxiDriver \
  /user/<username>/nyctaxi_input/yellow_tripdata_2016-01.parquet \
  /user/<username>/nyctaxi_output \
  /user/<username>/nyctaxi_lookup/taxi_zone_lookup.csv

# 5. View results
hdfs dfs -getmerge /user/<username>/nyctaxi_output ./final_output.txt
python3 DataInvestigation/get_top_n.py ./final_output.txt
```

📖 **Need help?** See the complete setup guide in **demo.md**

---

## Project Objective

![NYC Taxi](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/raw/main/images/nyc-taxi-banner.jpg)

**Goal:** Identify the busiest taxi pickup locations in New York City by analyzing 10.9 million trip records from January 2016.

**Why Hadoop MapReduce?**
- **Scale:** Processing 10.9M records (~1.5 GB) efficiently
- **Distributed Processing:** Parallel map and reduce tasks across cluster
- **Fault Tolerance:** Automatic task retry and recovery
- **Scalability:** Can handle TB-scale datasets with more nodes

**Task Breakdown:**
1. **Count** pickups for each distinct taxi zone (265 zones)
2. **Join** counts with lookup table for human-readable names
3. **Identify** top N busiest zones

This aligns with classic MapReduce patterns: aggregation, counting, and joining distributed data.

---

## 📊 Dataset Information

We use publicly available data from the **NYC Taxi & Limousine Commission (TLC)**:

### NYC Yellow Taxi Trip Data
- **Source:** [NYC TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page)
- **File:** `yellow_tripdata_2016-01.parquet` (January 2016)
- **Format:** Apache Parquet (columnar, compressed)
- **Size:** ~1.5 GB, **10,905,067 records**
- **Key Field:** `PULocationID` (Pickup Location ID)
- **Download:** [yellow_tripdata_2016-01.parquet](https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2016-01.parquet)

### Taxi Zone Lookup Table
- **File:** `taxi_zone_lookup.csv`
- **Format:** CSV
- **Size:** ~10 KB, 265 zones
- **Fields:** `LocationID`, `Borough`, `Zone`, `service_zone`
- **Purpose:** Map numeric IDs to zone names and boroughs
- **Download:** [taxi_zone_lookup.csv](https://d37ci6vzurychx.cloudfront.net/misc/taxi_zone_lookup.csv)

**Why This Dataset?**
✅ Public and well-documented  
✅ Large-scale (10.9M records >> 100K minimum)  
✅ Real-world complexity (19 fields, multiple types)  
✅ Requires distributed processing  
✅ Demonstrates MapReduce joins with lookup data  

**Data Quality:**
- Valid records: 99.97%
- Invalid/null LocationIDs: 0.03%
- All 261 active zones successfully mapped

---

## 🔧 MapReduce Implementation

### High-Level Architecture

```
Input (Parquet) → Mapper → Combiner → Shuffle & Sort → Reducer → Output (Text)
     ↓              ↓          ↓                          ↓           ↓
 10.9M records  (ID, 1)  (ID, sum)    Group by ID    Join lookup  Zone counts
```

### Component Overview

| Component | Input | Process | Output |
|-----------|-------|---------|--------|
| **Mapper** | Parquet `Group` | Extract `PULocationID` | `(LocationID, 1)` |
| **Combiner** | `(ID, [1,1,1...])` | Local aggregation | `(ID, partial_sum)` |
| **Reducer** | `(ID, [sum1, sum2...])` | Final sum + lookup join | `("Zone (Borough)", count)` |

### Key Features

🎯 **Parquet Integration**
- Uses `ParquetInputFormat` with `GroupReadSupport`
- Efficient columnar reading (only `PULocationID` column)
- Handles INT32/INT64 type variations

🚀 **Combiner Optimization**
- Reduces network shuffle by **99.77%** (87 MB → 200 KB)
- Critical for performance on large datasets
- Speeds up job by **34%**

💾 **Distributed Cache Join**
- Lookup table loaded into memory on each reducer
- O(1) HashMap lookup performance
- Efficient for small dimension tables

🛡️ **Error Handling**
- Comprehensive null checks and validation
- Hadoop counters for monitoring data quality
- Graceful degradation (skip bad records, don't fail)

**For detailed architecture**, see **architecture.md**

---

## 📁 Project Structure

```

.
├── architecture.md                 # 🏗️ Detailed system architecture documentation
├── challenges.md                   # 💡 Challenges faced and solutions
├── demo.md                         # 🚀 Complete setup and execution guide
├── README.md                       # 📖 This file - Project overview
├── DataInvestigation/              # Data exploration and analysis scripts
│   ├── analysis.py                 # Dataset exploration script
│   └── get_top_n.py                # Extract and display top N results
├── NYCTaxiAnalysis/                # Core MapReduce Java project
│   ├── pom.xml                     # Maven build configuration
│   └── src/main/java/com/nyctaxi/
│       ├── NYCTaxiDriver.java      # Job configuration and execution
│       ├── PickupLocationMapper.java     # Extract PULocationID → (ID, 1)
│       ├── PickupLocationCombiner.java   # Local aggregation
│       └── PickupLocationReducer.java    # Final aggregation + join
├── images/                         # Screenshots and evidence
├── install_prerequisites.sh        # Linux/macOS installation script
└── install_prerequisites.bat       # Windows installation script
```

---

## 🏆 Key Results

### Top 5 Busiest Pickup Locations (January 2016)

| Rank | Zone | Borough | Pickups |
|------|------|---------|---------|
| 1 | Upper East Side South | Manhattan | 411,853 |
| 2 | Midtown Center | Manhattan | 392,997 |
| 3 | Upper East Side North | Manhattan | 390,744 |
| 4 | Times Sq/Theatre District | Manhattan | 366,641 |
| 5 | Union Sq | Manhattan | 365,252 |

![Top 20 Results](images/top-20-results.png)

### Key Insights

📍 **Manhattan Dominance**
- 18 of top 20 locations are in Manhattan
- ~70-75% of all taxi pickups occur in Manhattan
- Business and tourist hubs drive demand

🚇 **Transportation Hubs**
- Penn Station (#8): 356,337 pickups
- LaGuardia Airport (#17): 262,277 pickups
- JFK Airport (#19): 247,243 pickups

🎭 **Entertainment Districts**
- Times Square/Theatre District (#4)
- East Village (#7)
- West Village (#20)

### Performance Metrics

| Metric | Value |
|--------|-------|
| **Records Processed** | 10,905,067 |
| **Job Duration** | ~8-12 minutes |
| **Network Reduction** | 99.77% (with Combiner) |
| **Data Quality** | 99.97% valid records |
| **Output Zones** | 261 active zones |

**For complete results and insights**, see **demo.md**

---

## 📚 Documentation Links

Comprehensive documentation is organized across multiple files:

### 🚀 [demo.md](demo.md) - Setup and Execution Guide
**Start here for hands-on setup!**
- Prerequisite installation (Linux/macOS/Windows)
- Step-by-step execution instructions
- Hadoop environment setup
- Job submission and monitoring
- Results visualization
- Troubleshooting common issues

### 🏗️ [architecture.md](architecture.md) - System Architecture
**Deep dive into technical design**
- Complete architecture diagrams
- Component-level details (Mapper, Combiner, Reducer)
- Data flow and processing pipeline
- Technology stack and dependencies
- Performance optimizations
- Scalability considerations
- Monitoring and observability

### 💡 [challenges.md](challenges.md) - Challenges and Solutions
**Learn from our experience**
- Parquet file processing challenges
- Distributed cache implementation
- Data quality and validation
- Performance optimization (99.77% network reduction)
- Memory management
- Environment setup complexity
- Testing and debugging strategies
- Lessons learned and best practices

---

## 🤝 Contributing

This is an academic project completed for EC7205 Cloud Computing. For questions or suggestions:

- **Project Team:**
  - Abeysekara P.K. (EG/2020/3799)
  - Aralugaswaththa S.V.C.R.P (EG/2020/3827)
  - De Silva K.B.L.H. (EG/2020/3882)

- **Repository:** [GitHub - Taxi-Pickup-Hotspot-Analysis](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce)

---

## 📄 License

This project is developed for academic purposes as part of EC7205 Cloud Computing coursework.

---

## 🙏 Acknowledgments

- **NYC TLC** for providing open taxi trip data
- **Apache Hadoop** community for excellent documentation
- **University of Moratuwa** for EC7205 Cloud Computing module

---

**Ready to get started?** Head to **demo.md** for the complete setup guide!
    Terminal output during job execution:
    ![Job Submission & Progress 1](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/raw/main/images/job-execution-progress-1.png)
    ![Job Submission & Progress 2](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/raw/main/images/job-execution-progress-2.png)

    YARN ResourceManager UI showing application status:
    ![YARN App Running/Completed 1](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/raw/main/images/yarn-app-status-1.png)
    ![YARN App Running/Completed 2](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/raw/main/images/yarn-app-status-2.png)

### d. Execution Output Evidence:

Evidence of successful execution is provided through logs and output samples.

- **MapReduce Job Log / YARN UI for Counters:**
  The YARN UI provides detailed counters demonstrating the data flow and successful completion of the job.
  ![Job Counters 1](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/raw/main/images/job-counters-1.png)
  ![Job Counters 2](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/raw/main/images/job-counters-2.png)

- **Output Sample (from HDFS):**
  A sample of the direct output from the reducer, stored in HDFS:
  ```bash
  hdfs dfs -cat /user/<your_username>/nyctaxi_output/part-r-00000 | head -n 10
  ```
  Terminal showing HDFS output sample:
  ![HDFS Output Sample 1](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/raw/main/images/hdfs-output-sample-1.png)
  ![HDFS Output Sample 2](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/raw/main/images/hdfs-output-sample-2.png)

## 5. Results Interpretation & Insights

The MapReduce job successfully processed all 10,905,067 records from the January 2016 taxi trip dataset. The output provides a count of taxi pickups for 261 distinct taxi zones, which were then mapped to their respective names and boroughs.

### a. Summary of Results:

The primary output is a list of taxi zones ranked by their total pickup counts. To view the ranked list, use the `get_top_n.py` script as described in the [Quick Start](#quick-start-get-up-and-running) (Step 6) or [Section 4.c](#c-steps-to-run-detailed).

The Top 20 busiest pickup locations for January 2016 are:

1.  Upper East Side South (Manhattan): 411,853 pickups
2.  Midtown Center (Manhattan): 392,997 pickups
3.  Upper East Side North (Manhattan): 390,744 pickups
4.  Times Sq/Theatre District (Manhattan): 366,641 pickups
5.  Union Sq (Manhattan): 365,252 pickups
6.  Midtown East (Manhattan): 363,725 pickups
7.  East Village (Manhattan): 361,127 pickups
8.  Penn Station/Madison Sq West (Manhattan): 356,337 pickups
9.  Murray Hill (Manhattan): 346,698 pickups
10. Clinton East (Manhattan): 337,406 pickups
11. Lincoln Square East (Manhattan): 304,218 pickups
12. Midtown North (Manhattan): 291,486 pickups
13. Gramercy (Manhattan): 279,824 pickups
14. Upper West Side South (Manhattan): 271,939 pickups
15. Midtown South (Manhattan): 263,255 pickups
16. Lenox Hill West (Manhattan): 263,139 pickups
17. LaGuardia Airport (Queens): 262,277 pickups
18. East Chelsea (Manhattan): 261,688 pickups
19. JFK Airport (Queens): 247,243 pickups
20. West Village (Manhattan): 240,500 pickups

Screenshot of the terminal output from the `get_top_n.py` script:
![Top 20 Results](https://github.com/PasanAbeysekara/Taxi-Pickup-Hotspot-Analysis-using-Hadoop-MapReduce/raw/main/images/top-20-results.png)

### b. Patterns and Insights Discovered:

*   **Manhattan Dominance:** A significant majority of the busiest pickup locations are situated in Manhattan. This underscores Manhattan's role as the central business, entertainment, and residential hub of NYC, generating high taxi demand.
*   **Key Hubs:** Areas like Midtown (Center, East, North, South), Upper East/West Sides, Times Square/Theatre District, and financial/transportation hubs like Penn Station consistently appear at the top. This is expected due to high population density, tourist activity, and commuter traffic.
*   **Airport Traffic:** Both LaGuardia Airport and JFK Airport are prominent in the top 20, reflecting their importance as major transit points.
*   **Skewed Distribution:** The pickup counts are heavily skewed. A relatively small number of zones account for a disproportionately large share of the total pickups, while many other zones have significantly lower activity. For example, the top zone has over 400,000 pickups, while zones further down the list have far fewer.

### c. Performance and Accuracy Observations:

*   **Performance:**
    *   The job efficiently processed ~10.9 million records. The strategic use of a **Combiner** was vital for performance, significantly reducing data shuffled to reducers (from ~10.9M map output records to ~1.2K combine output records), thereby speeding up the overall job.
    *   Reading from Parquet (a columnar format) is efficient for queries accessing a limited subset of columns.
    *   The DistributedCache mechanism for the lookup table join is an efficient method for handling small auxiliary datasets in MapReduce.
*   **Accuracy:**
    *   The core MapReduce logic (map-combine-reduce for counting) is a standard and accurate approach for this aggregation task.
    *   The join logic's accuracy relies on the `taxi_zone_lookup.csv`. The Reducer's robust CSV parsing (handling quotes, empty fields, trimming) ensures correct mapping of IDs to names.
    *   Hadoop counters such as `ReducerSetup -> ZoneLookupEntriesLoaded` (265) and `Reduce output records` (261) align with expectations for the dataset, indicating correct processing. The minor difference (265 lookup entries vs. 261 zones with pickups) is typical, as not all defined zones may have activity in a given period.
    *   The final successful run showed no significant error counts for critical operations like lookup ID mismatches or parsing errors, indicating high data integrity and correct processing.

## 6. Troubleshooting/Challenges Faced

Several challenges were encountered and overcome during the development of this project:
*   **Reading Parquet in Java MapReduce:** This required careful management of Parquet-related dependencies in the `pom.xml` file and correct configuration of `ParquetInputFormat` with `GroupReadSupport` in the Hadoop job driver.
*   **NullPointerExceptions in Mapper:** Early iterations faced NPEs when mappers attempted to access fields from Parquet `Group` objects. This was resolved through:
    *   Correcting type casting (e.g., ensuring `org.apache.parquet.schema.Type` was cast to `GroupType` before attempting to retrieve field lists).
    *   Implementing robust `null` checks for the `Group` object itself at the beginning of the `map` method, as the `ParquetInputFormat` can, under certain conditions (like empty or malformed splits), pass null record objects. Extensive use of logging and examining task logs via the YARN UI was critical for diagnosing these issues.
*   **DistributedCache File Handling:** Ensuring the `taxi_zone_lookup.csv` was correctly added to the DistributedCache and then accessed properly within the Reducer's `setup()` method. The key was to use the local file name (as it appears on the task node's local filesystem) rather than its HDFS path when opening the file reader.
*   **CSV Parsing Robustness:** The initial CSV parsing logic for the lookup table was simplistic. It was iteratively improved to be more robust against common CSV issues, such as inconsistent quoting, leading/trailing whitespace, and empty fields for borough or zone names, by adding trimming and default value assignments.
*   **Hadoop Environment Configuration:** Standard troubleshooting of a local Hadoop single-node setup, ensuring all necessary daemons (NameNode, DataNode, ResourceManager, NodeManager, JobHistoryServer) were running correctly and that HDFS paths were accessible.

This project provides a practical demonstration of applying Hadoop MapReduce to analyze a significant volume of real-world data, successfully navigating common challenges in Big Data processing to extract meaningful and actionable insights.