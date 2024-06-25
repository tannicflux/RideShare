let buttonValue = '';

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')


/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () =>{
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})

// document.querySelector('.loginForm').addEventListener('submit', (event) => {
//     event.preventDefault(); // Prevent the default form submission behavior
//     const emailInput = document.querySelector('#email');
//     const passwordInput = document.querySelector('#password');

//     fetch('/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: emailInput.value, password: passwordInput.value }),
//     })
//     .then(response => response.text()) // Parse the response as text
//     .then(message => {
//         if (message === 'Login successful') {
//             alert('Login successful');
//             window.location.href = '/';
//         } else {
//             alert(message); // Show the error message
//         }
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });
// });

/*=============== SIGNUP ===============*/
const signup = document.getElementById('signup'),
      signupBtn = document.getElementById('signup-btn'),
      signupClose = document.getElementById('signup-close')

/* Signup show */
signupBtn.addEventListener('click', () =>{
   signup.classList.add('show-signup')
   login.classList.remove('show-login')
})

/* Signup hidden */
signupClose.addEventListener('click', () =>{
   signup.classList.remove('show-signup')
})

// document.querySelector('#signup-form').addEventListener('submit', (event) => {
//     event.preventDefault(); // Prevent the default form submission behavior

   //  const full_name = document.querySelector('#full_name');
   //  const email = document.querySelector('#email');
   //  const password = document.querySelector('#password');
   //  const confirm_password = document.querySelector('#password');
   //  const mobile_number = document.querySelector('#phone_number');
   //  const college_name = document.querySelector('#college_name');

//     fetch('/submit_signup', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
      //   body: JSON.stringify({ 
      //       fullName: full_name.value, 
      //       email: email.value, 
      //       password: password.value,
      //       confirmPassword: confirm_password.value,
      //       phoneNumber: mobile_number.value,
      //       collegeName: college_name.value
      //   }),
//     })
//     .then(response => response.text()) // Parse the response as text
//     .then(message => {
//         if (message === 'Signup successful') {
//             alert('Signup successful');
//         } else {
//             alert(message); // Show the error message
//         }
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });
// });

/*=============== WHERE YOU HEADED ===============*/
const join = document.getElementById('where_you_headed'),
      joinBtn = document.getElementById('join-btn'),
      joinClose = document.getElementById('where_you_headed-close')

/* Signup show */
joinBtn.addEventListener('click', () =>{
   join.classList.add('show-where_you_headed')
})

/* Signup hidden */
joinClose.addEventListener('click', () =>{
   join.classList.remove('show-where_you_headed')
})

/* =============== Cards =============== */
const whereYouHeadedForm = document.getElementById('where_you_headed__form');
const cards = document.getElementById('cards'); // Make sure this is the correct ID for your cards div
const cardsClose = document.getElementById('cards-close');
const cardWrapper = document.querySelector('.card-wrapper');

// In the form submit handler
whereYouHeadedForm.addEventListener('submit', event => {
    event.preventDefault();

    // Get the value of the button that was clicked
    const buttonValue = event.submitter.value;

    // Make a POST request to the /select_type endpoint
    fetch('/select_type', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ button: buttonValue }),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // Redirect to the new page
    window.location.href = '/select_group';
    
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});

    // Store the state in local storage
    localStorage.setItem('showCards', 'false');    
});

if (window.location.pathname === '/select_group') {
   // Show the cards
   cards.classList.add('show-cards');
}

if (window.location.pathname === '/login') {
   window.location.href = '/';
}

cardsClose.addEventListener('click', () => {
    cards.classList.remove('show-cards')
    window.location.href = '/';
});

const scrollLeftButton = document.querySelector('#scroll-left');
const scrollRightButton = document.querySelector('#scroll-right');

scrollLeftButton.addEventListener('click', () => {
   cardWrapper.scrollBy({ left: -window.innerWidth * 0.25, behavior: 'auto' });
});

scrollRightButton.addEventListener('click', () => {
   cardWrapper.scrollBy({ left: window.innerWidth * 0.25, behavior: 'auto' });
});

/*=============== CREATE GROUP ===============*/
const create_group = document.getElementById('create_group'),
      create_groupBtn = document.getElementById('create_group-btn'),
      create_groupClose = document.getElementById('create_group-close')

/* create_group show */
create_groupBtn.addEventListener('click', () =>{
   create_group.classList.add('show-create_group')
})

/* create_group hidden */
create_groupClose.addEventListener('click', () =>{
   create_group.classList.remove('show-create_group')
})

function joinlink(){
   const joinElement = document.getElementById('where_you_headed')
   create_group.classList.remove('show-create_group')
   joinElement.classList.add('show-where_you_headed')
}



