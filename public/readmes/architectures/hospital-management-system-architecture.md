# Hospital Management System - Architecture Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Pattern](#architecture-pattern)
3. [Technology Stack](#technology-stack)
4. [System Components](#system-components)
5. [Data Architecture](#data-architecture)
6. [Application Layers](#application-layers)
7. [Key Design Decisions](#key-design-decisions)
8. [Security Architecture](#security-architecture)
9. [Deployment Architecture](#deployment-architecture)

---

## System Overview

The Hospital Management System is a comprehensive desktop application built using WPF (Windows Presentation Foundation) that provides an integrated solution for managing hospital operations. The system is designed to handle patient records, appointments, prescriptions, billing, staff management, and inventory tracking.

### Key Features
- Patient management and medical history tracking
- Doctor and staff management
- Appointment scheduling and management
- Prescription management with drugs and medical tests
- Billing and invoicing system
- User authentication with role-based access control
- Inventory management for drugs and medical supplies
- Comprehensive reporting and analytics

---

## Architecture Pattern

### MVVM (Model-View-ViewModel) Pattern

The application strictly follows the **MVVM architectural pattern**, which provides excellent separation of concerns and testability:

```
┌────────────────────────────────────────────────┐
│                     View                       │
│  (XAML + Code-behind for UI-specific logic)    │
└────────────────┬───────────────────────────────┘
                 │ Data Binding
                 │ Commands
┌────────────────▼───────────────────────────────┐
│                 ViewModel                      │
│  (Presentation Logic, Commands, Properties)    │
└────────────────┬───────────────────────────────┘
                 │ Business Logic
                 │ Data Operations
┌────────────────▼────────────────────────────────┐
│                   Model                         │
│  (Business Entities, Data Access, Domain Logic) │
└─────────────────────────────────────────────────┘
```

#### Benefits of MVVM Implementation:
- **Separation of Concerns**: UI logic separated from business logic
- **Testability**: ViewModels can be unit tested independently
- **Maintainability**: Changes in UI don't affect business logic
- **Code Reusability**: ViewModels can be reused across different views
- **Designer-Developer Workflow**: Designers work on XAML, developers on ViewModels

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **.NET** | 7.0 | Core framework |
| **WPF** | .NET 7.0-windows | UI framework |
| **C#** | 11.0 | Programming language |
| **SQLite** | Via EF Core 7.0.4 | Database engine |
| **Entity Framework Core** | 7.0.4 | ORM (Object-Relational Mapping) |

### Key NuGet Packages

```xml
<PackageReference Include="CommunityToolkit.Mvvm" Version="8.1.0" />
<PackageReference Include="FontAwesome.Sharp" Version="6.3.0" />
<PackageReference Include="FontAwesome.WPF" Version="4.7.0.9" />
<PackageReference Include="MahApps.Metro.IconPacks.Material" Version="4.11.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="7.0.4" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="7.0.4" />
<PackageReference Include="Prism.Core" Version="8.1.97" />
```

### Supporting Libraries
- **CommunityToolkit.Mvvm**: Provides MVVM helpers and base classes
- **FontAwesome**: Icon libraries for modern UI
- **MahApps.Metro.IconPacks**: Additional material design icons
- **Prism.Core**: MVVM framework support

---

## System Components

### 1. View Layer (UI Components)

#### Admin Views
- `AdminWindow.xaml` - Main admin dashboard
- `AdminDoctors.xaml` - Doctor management interface
- `AdminDrugs.xaml` - Drug inventory management
- `AdminTests.xaml` - Medical test management
- `AdminUsers.xaml` - User account management

#### User Views
- `NormalUserWindow.xaml` - Standard user dashboard
- `UserDashboard.xaml` - User home screen
- `UserPatients.xaml` - Patient list and management
- `UserAppointments.xaml` - Appointment scheduling
- `UserPrescriptions.xaml` - Prescription management
- `UserBilling.xaml` - Billing and invoicing

#### Common Views
- `MainWindow.xaml` - Login window
- `AddPatientWindow.xaml` - Patient registration
- `SplashScreenWindow.xaml` - Application startup screen

### 2. ViewModel Layer (Presentation Logic)

Each view has a corresponding ViewModel that handles:
- Data presentation logic
- User input validation
- Command execution
- Data binding properties
- State management

**Key ViewModels:**
- `MainWindowVM.cs` - Login logic and initialization
- `AdminWindowVM.cs` - Admin dashboard orchestration
- `AddPatientWindowVM.cs` - Patient creation logic
- `AddDoctorWindowVM.cs` - Doctor registration
- `AddPrescriptionWindowVM.cs` - Prescription creation
- `UserDashboardVM.cs` - User dashboard logic

### 3. Model Layer (Domain Entities)

#### Core Entities

```csharp
// Patient Entity
public class Patient
{
    public int Id { get; set; }
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public string? BirthDay { get; set; }
    public string? Phone { get; set; }
    public char Gender { get; set; }
    public string? BloodGroup { get; set; }
    public string? Address { get; set; }
    public double Weight { get; set; }
    public double Height { get; set; }
    public DateTime AdmittedDate { get; set; }
    
    // Navigation Properties
    public virtual ICollection<Prescription>? Prescriptions { get; set; }
    public virtual ICollection<Appointment>? Appointments { get; set; }
    public virtual Bill? Bill { get; set; }
}

// Doctor Entity
public class Doctor
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public double Fee { get; set; }
    public virtual ICollection<Appointment>? Appointments { get; set; }
}
```

#### Entity Relationships

```
Patient (1) ──┬── (N) Appointments
              ├── (N) Prescriptions
              └── (1) Bill

Doctor (1) ──── (N) Appointments

Prescription (1) ──┬── (N) Dosages (Drug prescriptions)
                   └── (N) MedicalTests

Drug (1) ──── (N) Dosages
Test (1) ──── (N) MedicalTests
```

**All Entities:**
- `Patient.cs` - Patient information
- `Doctor.cs` - Doctor details
- `Appointment.cs` - Appointment records
- `Prescription.cs` - Medical prescriptions
- `Drug.cs` - Drug catalog
- `Dosage.cs` - Drug dosage in prescriptions
- `Test.cs` - Medical test catalog
- `MedicalTest.cs` - Tests in prescriptions
- `Bill.cs` - Billing information
- `User.cs` - System user accounts

---

## Data Architecture

### Database Design

**Database Engine:** SQLite  
**ORM:** Entity Framework Core 7.0.4

#### Database Context

```csharp
public class DataContext : DbContext
{
    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Drug> Drugs { get; set; }
    public DbSet<Dosage> Dosages { get; set; }
    public DbSet<Test> Tests { get; set; }
    public DbSet<MedicalTest> MedicalTests { get; set; }
    public DbSet<Prescription> Prescriptions { get; set; }
    public DbSet<Patient> Patients { get; set; }
    public DbSet<Bill> Bills { get; set; }
    public DbSet<User> Users { get; set; }
}
```

### Database Location
- Database file: `testHospital.db`
- Location: Project root directory (relative path)
- Connection: File-based SQLite database

### Migrations

The application uses Entity Framework migrations for database schema management:

```
Migrations/
├── 20230405082020_initial.cs
├── 20230408104841_FirstOne.cs
├── 20230408105026_MigrationTwo.cs
├── 20230408110432_MIGnew.cs
├── 20230408110654_MIGnew2.cs
└── DataContextModelSnapshot.cs
```

### Data Access Pattern

**Repository Pattern through EF Core:**
- Direct DbContext access in ViewModels
- LINQ queries for data retrieval
- Change tracking for updates
- Transaction support via SaveChanges()

---

## Application Layers

### Layer Structure

```
┌──────────────────────────────────────────────────┐
│           Presentation Layer (View)              │
│  • XAML files                                    │
│  • Code-behind for UI events                     │
│  • Custom controls and themes                    │
└─────────────────┬────────────────────────────────┘
                  │
┌─────────────────▼────────────────────────────────┐
│        Application Layer (ViewModel)             │
│  • Presentation logic                            │
│  • Command handlers                              │
│  • Data binding properties                       │
│  • Input validation                              │
└─────────────────┬────────────────────────────────┘
                  │
┌─────────────────▼────────────────────────────────┐
│          Domain Layer (Model)                    │
│  • Business entities                             │
│  • Domain logic                                  │
│  • Validation rules                              │
└─────────────────┬────────────────────────────────┘
                  │
┌─────────────────▼────────────────────────────────┐
│       Data Access Layer (DbContext)              │
│  • Entity Framework Core                         │
│  • Database migrations                           │
│  • Data persistence                              │
└──────────────────────────────────────────────────┘
```

---

## Key Design Decisions

### 1. Desktop Application Choice (WPF)
**Rationale:**
- Rich UI capabilities for complex medical data visualization
- Better performance for desktop scenarios
- Offline capability - no internet dependency
- Direct access to local resources
- Better security for sensitive medical data

### 2. SQLite Database
**Rationale:**
- Lightweight and serverless
- No complex setup required
- Portable database file
- Suitable for single-location deployments
- Zero configuration
- Cross-platform compatibility

### 3. MVVM Pattern
**Rationale:**
- Industry standard for WPF applications
- Excellent testability
- Clear separation of concerns
- Support for data binding
- Team collaboration friendly

### 4. Entity Framework Core
**Rationale:**
- Strongly-typed data access
- LINQ query support
- Automatic change tracking
- Migration support for schema changes
- Reduces boilerplate code

### 5. Role-Based Access Control
**Rationale:**
- Security requirement for medical data
- Different user capabilities (Admin vs Normal User)
- Audit trail capability
- Compliance with healthcare regulations

---

## Security Architecture

### Authentication
- Username/password-based authentication
- User credentials stored in database
- Login validation in `MainWindow.xaml.cs`:
  ```csharp
  public string isRegisteredUser(string enteredUserName, string enteredUserPassword)
  {
      string result = "not_a_user";
      foreach (var user in allUsers)
      {
          if (user.UserName == enteredUserName && 
              user.Password == enteredUserPassword)
          {
              result = "normal_user";
              if (user.IsSuperUser) result = "super_user";
              return result;
          }
      }
      return result;
  }
  ```

### Authorization
- **Super User (Admin)**: Full system access
  - User management
  - Doctor management
  - Drug and test catalog management
  - All patient operations
  
- **Normal User**: Limited access
  - Patient management
  - Appointment scheduling
  - Prescription creation
  - Billing operations
  - No administrative functions

### Data Security
- Local database storage
- Application-level access control
- No network exposure by default
- Sensitive data remains on local machine

---

## Deployment Architecture

### Application Structure

```
Hospital-Management-System/
├── HMS.sln                    # Solution file
├── HMS/                       # Main application project
│   ├── HMS.csproj            # Project configuration
│   ├── App.xaml              # Application entry point
│   ├── DataContext.cs        # EF Core context
│   ├── MVVM/                 # MVVM components
│   ├── Images/               # Application resources
│   ├── Themes/               # UI themes
│   └── Migrations/           # Database migrations
├── HMS.Tests/                # Unit test project
└── testHospital.db          # SQLite database file
```

### Deployment Requirements

**Target Platform:**
- Windows OS (7, 8, 10, 11)
- .NET 7.0 Runtime
- Minimum 2GB RAM
- 100MB disk space

**Distribution:**
- Self-contained deployment option
- Framework-dependent deployment
- Single executable with dependencies
- Database included in deployment package

### Build Configuration

```xml
<PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net7.0-windows</TargetFramework>
    <Nullable>enable</Nullable>
    <UseWPF>true</UseWPF>
</PropertyGroup>
```

---

## Component Interaction Flow

### Example: Adding a New Patient

```
1. User interacts with AddPatientWindow (View)
   ↓
2. View binds to AddPatientWindowVM (ViewModel)
   ↓
3. User fills form and clicks Save (Command)
   ↓
4. ViewModel validates input data
   ↓
5. ViewModel creates Patient entity (Model)
   ↓
6. ViewModel uses DataContext to save to database
   ↓
7. Entity Framework generates SQL and executes
   ↓
8. Success/failure feedback to ViewModel
   ↓
9. ViewModel updates View through data binding
   ↓
10. User sees confirmation message
```

### Example: Prescription Workflow

```
1. Doctor selects Patient
2. Creates Prescription entity
3. Adds Drug dosages (Dosage entities)
4. Adds Medical tests (MedicalTest entities)
5. System automatically calculates total cost
6. Prescription saved with all related data
7. Bill entity updated/created
8. Patient notified
```

---

## Testing Architecture

### Test Project Structure

```
HMS.Tests/
├── HMS.Tests.csproj      # Test project file
├── UnitTest1.cs          # Unit tests
└── Usings.cs             # Global usings
```

### Testing Strategy
- Unit tests for ViewModels
- Entity validation tests
- Business logic verification
- Database operation tests

---

## Extensibility Points

The architecture supports future enhancements:

1. **Additional User Roles**: Extend User entity and add role-specific views
2. **Reporting Module**: Add new ViewModels and Views for reports
3. **External Integrations**: API layer can be added
4. **Multi-Database Support**: Switch from SQLite to SQL Server/PostgreSQL
5. **Cloud Synchronization**: Add data sync layer
6. **Mobile Companion**: Share Model layer with mobile apps
7. **Advanced Analytics**: ML integration for predictive analytics

---

## Performance Considerations

### Optimization Strategies
- **Lazy Loading**: Navigation properties loaded on demand
- **Async Operations**: Database operations can be made asynchronous
- **Data Caching**: ViewModels cache frequently accessed data
- **UI Virtualization**: Large lists use virtualization
- **Resource Management**: Proper disposal of DbContext instances

---

## Conclusion

This architecture provides a solid foundation for a comprehensive Hospital Management System. The MVVM pattern ensures maintainability and testability, while Entity Framework Core simplifies data access. The desktop application approach provides the performance and offline capabilities needed for healthcare environments, while the modular structure allows for future enhancements and scalability.
