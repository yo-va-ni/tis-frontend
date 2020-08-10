const loggedInLinks = document.querySelectorAll("#logout");

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    console.log("hola")
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    console.log("Hola2")
  }
};


// Error message
const errorPopup = (error, tab=null) => {
  if(tab!=null){
    $(`#${tab}`).modal("hide");
  }
  $("#signError").modal("show");
  $("#signErrorText").text(error);
  setTimeout(()=>{
    $("#signError").modal("hide");
  }, 2000);
  signInForm.reset();

}



// SingIn
const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm["exampleInputEmail1"].value;
  const password = signInForm["exampleInputPassword1"].value;

  // Authenticate the User
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // clear the form
      signInForm.reset();
      console.log("sigin");
      window.open("home.html");
    })
    .catch(errorPopup);
});




// Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("Good bye Mr");
  });
});




// SignUp
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;
  console.log(email,password)
  // Authenticate the User
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // clear the form
      signUpForm.reset();
      // close the modal
      $("#signupModal").modal("hide");
    })
    .catch(error => errorPopup(error,"signupModal"));

});



// events
// state changes
auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("auth: signin");
      loginCheck(user);
        
    } else {
      console.log("auth: signout");
      loginCheck(user);
    }
  }
);
  



// Login with Google
const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", (e) => {
    e.preventDefault();
    signInForm.reset();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      console.log("google sign in");
      window.location.href = "home.html";
    })
    .catch(errorPopup);
});



// Login with Facebook
const facebookButton = document.querySelector('#facebookLogin');

facebookButton.addEventListener('click', e => {
  e.preventDefault();
  signInForm.reset();

  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    console.log("facebook sign in");
    window.open("home.html");
  })
  .catch(errorPopup);

})

// Login with Twitter
const twitterButton = document.querySelector("#twitterLogin");

twitterButton.addEventListener("click", e => {
  e.preventDefault();
  signInForm.reset();

  const provider = new firebase.auth.TwitterAuthProvider();
  auth.signInWithPopup(provider)
  .then((result) => {
    console.log(result);
    console.log("twitter sign in");
    window.open("home.html");
  })
  .catch(errorPopup);

})


