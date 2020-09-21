// globally Assign Variable
// let myname = document.getElementById("myname");
let emaillogin = document.getElementById("emaillogin");
let passwordlogin = document.getElementById("passwordlogin");
let Error = document.getElementById("userErrors");
let email = document.getElementById("email");
let password = document.getElementById("password");
let success = document.getElementById("succesMessege");
let usermessage = document.getElementById("usermessage");
let main = document.getElementById("main");

// Signin setup
let login = () => {
    firebase.auth().signInWithEmailAndPassword(emaillogin.value, passwordlogin.value)

        .then((result) => {
            console.log(result);
            emaillogin = "";
            passwordlogin = "";
            success.style.display = "block";
            window.setTimeout(() => {
                window.location.replace('./chat.html');
                success.style.display = "none";
            }, 1500);
        })

        .catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            Error.innerHTML = error.message;
            Error.style.display = "block";
            emaillogin = "";
            passwordlogin = ""
            // ...
        });

}

// SignUp setup
let Signup = () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((result) => {
            console.log(result);
            success.style.display = "block";
            window.setTimeout(() => {
                window.location.replace('./index.html');
                success.style.display = "none";
            }, 2000);

        })

        .catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            Error.innerHTML = error.message;
            Error.style.display = "block";
            email = "";
            password = ""
            // ...
        });

}


// chat work
let sentmessage = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var email = user.email;
            let key = firebase.database().ref('Chatapp').push().key;
            let Info = {
                email: email,
                msg: usermessage.value,
                key: key
            }
            // for Insert in database
            firebase.database().ref('messages').child(key).set(Info);
            // for value eMpty
            usermessage.value = ''
        }
    });
 // let p = document.createElement("p");
    // let ptext = document.createTextNode(usermessage.value);
    // p.appendChild(ptext);
    // main.appendChild(p);
    // console.log(p)
}
firebase.database().ref('messages').on("child_added", function (data) {
    let p = document.createElement("p");
    let ptext = document.createTextNode(`${data.val().email}: ${data.val().msg}`);
    p.appendChild(ptext);
    main.appendChild(p);

});

