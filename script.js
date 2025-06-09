document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.form-container');
    const switchBtns = document.querySelectorAll('.switch-btn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Login form elements
    const loginEmail = loginForm.querySelector('input[type="text"]');
    const loginPassword = loginForm.querySelector('input[type="password"]');
    const loginEmailError = document.createElement('span');
    const loginPasswordError = document.createElement('span');
    
    // Add error elements to login form
    loginEmailError.className = 'error-message';
    loginPasswordError.className = 'error-message';
    loginEmail.parentNode.appendChild(loginEmailError);
    loginPassword.parentNode.appendChild(loginPasswordError);
    
    // Registration form elements
    const emailInput = document.getElementById('regEmail');
    const emailError = document.getElementById('emailError');
    const passwordInput = registerForm.querySelectorAll('input[type="password"]')[0];
    const confirmPasswordInput = registerForm.querySelectorAll('input[type="password"]')[1];
    const passwordError = document.createElement('span');
    passwordError.className = 'error-message';
    passwordInput.parentNode.appendChild(passwordError);

    // Handle form switching
    switchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const formToShow = btn.getAttribute('data-form');
            if (formToShow === 'register') {
                formContainer.classList.add('show-register');
            } else {
                formContainer.classList.remove('show-register');
            }
            // Clear all error messages when switching forms
            clearErrors();
        });
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginEmail.value.trim();
        const password = loginPassword.value;
        
        // Clear previous error messages
        clearLoginErrors();
        
        // Validate email
        if (!isValidEmail(email)) {
            loginEmailError.textContent = 'يرجى إدخال بريد إلكتروني صحيح (@gmail.com, @hotmail.com, @yahoo.com)';
            loginEmail.classList.add('error');
            return;
        }

        // Validate password length
        if (password.length < 5) {
            loginPasswordError.textContent = 'كلمة المرور يجب أن تكون 5 أحرف على الأقل';
            loginPassword.classList.add('error');
            return;
        }

        // If validation passes, proceed with login
        console.log('Login attempt:', { email, password });
        showMessage('تم تسجيل الدخول بنجاح', 'success');
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1500);
    });

    // Login email validation on blur
    loginEmail.addEventListener('blur', () => {
        const email = loginEmail.value.trim();
        if (email && !isValidEmail(email)) {
            loginEmailError.textContent = 'يرجى إدخال بريد إلكتروني صحيح (@gmail.com, @hotmail.com, @yahoo.com)';
            loginEmail.classList.add('error');
        }
    });

    // Login password validation on blur
    loginPassword.addEventListener('blur', () => {
        const password = loginPassword.value;
        if (password && password.length < 5) {
            loginPasswordError.textContent = 'كلمة المرور يجب أن تكون 5 أحرف على الأقل';
            loginPassword.classList.add('error');
        }
    });

    // Clear login errors on input
    loginEmail.addEventListener('input', () => {
        if (loginEmail.classList.contains('error')) {
            const email = loginEmail.value.trim();
            if (isValidEmail(email)) {
                loginEmailError.textContent = '';
                loginEmail.classList.remove('error');
            }
        }
    });

    loginPassword.addEventListener('input', () => {
        if (loginPassword.classList.contains('error')) {
            if (loginPassword.value.length >= 5) {
                loginPasswordError.textContent = '';
                loginPassword.classList.remove('error');
            }
        }
    });

    // Function to clear login form errors
    function clearLoginErrors() {
        loginEmailError.textContent = '';
        loginPasswordError.textContent = '';
        loginEmail.classList.remove('error');
        loginPassword.classList.remove('error');
    }

    // Function to clear all errors
    function clearErrors() {
        clearLoginErrors();
        emailError.textContent = '';
        passwordError.textContent = '';
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');
    }

    // Handle registration form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            fullName: registerForm.querySelector('input[type="text"]').value,
            email: emailInput.value.trim(),
            password: passwordInput.value,
            confirmPassword: confirmPasswordInput.value
        };

        // Reset error messages
        emailError.textContent = '';
        passwordError.textContent = '';
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');

        // Validate email
        if (!isValidEmail(formData.email)) {
            emailError.textContent = 'يرجى إدخال بريد إلكتروني صحيح (@gmail.com, @hotmail.com, @yahoo.com)';
            emailInput.classList.add('error');
            return;
        }

        // Validate password length
        if (formData.password.length < 5) {
            passwordError.textContent = 'كلمة المرور يجب أن تكون 5 أحرف على الأقل';
            passwordInput.classList.add('error');
            return;
        }

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            showMessage('كلمات المرور غير متطابقة', 'error');
            return;
        }

        // Simulate registration
        console.log('Registration attempt:', formData);
        showMessage('تم إنشاء الحساب بنجاح', 'success');
        
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1500);
    });

    // Email validation on blur
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !isValidEmail(email)) {
            emailError.textContent = 'يرجى إدخال بريد إلكتروني صحيح (@gmail.com, @hotmail.com, @yahoo.com)';
            emailInput.classList.add('error');
        }
    });

    // Password validation on blur
    passwordInput.addEventListener('blur', () => {
        const password = passwordInput.value;
        if (password && password.length < 5) {
            passwordError.textContent = 'كلمة المرور يجب أن تكون 5 أحرف على الأقل';
            passwordInput.classList.add('error');
        }
    });

    // Clear errors when typing
    emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('error')) {
            const email = emailInput.value.trim();
            if (isValidEmail(email)) {
                emailError.textContent = '';
                emailInput.classList.remove('error');
            }
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.classList.contains('error')) {
            if (passwordInput.value.length >= 5) {
                passwordError.textContent = '';
                passwordInput.classList.remove('error');
            }
        }
    });

    // Function to validate email
    function isValidEmail(email) {
        const validDomains = ['@gmail.com', '@hotmail.com', '@yahoo.com'];
        return validDomains.some(domain => email.toLowerCase().endsWith(domain));
    }

    // Function to show messages
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        formContainer.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
});