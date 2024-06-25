document.addEventListener('DOMContentLoaded', (event) => {
    // Login form submission
    document.querySelector('.login__form').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
 
        const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#password');
 
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailInput.value, password: passwordInput.value }),
        })
        .then(response => response.text()) // Parse the response as text
        .then(message => {
            if (message === 'Login successful') {
                alert('Login successful');
                window.location.href = '/';
            } else {
                alert(message); // Show the error message
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
 
    // Signup form submission
    document.querySelector('.signup__form').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
 
        const full_name = document.querySelector('#full_name');
        const email = document.querySelector('#email_signup');
        const password = document.querySelector('#password_signup');
        const confirm_password = document.querySelector('#confirm_password');
        console.log(password.value);
        const mobile_number = document.querySelector('#phone_number');
        const college_name = document.querySelector('#college_name');
 
        fetch('/submit_signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
             fullName: full_name.value, 
             email: email.value, 
             password: password.value,
             confirmPassword: confirm_password.value,
             phoneNumber: mobile_number.value,
             collegeName: college_name.value
         }),
        })
        .then(response => response.text()) // Parse the response as text
        .then(message => {
            if (message === 'Signup successful') {
                alert('Signup successful');
                window.location.href = '/';
            } else {
                alert(message); // Show the error message
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });

    // Create Group form submission
    document.querySelector('.create_group__form').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const group_type = document.querySelector('#group_type');
        const start_point = document.querySelector('#Start_point');
        const destination = document.querySelector('#Destination');
        const start_time = document.querySelector('#start_time');
        const date = document.querySelector('#Date');
        const max_people = document.querySelector('#Seats');
        const type = document.querySelector('#type');

        fetch('/create_group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                group_type: group_type.value, 
                start_point: start_point.value, 
                Destination: destination.value,
                start_time: start_time.value,
                date: date.value,
                max_people: max_people.value,
                type: type.value
            }),
        })
        .then(response => response.text()) // Parse the response as text
        .then(message => {
            if (message === 'Group created successfully') {
                alert('Group created successfully');
                window.location.href = '/';
            } else {
                alert(message); // Show the error message
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });

 });