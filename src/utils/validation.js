// ✅ Validate Username (Minimum 3 characters)
export function validateUsername(username) {
    return username.length >= 3;
  }
  
  // ✅ Validate Email Format
  export function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
  
  // ✅ Strict Password Validation
  export function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }
  