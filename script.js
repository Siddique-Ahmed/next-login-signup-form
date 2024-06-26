let eye1 = document.querySelector("#eye1");
let eye2 = document.querySelector("#eye2");
let eye3 = document.querySelector("#eye3");
let pass1 = document.querySelector("#userPassword");
let pass2 = document.querySelector("#userConfirmPassword");
let pass3 = document.querySelector("#getuserPassword");

eye1.addEventListener("click", () => {
  if (pass1.type === "password") {
    pass1.type = "text";
    eye1.classList.add("fa-eye");
    eye1.classList.remove("fa-eye-slash");
  } else {
    pass1.type = "password";
    eye1.classList.add("fa-eye-slash");
    eye1.classList.remove("fa-eye");
  }
});
eye2.addEventListener("click", () => {
  if (pass2.type === "password") {
    pass2.type = "text";
    eye2.classList.add("fa-eye");
    eye2.classList.remove("fa-eye-slash");
  } else {
    pass2.type = "password";
    eye2.classList.add("fa-eye-slash");
    eye2.classList.remove("fa-eye");
  }
});
eye3.addEventListener("click", () => {
  if (pass3.type === "password") {
    pass3.type = "text";
    eye3.classList.add("fa-eye");
    eye3.classList.remove("fa-eye-slash");
  } else {
    pass3.type = "password";
    eye3.classList.add("fa-eye-slash");
    eye3.classList.remove("fa-eye");
  }
});

// ############ page Convert ################ \\

let lpage = document.querySelector("#lPage");
let spage = document.querySelector("#sPage");
let signupPage = document.querySelector(".mainContent");
let loginPage = document.querySelector(".loginContent");

lpage.addEventListener("click", (e) => {
  e.preventDefault();
  if (loginPage.style.display == "none") {
    loginPage.style.display = "flex";
    signupPage.style.display = "none";
  } else {
    loginPage.style.display = "none";
    signupPage.style.display = "flex";
  }
});

spage.addEventListener("click", (e) => {
  e.preventDefault();
  if (signupPage.style.display == "none") {
    loginPage.style.display = "none";
    signupPage.style.display = "flex";
  } else {
    loginPage.style.display = "flex";
    signupPage.style.display = "none";
  }
});

// ################# get input fields ####################### \\

let signupBtn = document.querySelector("#signupBtn");

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formValidate();
});

let saveUserDataArr = [];

function saveToLocalStorage() {
  localStorage.setItem("Save", JSON.stringify(saveUserDataArr));
}

function loadFromLocalStorage() {
  let retrievedData = localStorage.getItem("Save");
  if (retrievedData) {
    saveUserDataArr = JSON.parse(retrievedData);
  }
}
loadFromLocalStorage(); 

function formValidate() {
  let firstName = document.querySelector("#firstName").value.trim();
  let lastName = document.querySelector("#lastName").value.trim();
  let username = document.querySelector("#userName").value.trim();
  let Email = document.querySelector("#userEmail").value.trim();
  let password = document.querySelector("#userPassword").value.trim();
  let confirmPassword = document.querySelector("#userConfirmPassword").value.trim();
  let numPat = /\d/;
  let letterPat = /[A-Za-z]/;

  function validEmail(Email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(Email)
  }

  if (
    firstName === "" ||
    lastName === "" ||
    username === "" ||
    Email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    swal.fire("please fill the required fields");
    return
  }

  if (firstName.length < 3 || firstName.length > 15) {
    swal.fire("Name should be between 3 and 15 characters long.");
    return;
  }
  if (firstName.search(numPat) !== -1) {
    swal.fire("first name don't take any number or symbol");
  }
  if (lastName.length < 3 || lastName.length > 15) {
    swal.fire("Last name should be between 3 and 15 characters long.");
    return;
  }
  if (lastName.search(numPat) !== -1) {
    swal.fire("Last name should not contain any numbers");
    return;
  }
  if (username.length < 3 || username.length > 15) {
    swal.fire("Username should be between 3 and 15 characters long.");
    return;
  }
  if (username.search(letterPat) === -1 || username.search(numPat) === -1) {
    swal.fire("Username must contain at least one letter and one number.");
    return;
  }
  if (!validEmail(Email)) {
    swal.fire("Please enter a valid email address");
    return;
  }
  if (
    password.length < 6 ||
    password.length > 8 ||
    confirmPassword.length < 6 ||
    confirmPassword.length > 8
  ) {
    swal.fire("Password must be between 6 and 8 characters long.");
    return;
  }
  if (confirmPassword !== password) {
    swal.fire("Passwords doesn't match");
    return;
  }

  let fullName = `${firstName} ${lastName}`

  let userExists = saveUserDataArr.some((user) => user.email === Email);
  if (userExists) {
    swal.fire("User already exists");
    return;
  }
  let newUser = {
    fullName: fullName,
    username: username,
    email: Email,
    password: password,
  };
  saveUserDataArr.push(newUser);
  saveToLocalStorage();

  swal.fire("Registration successful!");
  setTimeout(() => {
    loginPage.style.display = "flex";
    signupPage.style.display = "none";
  }, 1000);
  // ######### reset form fields ##################### \\
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#userName").value = "";
  document.querySelector("#userEmail").value = "";
  document.querySelector("#userPassword").value = "";
  document.querySelector("#userConfirmPassword").value = "";
}

// ################## checking user data ################## \\

let loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click",(e)=>{
  e.preventDefault()
  userLogin()
})

function userLogin() {
  let emailUserName = document.querySelector("#getuserName").value.trim();
  let userPassword = document.querySelector("#getuserPassword").value.trim();

 let userFound = saveUserDataArr.some(
    (data) =>
      (data.email === emailUserName || data.username === emailUserName) &&
      data.password === userPassword
  );

  if (userFound) {
    swal.fire("Login Successfull");
  } else {
    Swal.fire("Invalid email or password!");
  }
}