import"../modulepreload-polyfill-B5Qt9EMX.js";import{A as n,C as l}from"../sdk-CmoZK28I.js";const o=new l,i=new n(o),c="https://cloud.appwrite.io/v1",d="6672cfc000031266de15";o.setEndpoint(c).setProject(d);const t=document.getElementById("login-form");t.addEventListener("submit",async e=>{e.preventDefault();const a=t.email.value.trim(),s=t.password.value;if(!a||!s){alert("Please fill in all fields.");return}try{const r=await i.createEmailPasswordSession(a,s);console.log("Login successful:",r),localStorage.setItem("appwriteSession",r.$id),alert("Login successful!"),t.reset(),window.location.href="/pages/news.html"}catch(r){u(r)}});function u(e){switch(e.code){case 400:m(e);break;case 401:alert("Incorrect email or password. Please try again.");break;case 403:alert("Forbidden: You do not have permission to log in.");break;case 404:alert("User not found. Please check your credentials.");break;case 429:alert("Too many login attempts. Please try again later.");break;case 500:alert("Internal Server Error: Please try again later.");break;case 503:alert("Service Unavailable: Please try again later.");break;default:console.error("Error logging in:",e),alert("An unexpected error occurred. Please try again later.")}}function m(e){const a=e.message.toLowerCase();a.includes("email")?alert("Invalid email format. Please enter a valid email address."):a.includes("password")?alert("Invalid password format. Please ensure your password meets the required criteria."):alert("Bad Request: Please check your input and try again."),console.error("Bad Request Error:",e)}