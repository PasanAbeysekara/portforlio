# Hospital Management System - Demo Guide

## Table of Contents
1. [Introduction](#introduction)
2. [System Requirements](#system-requirements)
3. [Installation & Setup](#installation--setup)
4. [First Run & Initial Setup](#first-run--initial-setup)
5. [Login & Authentication](#login--authentication)
6. [Admin User Walkthrough](#admin-user-walkthrough)
7. [Normal User Walkthrough](#normal-user-walkthrough)
8. [Common Workflows](#common-workflows)
9. [Demo Scenarios](#demo-scenarios)
10. [Sample Test Data](#sample-test-data)
11. [Troubleshooting](#troubleshooting)

---

## Introduction

Welcome to the Hospital Management System demo guide! This document provides a comprehensive walkthrough of all features and functionality. The system is designed to streamline hospital operations including patient management, appointments, prescriptions, billing, and administrative tasks.

### Key Features Covered in Demo:
- ✅ User authentication with role-based access
- ✅ Patient registration and profile management
- ✅ Doctor and staff management
- ✅ Appointment scheduling and tracking
- ✅ Prescription management with drugs and tests
- ✅ Billing and invoicing
- ✅ Drug and test catalog management
- ✅ User account administration

---

## System Requirements

### Minimum Requirements:
- **Operating System**: Windows 7/8/10/11 (64-bit)
- **Framework**: .NET 7.0 Runtime
- **RAM**: 2 GB minimum, 4 GB recommended
- **Disk Space**: 100 MB for application + database
- **Display**: 1366x768 resolution minimum (1920x1080 recommended)
- **Processor**: Dual-core 2.0 GHz or better

### Development Requirements:
- **IDE**: Visual Studio 2022 (Community or higher)
- **SDK**: .NET 7.0 SDK
- **Database**: SQLite (included)

---

## Installation & Setup

### For End Users:

**Option 1: Pre-built Release**
```bash
# Download the latest release
# Extract to your preferred location
# Run HMS.exe
```

**Option 2: From Source**
```bash
# Clone the repository
git clone https://github.com/PasanAbeysekara/Hospital-Management-System.git

# Navigate to project directory
cd Hospital-Management-System

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the application
dotnet run --project HMS/HMS.csproj
```

### For Developers:

1. **Open in Visual Studio:**
   - Open `HMS.sln` in Visual Studio 2022
   - Right-click solution → Restore NuGet Packages
   - Set HMS as startup project
   - Press F5 to run

2. **Database Setup:**
   - Database is auto-created on first run
   - Location: Project root directory (`testHospital.db`)
   - Sample data is seeded automatically

---

## First Run & Initial Setup

### Initial Database Creation

On first launch, the application will:
1. Create the SQLite database (`testHospital.db`)
2. Run Entity Framework migrations
3. Seed initial data:
   - Sample drugs (Paracetamol, Cetirizine, etc.)
   - Sample tests (Electrolytes, CBC, etc.)
   - Default admin user
   - Sample doctors
   - Sample patients

### Splash Screen

The application displays a splash screen during initialization:
- Shows hospital logo
- Loading animations
- Progress indicators
- Typically takes 2-3 seconds

---

## Login & Authentication

### Login Window

<!-- ![Login Interface](HMS/Images/hosp2.png) -->

**Features:**
- Username input field
- Password input field (masked)
- Remember me option
- Login button
- Modern, clean interface

### Default Credentials

**Admin User (Super User):**
```
Username: admin
Password: admin123
```

**Normal User:**
```
Username: user
Password: user123
```

**Doctor/Staff:**
```
Username: doctor
Password: doctor123
```

> ⚠️ **Security Note**: Change default passwords immediately in production!

### Authentication Process

1. Enter username and password
2. Click "Login" button
3. System validates credentials
4. Redirects to appropriate dashboard:
   - **Super User** → Admin Dashboard
   - **Normal User** → User Dashboard

### Login Validation

**Success:**
- Valid credentials → Dashboard opens
- User session created
- Main window closes

**Failure:**
- Invalid credentials → Error message displayed
- "Invalid username or password"
- Retry allowed

---

## Admin User Walkthrough

### Admin Dashboard Overview

<!-- ![Admin Dashboard](HMS/Images/hospital.png) -->

**Navigation Tabs:**
- 🏥 Dashboard (Home)
- 👥 Patients
- 👨‍⚕️ Doctors
- 💊 Drugs
- 🧪 Tests
- 📋 Appointments
- 💰 Billing
- 📝 Prescriptions
- 👤 Users

**Tab Switching Demo:**

![Switching Between Tabs](https://github.com/PasanAbeysekara/Hospital-Management-System/assets/69195287/00b18bb3-60e0-4d7d-a4f9-6ec10b0fdd52)

*Smooth navigation between different sections*

---

### 1. Dashboard Tab

**Features:**
- Key metrics and statistics
- Total patients count
- Active appointments
- Revenue overview
- Recent activities
- Quick actions panel

**Sample Metrics:**
```
Total Patients:        150
Active Appointments:    23
Today's Revenue:    $2,450
Pending Prescriptions:  8
```

---

### 2. Doctor Management

![Add Doctor](https://github.com/PasanAbeysekara/Hospital-Management-System/assets/69195287/ec3dc53b-ad45-4918-823a-862676a8cfa3)

**View All Doctors:**
- DataGrid showing all doctors
- Columns: ID, Name, Fee, Actions
- Search functionality
- Sort by any column

**Add New Doctor:**

**Steps:**
1. Click "Add Doctor" button
2. Fill in doctor details:
   ```
   Name: Dr. Sarah Johnson
   Specialization: Cardiology
   Consultation Fee: $150
   Contact: +1-555-0123
   Email: sarah.johnson@hospital.com
   ```
3. Click "Save"
4. Doctor added to system
5. Confirmation message displayed

**Edit Doctor:**
1. Select doctor from list
2. Click "Edit" button
3. Modify details
4. Click "Update"
5. Changes saved

**Delete Doctor:**
1. Select doctor from list
2. Click "Delete" button
3. Confirmation dialog appears
4. Confirm deletion
5. Doctor removed (with cascade handling)

**Sample Doctors:**
- Dr. John Smith - General Medicine - $100
- Dr. Emily Chen - Pediatrics - $120
- Dr. Michael Brown - Orthopedics - $150
- Dr. Sarah Williams - Dermatology - $110

---

### 3. Drug Management

**Drug Catalog Interface:**
- List of all available drugs
- Generic name and trade name
- Search by name
- Filter options

**Add New Drug:**

**Form Fields:**
```
Generic Name: Amoxicillin
Trade Name: Amoxil
Dosage Form: Capsule
Strength: 500mg
Manufacturer: Pharma Corp
Unit Price: $0.50
Stock Quantity: 1000
```

**Actions:**
- Add new drug
- Edit existing drug
- Delete drug
- View drug details
- Check stock levels

**Sample Drug Catalog:**

| Generic Name | Trade Name | Price | Stock |
|--------------|------------|-------|-------|
| Paracetamol | Panadol | $0.10 | 5000 |
| Cetirizine | Zyrtec | $0.25 | 2000 |
| Amoxicillin | Amoxil | $0.50 | 1500 |
| Pantoprazole | Pantodac | $0.35 | 1200 |
| Desloratadine | Neoloridine | $0.40 | 800 |

---

### 4. Test Management

**Medical Tests Catalog:**
- List all available tests
- Test descriptions
- Pricing information
- Department/category

**Add New Test:**

**Test Details:**
```
Test Name: Complete Blood Count (CBC)
Description: Measures various blood components
Category: Hematology
Fee: $45
Processing Time: 24 hours
Preparation Required: Fasting 8-12 hours
```

**Sample Tests:**
- Electrolytes - $30 - Checks mineral balance
- CBC - $45 - Complete blood analysis
- Lipid Profile - $55 - Cholesterol levels
- Liver Function Test - $65 - Liver health
- Kidney Function Test - $60 - Kidney health
- Thyroid Profile - $70 - Thyroid hormones

---

### 5. User Management

**User Administration Panel:**
- List all system users
- User roles and permissions
- Account status (Active/Inactive)
- Last login information

**Add New User:**

**Steps:**
1. Click "Add User" button
2. Enter user details:
   ```
   Username: nurse_mary
   Full Name: Mary Johnson
   Email: mary.j@hospital.com
   Password: ******** (must be complex)
   Role: Normal User
   Department: Nursing
   ```
3. Set permissions
4. Click "Create User"

**User Types:**
- **Super User (Admin)**: Full system access
- **Normal User**: Patient care operations
- **Doctor**: Clinical operations
- **Receptionist**: Appointments and registration
- **Pharmacist**: Prescription management
- **Billing**: Financial operations

**Edit User:**
- Update user information
- Change password
- Modify permissions
- Enable/disable account

**Security Features:**
- Password complexity requirements
- Account lockout after failed attempts
- Session timeout management
- Activity logging

---

## Normal User Walkthrough

### User Dashboard

**Available Tabs:**
- 🏠 Dashboard
- 👥 Patients
- 📅 Appointments
- 💊 Prescriptions
- 💰 Billing

*Note: Users do not have access to Doctors, Drugs, Tests, or User management*

---

### 1. Patient Management

![Add Patient](https://github.com/PasanAbeysekara/Hospital-Management-System/assets/69195287/5b5e9108-9cac-4043-887a-1ef699909778)

**Patient List View:**
- Search patients by name, ID, or phone
- Filter by date range
- Sort by various fields
- Quick action buttons

**Add New Patient:**

<!-- ![Patient Registration Form](HMS/Images/patient.png) -->

**Required Information:**

**Personal Details:**
```
Full Name: John Michael Doe
Date of Birth: 01/15/1985
Age: 41 years
Gender: Male
Blood Group: O+
```

**Contact Information:**
```
Phone: +1-555-0199
Email: john.doe@email.com
Address: 123 Main Street, Apt 4B, New York, NY 10001
```

**Medical Information:**
```
Weight: 75.5 kg
Height: 178 cm
BMI: 23.8 (Auto-calculated)
Admitted Date: 01/21/2026
```

**Emergency Contact:**
```
Contact Name: Jane Doe
Relationship: Spouse
Phone: +1-555-0200
```

**Steps:**
1. Click "Add Patient" button
2. Fill all required fields
3. Review information
4. Click "Save Patient"
5. Patient ID generated automatically
6. Confirmation message shown

---

### 2. Patient Profile View

![Patient Profile](https://github.com/PasanAbeysekara/Hospital-Management-System/assets/69195287/e4201a25-4498-4a94-b55d-a3f0d4c63f80)

**Profile Sections:**

**Header:**
- Patient photo/avatar
- Full name and ID
- Age and gender
- Blood group badge
- Status indicator

**Tabs:**
- **Overview**: Summary information
- **Medical History**: Past visits and diagnoses
- **Appointments**: Scheduled and past appointments
- **Prescriptions**: All prescriptions
- **Billing**: Payment history
- **Documents**: Uploaded files

**Quick Actions:**
- Edit Profile
- Schedule Appointment
- New Prescription
- View Bill
- Print Summary

---

### 3. Edit Patient Profile

![Edit Patient Profile](https://github.com/PasanAbeysekara/Hospital-Management-System/assets/69195287/aaab4103-c681-45c9-bcf0-6bf4786bd565)

**Editable Fields:**
- Contact information
- Address
- Emergency contact
- Medical information (weight, height)
- Insurance details

**Process:**
1. Click "Edit Profile" button
2. Modify desired fields
3. Click "Update"
4. Changes saved
5. Profile refreshed

**Validation:**
- Email format validation
- Phone number format
- Required field checks
- Duplicate detection

---

### 4. Appointment Management

**Appointment Calendar View:**
- Monthly/weekly/daily views
- Color-coded by doctor
- Status indicators
- Filter options

**Schedule New Appointment:**

**Appointment Form:**
```
Patient: John Doe (ID: 12345)
Doctor: Dr. Sarah Johnson
Date: 01/25/2026
Time: 10:30 AM
Duration: 30 minutes
Type: Follow-up Consultation
Reason: Hypertension check-up
```

**Appointment Status:**
- 🔵 Scheduled
- 🟢 Confirmed
- 🟡 In Progress
- ✅ Completed
- 🔴 Cancelled
- ⚪ No Show

**Actions:**
- View details
- Reschedule
- Cancel appointment
- Mark as completed
- Send reminder

**Appointment Workflow:**
```
1. Patient Registration
   ↓
2. Book Appointment
   ↓
3. Patient Arrives → Check-in
   ↓
4. Consultation with Doctor
   ↓
5. Prescription (if needed)
   ↓
6. Billing
   ↓
7. Check-out
```

---

### 5. Prescription Management

**Prescription List:**
- All patient prescriptions
- Filter by date, doctor, patient
- Search functionality
- Status tracking

**Create New Prescription:**

**Prescription Header:**
```
Patient: John Doe (ID: 12345)
Doctor: Dr. Sarah Johnson
Date: 01/21/2026
Diagnosis: Hypertension Stage 1
```

**Add Medications:**

**Drug 1:**
```
Drug: Amlodipine (Norvasc)
Dosage: 5mg
Frequency: Once daily
Duration: 30 days
Instructions: Take in the morning with food
Quantity: 30 tablets
```

**Drug 2:**
```
Drug: Atorvastatin (Lipitor)
Dosage: 10mg
Frequency: Once daily at bedtime
Duration: 30 days
Instructions: Take at night, avoid grapefruit
Quantity: 30 tablets
```

**Add Medical Tests:**

**Test 1:**
```
Test: Lipid Profile
Instructions: Fasting required (8-12 hours)
Urgency: Routine
Schedule: Within 1 week
```

**Test 2:**
```
Test: Blood Pressure Monitoring
Instructions: Check BP daily
Frequency: Daily for 2 weeks
Record values: Morning and evening
```

**Prescription Notes:**
```
Patient advised to:
- Reduce salt intake
- Exercise 30 min daily
- Monitor blood pressure
- Return in 4 weeks for follow-up
```

**Total Cost Calculation:**
```
Medications:     $45.00
Tests:           $55.00
Consultation:   $150.00
──────────────────────
Total:          $250.00
```

**Actions:**
- Print prescription
- Email to patient
- Send to pharmacy
- Schedule follow-up

---

### 6. Billing Management

**Billing Dashboard:**
- Pending bills
- Paid invoices
- Payment history
- Revenue reports

**Generate Bill:**

**Bill Components:**

**Services:**
```
Doctor Consultation    $150.00
Emergency Fee          $50.00
Room Charges (1 day)   $200.00
```

**Procedures:**
```
Blood Test            $45.00
X-Ray                 $100.00
ECG                   $75.00
```

**Medications:**
```
Amlodipine 5mg x30    $25.00
Atorvastatin 10mg x30 $30.00
Paracetamol 500mg x20 $5.00
```

**Summary:**
```
Subtotal:          $680.00
Insurance Coverage: -$400.00
Patient Copay:      $50.00
──────────────────────────
Amount Due:        $330.00
```

**Payment Methods:**
- Cash
- Credit Card
- Debit Card
- Insurance
- Bank Transfer
- Check

**Invoice Details:**
```
Invoice #: INV-2026-00123
Date: 01/21/2026
Due Date: 02/20/2026
Patient: John Doe
Status: Paid
```

**Actions:**
- Print invoice
- Email receipt
- Record payment
- Apply discount
- Generate report

---

## Common Workflows

### Workflow 1: New Patient Visit

**Complete Process:**

**Step 1: Registration (5 minutes)**
1. Patient arrives at reception
2. Receptionist opens HMS
3. Clicks "Add Patient"
4. Enters patient details
5. Saves patient profile
6. Patient ID: P-2026-0001 generated

**Step 2: Appointment Scheduling (2 minutes)**
1. Navigate to Appointments
2. Click "New Appointment"
3. Select patient (P-2026-0001)
4. Choose doctor (Dr. Sarah Johnson)
5. Select date/time (Today, 10:30 AM)
6. Save appointment

**Step 3: Consultation (20 minutes)**
1. Patient checks in
2. Doctor reviews patient info
3. Conducts examination
4. Records diagnosis
5. Decides treatment plan

**Step 4: Prescription Creation (5 minutes)**
1. Doctor opens Prescriptions
2. Creates new prescription
3. Adds medications (2 drugs)
4. Orders tests (Blood work)
5. Adds instructions
6. Saves and prints

**Step 5: Billing (5 minutes)**
1. Navigate to Billing
2. Select patient
3. Add consultation fee ($150)
4. Add medication costs ($60)
5. Add test costs ($45)
6. Generate invoice
7. Process payment
8. Print receipt

**Total Time: ~37 minutes**

---

### Workflow 2: Follow-up Visit

**Quick Process:**

**Step 1: Check Existing Patient (1 minute)**
1. Search patient by ID or name
2. View patient profile
3. Review last visit notes

**Step 2: Schedule Appointment (1 minute)**
1. From patient profile, click "Schedule"
2. Choose date/time
3. Confirm

**Step 3: Consultation (15 minutes)**
1. Review previous prescription
2. Check progress
3. Adjust treatment if needed

**Step 4: Update Prescription (3 minutes)**
1. Edit existing prescription, or
2. Create new prescription
3. Modify dosages
4. Save changes

**Step 5: Billing (2 minutes)**
1. Generate follow-up bill
2. Apply insurance
3. Process payment

**Total Time: ~22 minutes**

---

### Workflow 3: Emergency Patient

**Rapid Registration:**

**Step 1: Quick Registration (2 minutes)**
1. Click "Quick Add Patient"
2. Enter minimal details:
   - Name
   - Age/DOB
   - Gender
   - Emergency contact
3. Save (complete later)

**Step 2: Immediate Doctor Assignment (30 seconds)**
1. Available emergency doctor
2. Create urgent appointment
3. Mark as "Emergency"

**Step 3: Treatment (Variable)**
1. Doctor examination
2. Emergency procedures
3. Documentation

**Step 4: Complete Registration (5 minutes)**
1. After stabilization
2. Complete patient details
3. Update records

**Step 5: Billing (Later)**
1. Compile all charges
2. Submit to insurance
3. Process payment

---

### Workflow 4: Prescription Refill

**Quick Refill Process:**

**Step 1: Locate Patient (1 minute)**
1. Search patient
2. Open prescriptions tab

**Step 2: Review Previous Prescription (1 minute)**
1. View last prescription
2. Check if refillable
3. Verify doctor approval

**Step 3: Create Refill (2 minutes)**
1. Click "Refill Prescription"
2. System copies previous
3. Update date
4. Confirm medications
5. Save

**Step 4: Notify Patient (1 minute)**
1. Print prescription
2. Or email to patient
3. Send to pharmacy

**Total Time: ~5 minutes**

---

## Demo Scenarios

### Scenario 1: Routine Check-up

**Context:**
- Patient: John Doe (Existing patient)
- Issue: Annual health check-up
- Doctor: Dr. Sarah Johnson

**Demo Steps:**

1. **Login as Normal User**
2. **Search Patient**: "John Doe"
3. **View Profile**: Check last visit (1 year ago)
4. **Schedule Appointment**: Select date next week
5. **Appointment Day**: Mark patient as arrived
6. **Create Prescription**:
   - Basic health check
   - Order routine tests: CBC, Lipid Profile
   - No medications needed
7. **Generate Bill**:
   - Consultation: $150
   - Tests: $100
   - Total: $250
8. **Process Payment**: Insurance covers 80%
9. **Print Receipt**: Patient pays $50

**Expected Outcome:**
- Appointment scheduled ✅
- Tests ordered ✅
- Bill generated ✅
- Payment processed ✅

---

### Scenario 2: First-Time Patient with Illness

**Context:**
- New patient with flu symptoms
- Needs immediate consultation
- Requires prescription

**Demo Steps:**

1. **Login as Receptionist/User**
2. **Add New Patient**:
   ```
   Name: Emily Martinez
   DOB: 03/15/1990
   Phone: +1-555-0234
   Email: emily.m@email.com
   Address: 456 Oak Ave, Brooklyn
   ```
3. **Quick Appointment** (Same day):
   - Doctor: Dr. Michael Brown
   - Time: Next available slot
   - Type: New Patient - Sick Visit

4. **Consultation** (Doctor logs in):
   - Diagnosis: Viral Upper Respiratory Infection
   - Symptoms: Fever, cough, sore throat

5. **Create Prescription**:
   ```
   Medications:
   - Paracetamol 500mg, TID, 5 days
   - Cetirizine 10mg, OD, 7 days
   - Cough syrup, 10ml TID, 5 days
   
   Instructions:
   - Rest and hydration
   - Return if fever persists >3 days
   - Avoid cold drinks
   ```

6. **Generate Bill**:
   ```
   New Patient Consultation: $200
   Medications: $25
   Total: $225
   ```

7. **Process Payment**: Full payment (no insurance)
8. **Print Prescription and Receipt**

**Expected Outcome:**
- New patient registered ✅
- Same-day appointment ✅
- Prescription created ✅
- Patient checked out ✅

---

### Scenario 3: Chronic Disease Management

**Context:**
- Patient: Robert Wilson
- Condition: Type 2 Diabetes
- Monthly follow-up

**Demo Steps:**

1. **Login as Normal User**
2. **Open Patient Profile**: Robert Wilson
3. **Review History**:
   - Previous HbA1c: 7.5%
   - Current medications
   - Last visit: 30 days ago

4. **Schedule Follow-up**:
   - Regular monthly check
   - Same doctor (Dr. Emily Chen)

5. **Consultation Day**:
   - Review blood sugar logs
   - Check weight, BP
   - Discuss diet compliance

6. **Update Prescription**:
   ```
   Continue:
   - Metformin 500mg BD
   - Glimepiride 2mg OD
   
   Add:
   - Vitamin D3 supplement
   
   Tests:
   - HbA1c
   - Fasting Blood Sugar
   - Kidney Function Test
   ```

7. **Billing**:
   ```
   Follow-up Consultation: $120
   Tests: $150
   Medications (30 days): $45
   Total: $315
   ```

8. **Schedule Next Appointment**: +30 days

**Expected Outcome:**
- Continuity of care ✅
- Medication compliance ✅
- Regular monitoring ✅
- Next visit scheduled ✅

---

### Scenario 4: Admin Task - Inventory Management

**Context:**
- Admin needs to update drug inventory
- Add new test to catalog
- Review user activity

**Demo Steps:**

1. **Login as Admin**
2. **Navigate to Drugs**:
   - Check stock levels
   - Find: Paracetamol stock low (50 units)
   - Edit entry: Update stock to 2000 units
   - Add note: "Restocked on 01/21/2026"

3. **Add New Drug**:
   ```
   Generic: Insulin Glargine
   Trade Name: Lantus
   Type: Injection
   Strength: 100 units/mL
   Price: $85.00 per vial
   Stock: 100 vials
   ```

4. **Navigate to Tests**:
   - Add New Test:
   ```
   Name: COVID-19 RT-PCR
   Category: Molecular Diagnostics
   Fee: $120
   TAT: 24 hours
   Sample: Nasopharyngeal swab
   ```

5. **User Management**:
   - Review active users
   - Check last login times
   - Identify inactive accounts

6. **Generate Reports**:
   - Monthly revenue report
   - Top prescribed drugs
   - Busiest doctors
   - Patient statistics

**Expected Outcome:**
- Inventory updated ✅
- New items added ✅
- System maintained ✅
- Reports generated ✅

---

## Sample Test Data

### Pre-loaded Patients

```
1. John Doe
   - ID: P-001
   - Age: 45, Male, O+
   - Phone: +1-555-0101
   - Condition: Hypertension

2. Jane Smith
   - ID: P-002
   - Age: 32, Female, A+
   - Phone: +1-555-0102
   - Condition: Diabetes Type 2

3. Robert Wilson
   - ID: P-003
   - Age: 58, Male, B+
   - Phone: +1-555-0103
   - Condition: Heart Disease

4. Emily Martinez
   - ID: P-004
   - Age: 28, Female, AB+
   - Phone: +1-555-0104
   - Condition: Asthma

5. Michael Brown
   - ID: P-005
   - Age: 41, Male, O-
   - Phone: +1-555-0105
   - Condition: Arthritis
```

### Pre-loaded Doctors

```
1. Dr. Sarah Johnson
   - Specialty: Cardiology
   - Fee: $150
   - Experience: 15 years

2. Dr. Michael Brown
   - Specialty: General Medicine
   - Fee: $100
   - Experience: 10 years

3. Dr. Emily Chen
   - Specialty: Endocrinology
   - Fee: $140
   - Experience: 12 years

4. Dr. David Lee
   - Specialty: Orthopedics
   - Fee: $160
   - Experience: 18 years

5. Dr. Lisa Anderson
   - Specialty: Pediatrics
   - Fee: $120
   - Experience: 8 years
```

### Pre-loaded Drugs

```
1. Paracetamol (Panadol) - $0.10
2. Cetirizine (Zyrtec) - $0.25
3. Amoxicillin (Amoxil) - $0.50
4. Pantoprazole (Pantodac) - $0.35
5. Desloratadine (Neoloridine) - $0.40
6. Metformin (Glucophage) - $0.30
7. Amlodipine (Norvasc) - $0.45
8. Atorvastatin (Lipitor) - $0.60
```

### Pre-loaded Tests

```
1. Complete Blood Count (CBC) - $45
2. Lipid Profile - $55
3. Liver Function Test - $65
4. Kidney Function Test - $60
5. Thyroid Profile - $70
6. HbA1c - $50
7. Electrolytes - $30
8. Urinalysis - $25
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Database Not Found

**Error Message:**
```
"Unable to open database file 'testHospital.db'"
```

**Solution:**
1. Check if database exists in project root
2. Ensure proper file permissions
3. Run migrations:
   ```bash
   dotnet ef database update
   ```
4. If missing, database will auto-create on next run

---

#### Issue 2: Login Failed

**Error Message:**
```
"Invalid username or password"
```

**Solutions:**
1. Verify credentials (case-sensitive)
2. Check if user exists in database
3. Reset password using admin account
4. Check user account status (active/inactive)

**SQL Reset (If needed):**
```sql
-- Reset admin password to 'admin123'
UPDATE Users SET Password = 'admin123' WHERE UserName = 'admin';
```

---

#### Issue 3: Slow Performance

**Symptoms:**
- Slow loading of patient list
- Laggy UI interactions
- Long database queries

**Solutions:**
1. **Database Optimization:**
   ```sql
   VACUUM;  -- Compact database
   ANALYZE; -- Update query optimizer statistics
   ```

2. **Clear old data:**
   - Archive old appointments
   - Remove deleted records
   - Clean up logs

3. **Index optimization:**
   - Ensure indexes on frequently searched fields
   - Add index on Patient.FullName
   - Add index on Appointment.AppointmentDate

4. **Application:**
   - Close unused windows
   - Restart application
   - Clear cache if implemented

---

#### Issue 4: Print Issues

**Problem:** Cannot print prescriptions or invoices

**Solutions:**
1. Check printer connection
2. Verify default printer set in Windows
3. Update printer drivers
4. Try "Print to PDF" as alternative
5. Check printer permissions

---

#### Issue 5: Missing Data

**Problem:** Patients/doctors not appearing in list

**Solutions:**
1. **Check filters:**
   - Clear any active filters
   - Reset date range
   - Clear search box

2. **Refresh data:**
   - Click refresh button
   - Close and reopen window
   - Restart application

3. **Database query:**
   ```sql
   SELECT COUNT(*) FROM Patients;
   -- Should return > 0 if data exists
   ```

---

#### Issue 6: Migration Errors

**Error Message:**
```
"Pending migrations exist"
```

**Solution:**
```bash
# List pending migrations
dotnet ef migrations list

# Apply migrations
dotnet ef database update

# If corrupted, reset:
dotnet ef database drop
dotnet ef database update
```

---

### Performance Tips

1. **Regular Maintenance:**
   - Backup database weekly
   - Archive old records monthly
   - Optimize database quarterly

2. **Best Practices:**
   - Don't keep multiple windows open
   - Close patient profiles when done
   - Use search instead of scrolling
   - Logout when not in use

3. **Hardware:**
   - Use SSD for faster database access
   - Ensure adequate RAM (4GB+)
   - Keep system updated

---

## Support and Resources

### Getting Help

**Documentation:**
- [Architecture.md](Architecture.md) - System architecture
- [challenges.md](challenges.md) - Known issues and solutions
- [README.md](README.md) - Project overview

**Contact:**
- **Email**: pasankavindaabey@gmail.com
- **GitHub Issues**: https://github.com/PasanAbeysekara/Hospital-Management-System/issues

### Training Materials

**Video Tutorials:** (Coming soon)
- Basic navigation
- Patient registration
- Prescription creation
- Billing process
- Admin functions

**Quick Reference Cards:**
- Keyboard shortcuts
- Common workflows
- Emergency procedures

---

## Conclusion

This demo guide covers the complete functionality of the Hospital Management System. Whether you're a healthcare professional, administrator, or developer, these examples and workflows will help you understand and utilize the system effectively.

### Next Steps

1. **Complete the installation**
2. **Try the demo scenarios**
3. **Customize for your needs**
4. **Train your staff**
5. **Deploy in production**

### Feedback

We welcome feedback and suggestions! Please report issues or feature requests on GitHub or contact us directly.

---

**Last Updated:** January 21, 2026  
**Version:** 1.0.0  
**License:** MIT
