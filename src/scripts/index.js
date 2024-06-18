// Add event listener to signup link
document
  .getElementById("signup-link")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Log a console message indicating the redirection to signup page
    console.log("Redirecting to signup page...");

    // Simulate a delay before redirecting
    setTimeout(() => {
      window.location.href = "/pages/signup.html";
    }, 2000); // Simulate a 2-second delay
  });

// Add event listener to login link
document
  .getElementById("login-link")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Log a console message indicating the redirection to login page
    console.log("Redirecting to login page...");

    // Simulate a delay before redirecting
    setTimeout(() => {
      window.location.href = "/pages/login.html";
    }, 2000); // Simulate a 2-second delay
  });
