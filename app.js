
const firebaseConfig = {
    apiKey: "AIzaSyAUad-Vb1dqSE9lKA1QzL75euNqjr8i8Po",
    authDomain: "passnest-2c9e6.firebaseapp.com",
    databaseURL: "https://passnest-2c9e6-default-rtdb.firebaseio.com",
    projectId: "passnest-2c9e6",
    storageBucket: "passnest-2c9e6.firebasestorage.app",
    messagingSenderId: "718983596210",
    appId: "1:718983596210:web:094672c6338aeffa5961ab",
    measurementId: "G-0C71Q56ZHS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Secret key for encryption
const secretKey = "superSecretKey123!";

// Helper functions for encryption using AES
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

function decrypt(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Load existing passwords from Firebase on DOM load
document.addEventListener('DOMContentLoaded', displayPasswords);

// Add password form submission
document.getElementById('passwordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const serviceName = document.getElementById('serviceName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const encryptedPassword = encrypt(password);
    const passwordData = { serviceName, email, password: encryptedPassword };

    savePassword(passwordData);
    displayPasswords();

    document.getElementById('passwordForm').reset();
});

// Save password data in Firebase Realtime Database
function savePassword(passwordData) {
    const newPasswordRef = db.ref('passwords').push();
    newPasswordRef.set(passwordData);
}

// Display all saved passwords from Firebase
function displayPasswords() {
    const passwordList = document.getElementById('passwordList');
    passwordList.innerHTML = '';

    db.ref('passwords').once('value', (snapshot) => {
        const passwords = snapshot.val();
        
        if (passwords) {
            Object.keys(passwords).forEach((key) => {
                const item = passwords[key];

                const passwordItem = document.createElement('div');
                passwordItem.classList.add('password-item');
                
                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('details');
                detailsDiv.innerHTML = `<strong>${item.serviceName}</strong><span>${item.email}</span>`;

                const iconContainer = document.createElement('div');
                iconContainer.classList.add('icon-container');

                const copyBtn = document.createElement('button');
                copyBtn.classList.add('copy-btn');
                copyBtn.innerHTML = '📋';
                copyBtn.onclick = () => copyPassword(item.password);

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.innerHTML = '🗑️';
                deleteBtn.onclick = () => deletePassword(key);

                iconContainer.appendChild(copyBtn);
                iconContainer.appendChild(deleteBtn);

                passwordItem.appendChild(detailsDiv);
                passwordItem.appendChild(iconContainer);

                passwordList.appendChild(passwordItem);
            });
        }
    });
}

// Copy password to clipboard
function copyPassword(encryptedPassword) {
    const password = decrypt(encryptedPassword);
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy password', err);
    });
}

// Delete password entry from Firebase
function deletePassword(key) {
    db.ref('passwords/' + key).remove().then(() => {
        displayPasswords();
    }).catch(err => {
        console.error('Failed to delete password', err);
    });
}
