# Generate iOS Certificates and Provisioning Profiles

## Prerequisites
- Apple Developer Account
- Mac with Xcode installed
- App ID registered in Apple Developer portal

## Steps

### 1. Create Certificate Signing Request (CSR)

```bash
# Open Keychain Access on Mac
# Keychain Access > Certificate Assistant > Request a Certificate from a Certificate Authority
# Fill in email and common name
# Save to disk
```

### 2. Create Distribution Certificate

1. Go to Developer.apple.com
2. Navigate to Certificates, Identifiers & Profiles
3. Select Certificates > Production
4. Click "+" to add new certificate
5. Select "App Store and Ad Hoc"
6. Upload CSR
7. Download certificate and import to Keychain

### 3. Create Provisioning Profile

1. Go to Provisioning Profiles > Production
2. Click "+" to add new profile
3. Select "App Store"
4. Select your App ID (com.gamemonetization.app)
5. Select distribution certificate
6. Name the profile "GameMonetization-AppStore"
7. Download and open profile

### 4. Create App Store Connect API Key

1. Go to Users and Access
2. Click "Keys" tab
3. Click "+" to generate new key
4. Select "App Manager" role
5. Download key (save securely)

## Export for Submission

```bash
# Archive the app in Xcode
# Product > Archive

# Export archived app
# Windows > Organizer
# Select archive > Distribute App
# Select "App Store Connect" > Upload
```

## Keep Secure

- [ ] Store certificates in secure location
- [ ] Backup certificates
- [ ] Don't share private keys
- [ ] Use strong Keychain password
- [ ] Revoke old certificates after renewal
