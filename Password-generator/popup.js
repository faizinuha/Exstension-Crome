// Generate random password
function generatePassword(length = 16) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
  }
  return password;
}

// Set generated password to input field
document.getElementById('generate-btn').addEventListener('click', function () {
  const password = generatePassword();
  document.getElementById('password').value = password;
});

// Save the password in Chrome storage
// Simpan password dengan enkripsi
document.getElementById('save-btn').addEventListener('click', function () {
  const password = document.getElementById('password').value;
  const encryptionKey = 'your-secret-key';  // Ubah ke kunci rahasia kamu
  if (password) {
      const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();
      chrome.storage.sync.set({ 'generatedPassword': encryptedPassword }, function () {
          document.getElementById('status').textContent = "Password saved securely!";
      });
  } else {
      document.getElementById('status').textContent = "Generate a password first!";
  }
});
