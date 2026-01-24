# System Architecture

## Overview
AR-Visionary Explora is a cross-platform mobile application built with Flutter that leverages augmented reality technology to revolutionize the furniture e-commerce experience. The application allows users to visualize furniture items in their real-world environment before making purchase decisions.

## Technology Stack

### Frontend Framework
- **Flutter SDK** (>=3.1.5 <4.0.0)
  - Cross-platform development for iOS, Android, Web, Windows, macOS, and Linux
  - Material Design 3 implementation
  - Hot reload for rapid development

### Backend & Cloud Services
- **Firebase Core** (v2.24.2)
  - Authentication and user management
  - Real-time data synchronization
- **Cloud Firestore** (v4.13.6)
  - NoSQL database for storing product catalog, user data, and orders
  - Real-time data synchronization across devices
- **Firebase Storage** (v11.5.6)
  - Storage for product images and AR model assets

### Augmented Reality
- **Augmented Reality Plugin** (v4.0.1)
  - AR visualization capabilities
  - Real-time 3D object placement and interaction
  - Camera integration for environmental mapping

### State Management
- **Provider** (v6.1.1)
  - Reactive state management
  - CartProvider for shopping cart functionality
  - Separation of business logic from UI

### UI/UX Libraries
- **Google Fonts** (v6.1.0) - Typography customization
- **Flutter SVG** (v2.0.9) - Vector graphics support
- **Animate Do** (v3.1.2) - Pre-built animations
- **Flutter SpinKit** (v5.2.0) - Loading indicators

### Utility Libraries
- **HTTP** (v1.1.0) - REST API communication
- **Image Picker** (v1.0.5) - Image selection from gallery/camera
- **URL Launcher** (v6.2.3) - External link handling
- **Logger** (v2.0.2+1) - Debugging and logging
- **Fluttertoast** (v8.0.7) - User notifications
- **Flutter Phone Direct Caller** (v2.1.1) - Direct calling functionality
- **USSD Phone Call SMS** (v0.0.3) - Communication features

## Application Architecture

### Layered Architecture Pattern

```
┌─────────────────────────────────────────────────────┐
│                  Presentation Layer                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Screens  │  │Components│  │   Splash Screen  │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────────┐
│                  Business Logic Layer               │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │Providers │  │  Helpers │  │   Validators     │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────────┐
│                    Data Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Firebase │  │ REST APIs│  │  Local Storage   │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Directory Structure

### `/lib` - Main Application Code

#### `/screens` - UI Screens
- **`/auth`** - Authentication flows
  - `login.dart` - User login screen
  - `signup.dart` - User registration screen
  - `forgot_password.dart` - Password recovery

- **`/main`** - Core application screens
  - `main_screen.dart` - Bottom navigation container
  - **`/home`** - Home screen and product browsing
  - **`/myhome`** - AR functionality and product management
    - `homeScreen.dart` - Main furniture catalog
    - `item_upload_screen.dart` - Product upload interface
    - `virtual_ar_view_screen.dart` - AR visualization
    - `firebase_options.dart` - Firebase configuration
  - **`/product_details`** - Product information views
  - **`/cart`** - Shopping cart functionality
    - `/provider/CartProvider.dart` - Cart state management
  - **`/favourites`** - Wishlist/saved items
  - **`/search`** - Product search interface
  - **`/profile`** - User profile management

- **`/splash`** - App initialization
  - `splash.dart` - Loading screen with branding

#### `/components` - Reusable UI Components
- `app_logo.dart` - Brand logo widget
- `custom_text.dart` - Styled text components
- `custom_textfield.dart` - Form input fields
- `cutomer_button.dart` - Custom button widgets
- `common_back_button.dart` - Navigation back button
- `botttom_nav_tile.dart` - Bottom navigation items
- `social_button.dart` - Social authentication buttons

#### `/utils` - Utility Functions and Constants
- **`/constants`**
  - `app_colors.dart` - Color palette definitions
  - `app_assets.dart` - Asset path constants
- **`/helpers`**
  - `helpers.dart` - Common utility functions
  - `size_config.dart` - Responsive sizing calculations

### Platform-Specific Directories

#### `/android` - Android Platform
- Gradle build configuration
- `google-services.json` - Firebase Android config
- AndroidManifest.xml configurations
- Native Android code integration

#### `/ios` - iOS Platform
- CocoaPods dependencies
- `GoogleService-Info.plist` - Firebase iOS config
- `firebase_app_id_file.json` - Firebase app identifier
- Info.plist configurations
- Swift bridging headers

#### `/web` - Web Platform
- `index.html` - Web entry point
- `manifest.json` - PWA configuration
- Web-specific assets

#### `/linux`, `/macos`, `/windows` - Desktop Platforms
- CMake build configurations
- Platform-specific implementations
- Native API integrations

## Data Flow Architecture

### User Authentication Flow
```
User Input → Auth Screen → Firebase Auth → Cloud Firestore
                                ↓
                          User Session ← Provider State
```

### Shopping Cart Flow
```
Product Selection → Add to Cart → CartProvider (State)
                                        ↓
                                  Local State ← Real-time Updates
                                        ↓
                                  Checkout → Firebase/Payment Gateway
```

### AR Visualization Flow
```
Product Selection → Product Details → AR View Button
                                          ↓
                                 virtual_ar_view_screen.dart
                                          ↓
                                 AugmentedRealityPlugin
                                          ↓
                                 Camera + AR Engine (ARCore)
                                          ↓
                                 3D Model Rendering in Real Space
```

## State Management Strategy

### Provider Pattern Implementation
- **CartProvider**: Manages shopping cart state
  - Add/remove items
  - Update quantities
  - Calculate totals
  - Persist cart state

### State Propagation
```
ChangeNotifierProvider (main.dart)
        ↓
   Consumer/Provider.of
        ↓
   UI Updates (Reactive)
```

## Key Architectural Patterns

### 1. **Component-Based UI Architecture**
- Reusable widgets in `/components`
- Consistent design language
- Separation of concerns

### 2. **Feature-Based Organization**
- Screens organized by feature modules
- Co-located related functionality
- Improved maintainability

### 3. **Firebase Integration Pattern**
- Centralized Firebase initialization in `main.dart`
- Platform-specific configuration files
- Error handling for initialization failures

### 4. **Responsive Design**
- Size configuration utilities
- Material Design 3 principles
- Cross-platform compatibility

## Security Architecture

### Data Security
- Firebase Authentication for secure user management
- Firestore security rules for data access control
- Secure storage of user credentials

### Network Security
- HTTPS communication for all API calls
- Firebase SDK encrypted connections
- Secure payment gateway integration

## AR Integration Architecture

### AR Plugin Integration
- **AugmentedRealityPlugin**: Third-party plugin for AR capabilities
- Platform-specific AR engine integration (ARCore for Android)
- Real-time camera feed processing
- 3D model rendering and manipulation

### AR Workflow
1. User selects product from catalog
2. Product image/model loaded from Firebase Storage
3. AR view screen initialized with product data
4. Camera permission requested
5. AR engine maps environment
6. 3D furniture model placed in real-world coordinates
7. User can interact, rotate, and reposition

## Scalability Considerations

### Horizontal Scalability
- Firebase automatically scales backend services
- CDN for asset delivery (Firebase Storage)
- Stateless architecture for web deployment

### Performance Optimization
- Image caching strategies
- Lazy loading of product data
- Efficient state management with Provider
- Asset compression and optimization

## Cross-Platform Strategy

### Platform Support
- **Mobile**: iOS, Android (primary targets)
- **Desktop**: Windows, macOS, Linux (secondary)
- **Web**: Browser-based access (tertiary)

### Platform-Specific Implementations
- Native code bridges for platform features
- Conditional compilation for platform APIs
- Unified UI with platform-specific adaptations

## Development Workflow

### Build Configuration
- Development, staging, and production environments
- Platform-specific build scripts
- Firebase project per environment

### Testing Strategy
- Unit tests for business logic
- Widget tests for UI components
- Integration tests for complete flows
- Platform-specific testing

## Deployment Architecture

### Mobile Deployment
- Google Play Store (Android)
- Apple App Store (iOS)
- Over-the-air updates via app stores

### Backend Deployment
- Firebase hosting for web version
- Automated deployments via CI/CD
- Version management and rollback capabilities

## Future Architecture Considerations

### Planned Enhancements
- Microservices for complex business logic
- GraphQL for efficient data queries
- Machine learning for product recommendations
- Advanced AR features (measurement, room scanning)
- Offline-first architecture with local database
- Real-time chat support integration
- Payment gateway integration
- Multi-language support

### Technical Debt Areas
- Migrate to more robust state management (Riverpod/Bloc)
- Implement repository pattern for data layer
- Add comprehensive error handling
- Implement analytics and crash reporting
- Add automated testing coverage
