const form = document.getElementById('form');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const error_message = document.getElementById('error-message');
const firstname_input = document.getElementById('firstname-input');
const retype_password_input = document.getElementById('retype-password');

form.addEventListener('submit', (e) => {
    let errors = [];

    if (firstname_input && retype_password_input) {
        errors = getSignupFormErrors(
            firstname_input.value,
            email_input.value,
            password_input.value,
            retype_password_input.value
        );
    } 
    else {
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join('. ');
    }
});

function getSignupFormErrors(firstname, email, password, retypePassword) {
    let errors = [];

    if (firstname.trim() === '') {
        errors.push('Firstname is required');
        firstname_input.parentElement.classList.add('incorrect');
    }

    if (email.trim() === '') {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }

    if (password.trim() === '') {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
        password_input.parentElement.classList.add('incorrect');
    }

    if (password !== retypePassword) {
        errors.push('Passwords do not match');
        password_input.parentElement.classList.add('incorrect');
        retype_password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];

    if (email.trim() === '') {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }

    if (password.trim() === '') {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

const allInputs = [email_input, password_input].filter(input => input != null)
if (firstname_input) allInputs.push(firstname_input);
if (retype_password_input) allInputs.push(retype_password_input);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
        }
    });
});