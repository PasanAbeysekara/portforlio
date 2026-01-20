# Architecture Documentation

## Overview
AR-Visionary Explora is a Flutter-based mobile application that integrates augmented reality (AR) technology with e-commerce functionality to provide an immersive furniture shopping experience. The application follows a modular architecture with clear separation of concerns.

## Technology Stack

### Frontend
- **Framework**: Flutter (SDK >=3.1.5 <4.0.0)
- **Language**: Dart
- **UI/UX**: Material Design 3
- **Fonts**: Google Fonts
- **Animations**: animate_do
- **SVG Support**: flutter_svg
- **Loading Indicators**: flutter_spinkit

### Backend & Services
- **Backend as a Service**: Firebase
  - Firebase Core
  - Cloud Firestore (Database)
  - Firebase Storage (Asset Storage)
- **State Management**: Provider pattern
- **HTTP Client**: http package

### Augmented Reality
- **AR Engine**: augmented_reality_plugin (v4.0.1)
- **Platform Support**: ARCore (Android)

### Additional Features
- **Image Handling**: image_picker
- **Notifications**: fluttertoast
- **External Links**: url_launcher
- **Phone Integration**: 
  - flutter_phone_direct_caller
  - ussd_phone_call_sms
- **Logging**: logger

## Project Structure

```
lib/
├── main.dart                    # Application entry point
├── components/                  # Reusable UI components
│   ├── app_logo.dart
│   ├── botttom_nav_tile.dart
│   ├── common_back_button.dart
│   ├── custom_text.dart
│   ├── custom_textfield.dart
│   ├── cutomer_button.dart
│   └── social_button.dart
├── screens/                     # Application screens
│   ├── auth/                    # Authentication screens
│   │   ├── login.dart
│   │   ├── signup.dart
│   │   └── forgot_password.dart
│   ├── main/                    # Main application screens
│   │   ├── main_screen.dart
│   │   ├── home/
│   │   ├── search/
│   │   ├── cart/
│   │   │   ├── cart.dart
│   │   │   ├── provider/
│   │   │   │   └── CartProvider.dart
│   │   │   ├── models/
│   │   │   │   ├── Product.dart
│   │   │   │   └── ShoppingCart.dart
│   │   │   └── widgets/
│   │   │       ├── cart_tile.dart
│   │   │       ├── cart_amount.dart
│   │   │       └── bottom_raw.dart
│   │   ├── favourites/
│   │   ├── product_details/
│   │   ├── profile/
│   │   └── myhome/
│   └── splash/                  # Splash screen
│       └── splash.dart
└── utils/                       # Utility classes
    ├── constants/               # Application constants
    │   ├── app_assets.dart
    │   └── app_colors.dart
    └── helpers/                 # Helper functions
        ├── helpers.dart
        └── size_config.dart
```

## Architecture Patterns

### 1. State Management - Provider Pattern
The application uses the Provider pattern for state management:

- **CartProvider**: Manages shopping cart state
  - Add/remove items from cart
  - Calculate total prices
  - Handle discounts and taxes
  - Notify listeners of state changes

```dart
ChangeNotifierProvider(
  create: (context) => CartProvider(),
  child: MyApp(),
)
```

### 2. Component-Based Architecture
Reusable UI components are separated into the `components/` directory:
- Custom buttons
- Custom text fields
- Navigation tiles
- Social login buttons
- Branding elements (app logo)

### 3. Screen-Based Organization
Screens are organized by feature modules:
- **Authentication Module**: Login, signup, password recovery
- **Main Module**: Core application features
- **Splash Module**: Initial loading screen

### 4. Model-View-Provider (MVP) Pattern
Each feature follows the MVP pattern:
- **Models**: Data structures (Product, ShoppingCart, etc.)
- **Views**: UI screens and widgets
- **Providers**: Business logic and state management

## Data Flow

### 1. Application Initialization
```
main() → Firebase.initializeApp() → ChangeNotifierProvider → MaterialApp → Splash
```

### 2. State Management Flow
```
User Action → Widget → Provider.notifyListeners() → Consumer/Selector → UI Update
```

### 3. Firebase Integration
```
Client → Firebase Auth → Cloud Firestore ↔ Firebase Storage
```

## Platform-Specific Implementations

### Android
- **Build Configuration**: android/app/build.gradle
- **Google Services**: google-services.json
- **AR Support**: ARCore integration
- **Minimum SDK**: Defined in build.gradle

### iOS
- **Build Configuration**: ios/Runner/Info.plist
- **Firebase Configuration**: GoogleService-Info.plist
- **AR Support**: ARKit compatibility
- **Pod Dependencies**: Defined in Podfile

### Web
- Basic web support with index.html and manifest.json

### Desktop
- **Linux**: CMake-based build system
- **macOS**: Xcode project with entitlements
- **Windows**: CMake with Win32 window management

## Key Features Architecture

### 1. AR Visualization
- Real-time camera integration
- 3D model rendering
- Position and orientation adjustment
- Real-world surface detection

### 2. E-Commerce Flow
```
Product Catalog → Product Details → Add to Cart → Shopping Cart → Checkout
```

### 3. User Authentication
```
Splash → Login/Signup → Main Screen
        ↓
  Forgot Password
```

### 4. Shopping Cart System
- **CartProvider**: Centralized cart state management
- **Product Model**: Item data structure
- **ShoppingCart Model**: Cart collection management
- **Real-time Updates**: Provider pattern ensures UI consistency

## Database Schema (Cloud Firestore)

### Collections (Inferred)
- **users**: User profiles and authentication data
- **products**: Furniture catalog items
  - name, description, price
  - images, 3D models
  - dimensions, materials
- **carts**: User shopping carts
- **orders**: Purchase history
- **favorites**: User-saved items

## Security Considerations

### Firebase Security
- Authentication through Firebase Auth
- Firestore security rules for data access
- Storage rules for asset protection

### Platform Security
- **iOS**: Proper entitlements configuration
- **Android**: ProGuard rules for code obfuscation
- Secure storage of API keys and credentials

## Scalability & Performance

### Optimization Strategies
1. **Lazy Loading**: Load product data on demand
2. **Image Caching**: Cache product images locally
3. **State Efficiency**: Provider pattern minimizes unnecessary rebuilds
4. **AR Optimization**: Efficient 3D model loading and rendering

### Platform Support
- Cross-platform deployment (Android, iOS, Web, Desktop)
- Responsive layouts for various screen sizes
- Material Design 3 for consistent UI/UX

## Build & Deployment

### Build Configurations
- **Debug**: Development and testing
- **Profile**: Performance profiling
- **Release**: Production deployment

### Platform-Specific Outputs
- **Android**: APK/AAB
- **iOS**: IPA
- **Web**: Static web build
- **Desktop**: Platform-specific executables

## Future Architecture Considerations

### Potential Improvements
1. **Microservices**: Separate backend services for scalability
2. **GraphQL**: More efficient data fetching
3. **Offline Support**: Local database (SQLite/Hive) for offline mode
4. **Analytics**: Firebase Analytics integration
5. **Push Notifications**: Firebase Cloud Messaging
6. **CI/CD**: Automated testing and deployment pipelines
7. **Multi-language**: Internationalization support
8. **Advanced AR**: Multiple object placement, room scanning

## Dependencies Summary

### Core Dependencies
- flutter (SDK)
- firebase_core: ^2.24.2
- cloud_firestore: ^4.13.6
- firebase_storage: ^11.5.6
- provider: ^6.1.1
- augmented_reality_plugin: ^4.0.1

### UI/UX Dependencies
- google_fonts: ^6.1.0
- flutter_svg: ^2.0.9
- animate_do: ^3.1.2
- flutter_spinkit: ^5.2.0

### Utility Dependencies
- image_picker: ^1.0.5
- http: ^1.1.0
- logger: ^2.0.2+1
- fluttertoast: ^8.0.7
- url_launcher: ^6.2.3

## Version Control & Collaboration

### Repository Structure
- **Owner**: PasanAbeysekara
- **Repository**: AR-VisionaryExplora
- **License**: MIT License
- **Branch Strategy**: main branch for stable releases

## Conclusion

AR-Visionary Explora follows a well-structured, modular architecture that separates concerns effectively. The use of Flutter enables cross-platform development, while Firebase provides a robust backend infrastructure. The Provider pattern ensures efficient state management, and the AR integration creates an innovative shopping experience. The architecture is designed for maintainability, scalability, and future enhancements.
