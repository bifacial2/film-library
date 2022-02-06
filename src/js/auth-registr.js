import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBdEwkYD1_puUIBjlQvF88qB9Fc8QioMiw",
    authDomain: "login-with-firebase-6434f.firebaseapp.com",
    databaseURL: "https://login-with-firebase-6434f-default-rtdb.firebaseio.com",
    projectId: "login-with-firebase-6434f",
    storageBucket: "login-with-firebase-6434f.appspot.com",
    messagingSenderId: "414426325677",
    appId: "1:414426325677:web:e4a3a5184c8ec227ff1c24"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// -------------------REFERENCE--------------

const name = document.getElementById('nameInp');
const email = document.getElementById('emailInp');
const pass = document.getElementById('passInp');
const passRep = document.getElementById('passRepInp');
const registBtn = document.getElementById('registBtn');

// -----------------VALIDATION----------------

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null; 
}

function validation() {
    let nameregex = /^[a-zA-Z0-9]{5,}$/;
    let emailregex = /^[a-zA-Z0-9.]+@(gmail|yahoo|outlook)\.com$/; 

    if(isEmptyOrSpaces(name.value) || isEmptyOrSpaces(email.value) || isEmptyOrSpaces(pass.value)) {
        alert("you cannotleft any field empty");
        return false;
    }

    if(!nameregex.test(name.value)) {
        alert("-username name can only be alphanumeric\n-username must be aleast must be 5 charaters\n-username cannot contain spaces");
        return false ;
    }

    if(!emailregex.test(email.value)) {
        alert("enter a valid email!");
        return false;
    }

    if(passRep.value !== pass.value) {
        alert("passwords are different!");
        return false;
    }
    return true; 
}

// -----------------REGISTER USER TO FIREBASE----------------

function registerUser(e) {
    e.preventDefault();
    if(!validation()) {
        return;
    };
    const dbRef = ref(db);

    get(child(dbRef, "UsersList/"+ name.value)).then((snapshot) => {
        
        if(snapshot.exists()) {
            alert("account already exist!");
        }

        else {
            set(ref(db, "UsersList/"+ name.value),
            {
                name: name.value,
                email: email.value,
                password: encPass(),
            })
            .then(() => {
                alert("user added successfully");
            })
            .catch((error) => {
                alert("error" + error);
            })
        }
    })
}

// -----------------ENCRIPTION----------------

function encPass(){
    let pass13 = CryptoJS.AES.encrypt(pass.value, pass.value);
    return pass13.toString();
}

// -----------------ASSIGN THE EVENTS----------------

registBtn.addEventListener('click', registerUser); 

// -----------------AUTHENTICATION PROCESS----------------

const logEmail = document.getElementById('emailLog');
const logPass = document.getElementById('passLog');
const logBtn = document.getElementById('logInBtn');


function authenticateUsers(e) {
    e.preventDefault();
    const dbRef = ref(db);

    get(child(dbRef, "UsersList")).then((snapshot) => {
        snapshot.forEach(el => {
            // console.log(el.val());

            let dbPass = decPass(el.val().password);
            let dbEmail = el.val().email;

            // console.log(el.val().password);
            // console.log(el.val().email);
            if(logPass.value === '' || logEmail.value === '') {
                alert('password or email not entered');
                return true;
            }

            if(dbPass === logPass.value && dbEmail === logEmail.value) {
                alert('OK');
                return true;
            }
            else{
                alert("user does not exist");
                return true;
            }
            
        })
        return false;
        
    })
}

// -----------------DECRIPTION----------------

function decPass(dbPass){
    let pass12 = CryptoJS.AES.decrypt(dbPass, logPass.value);
    return pass12.toString(CryptoJS.enc.Utf8);
}

// -----------------LOGIN----------------

logBtn.addEventListener('click', authenticateUsers); 