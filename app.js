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

// Load existing passwords from local storage
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

// Save password data in local storage
function savePassword(passwordData) {
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push(passwordData);
    localStorage.setItem('passwords', JSON.stringify(passwords));
}

// Display all saved passwords
function displayPasswords() {
    const passwordList = document.getElementById('passwordList');
    passwordList.innerHTML = '';

    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];

    passwords.forEach((item, index) => {
        const passwordItem = document.createElement('div');
        passwordItem.classList.add('password-item');
        
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');
        detailsDiv.innerHTML = `<strong>${item.serviceName}</strong><span>${item.email}</span>`;

        const copyBtn = document.createElement('button');
        copyBtn.classList.add('copy-btn');
        copyBtn.innerHTML = '📋';
        copyBtn.onclick = () => copyPassword(item.password);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.onclick = () => deletePassword(index);

        passwordItem.appendChild(detailsDiv);
        passwordItem.appendChild(copyBtn);
        passwordItem.appendChild(deleteBtn);

        passwordList.appendChild(passwordItem);
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

// Delete password entry
function deletePassword(index) {
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.splice(index, 1);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    displayPasswords();
}
