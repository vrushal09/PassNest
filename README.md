# PassNest - A Simple JavaScript Password Manager

PassNest is a local JavaScript-based password manager that allows you to securely store and manage your passwords on your browser. With AES encryption and local storage, PassNest ensures your passwords are stored safely and easily accessible, without relying on any external backend service.

## Features

- **Password Storage**: Add, view, and delete saved passwords, with encryption for security.
- **Data Encryption**: All passwords are encrypted using AES (Advanced Encryption Standard) before storage.
- **Firebase Database**: Passwords are stored in Firebase realtime storage, so you can access it on any device.
- **Copy to Clipboard**: Quickly copy passwords to the clipboard with a single click.
- **Responsive UI**: Designed to be simple, minimalistic, and easy to use.

## How It Works

PassNest encrypts each password before storing it in the browser's local storage. This encryption is handled by a secret key to ensure data privacy. Passwords are only decrypted when you choose to copy them to the clipboard.

## Prerequisites

To run PassNest, you only need a modern web browser with JavaScript enabled. No additional dependencies or installations are required.

## Installation

1. **Download or Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/PassNest.git
    cd PassNest
    ```

2. **Open in Browser**:
    Open the `index.html` file in your browser to start using PassNest.

## Usage

1. **Add Password**: Fill in the service name, email, and password, then click "Add Password" to save it. The password will be stored securely in encrypted format.
2. **View Passwords**: Saved passwords will appear in a list, showing the service name and email.
3. **Copy Password**: Click the clipboard icon next to a saved password to copy it to your clipboard.
4. **Delete Password**: Click the trash icon next to a password entry to delete it from storage.

## Code Overview

### Secret Key

The `secretKey` variable holds the key used for AES encryption. It’s essential to keep this key safe, as it ensures the security of the encrypted data.

### Encryption and Decryption

- `encrypt(text)`: Encrypts the password using the AES encryption method.
- `decrypt(cipherText)`: Decrypts an encrypted password.

### Local Storage Management

- `savePassword(passwordData)`: Stores encrypted password data in local storage.
- `displayPasswords()`: Retrieves and displays stored passwords.
- `deletePassword(index)`: Deletes a selected password from local storage.

## Disclaimer

PassNest is a simple browser-based password manager and is intended for personal use. For sensitive data, a dedicated password manager application is recommended.

---

Enjoy using PassNest to securely manage your passwords!
