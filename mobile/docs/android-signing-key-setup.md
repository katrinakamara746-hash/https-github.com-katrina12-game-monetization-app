# Generate Android Signing Key

## Prerequisites
- Java Development Kit (JDK) installed
- Android SDK installed
- React Native project set up

## Steps

### 1. Generate Keystore File

```bash
# Run keytool (included with JDK)
keytool -genkey -v -keystore game-monetization.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias game-monetization-key

# You'll be prompted to enter:
# - Keystore password (use strong password)
# - Key password (can be same as keystore)
# - First and Last Name: Game Monetization
# - Organizational Unit: Development
# - Organization: Game Monetization Inc
# - City: San Francisco
# - State: California
# - Country: US
```

### 2. Store Keystore File Securely

```bash
# Copy to android/app directory
cp game-monetization.keystore android/app/

# Update gradle.properties
# android/gradle.properties
STORE_FILE=game-monetization.keystore
STORE_PASSWORD=your_keystore_password
KEY_ALIAS=game-monetization-key
KEY_PASSWORD=your_key_password
```

### 3. Update Build Configuration

# In android/app/build.gradle

```gradle
signingConfigs {
    release {
        if (project.hasProperty('STORE_FILE')) {
            storeFile file(STORE_FILE)
            storePassword STORE_PASSWORD
            keyAlias KEY_ALIAS
            keyPassword KEY_PASSWORD
        }
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

### 4. Build Signed APK/AAB

```bash
# Build AAB (recommended for Google Play)
cd android
./gradlew bundleRelease

# OR build APK
./gradlew assembleRelease

# Output files:
# AAB: android/app/build/outputs/bundle/release/app-release.aab
# APK: android/app/build/outputs/apk/release/app-release.apk
```

### 5. Verify Signature

```bash
# Check APK signature
jarsigner -verify -verbose app-release.apk

# Check keystore contents
keytool -list -v -keystore game-monetization.keystore
```

## Important Security Notes

- [ ] Keep keystore file in secure location
- [ ] Don't commit keystore to version control
- [ ] Use strong passwords
- [ ] Backup keystore in secure location
- [ ] Store keystore password in secure password manager
- [ ] Don't share keystore with others
- [ ] For team: use shared, encrypted storage for keystore

## Keystore Validity

- Validity set to 10000 days (~27 years)
- Google Play requires key to be valid for entire app lifetime
- Never lose the keystore file - you cannot regenerate it
- Keep backups in multiple secure locations
