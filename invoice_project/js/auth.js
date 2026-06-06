

function handleSignup(event) {
    event.preventDefault();



    let businessName = document.getElementById('businessName').value.trim();

    let businessAddress = document.getElementById('businessAddress').value.trim();


    let email = document.getElementById('email').value.trim();



    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;



    let errorMsg = document.getElementById('errorMsg');
    let successMsg = document.getElementById('successMsg');



    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    if(password !== confirmPassword) {



        errorMsg.innerText = 'Passwords do not match';
        errorMsg.style.display = 'block';

        return;
    }

    if (password.length < 6) {
        errorMsg.innerText = 'Password must be at least 6 characters!';
        errorMsg.style.display = 'block';


        return;
    }

    fetch('api/signup.php', {
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
       body: JSON.stringify({
        businessName: businessName,
        businessAddress: businessAddress,


        email: email,
        password: password
       }) 

    })


    
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success'){
            successMsg.innerText = data.message;
            successMsg.style.display = 'block';
            setTimeout(() => {window.location.href = 'login.html';}, 1500);

        } else{
            errorMsg.innerText = data.message;
            errorMsg.style.display = 'block';
        }
    })
    .catch(error => {
        errorMsg.innerText = 'Server Error: Please check if XAMPP MySQL is running!';
        errorMsg.style.display = 'block';
    });

}


function handleLogin(event) {
    event.preventDefault();

    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value;

    let errorMsg = document.getElementById('errorMsg');
    errorMsg.style.display = 'none';


    fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            localStorage.setItem('invoiceLoggedInUser', JSON.stringify(data.user));
            window.location.href = 'index.html';

        } else {
            errorMsg.innerText = data.message;
            errorMsg.style.display = 'block';
        }
    })
    .catch(error => {
        errorMsg.innerText = 'Server Error: Please check if XAMPP MySQL is running!';
        errorMsg.style.display = 'block';
    });
}