import"../modulepreload-polyfill-B5Qt9EMX.js";import{A as i,a as d,C as u}from"../sdk-D7tY1HV6.js";console.log("Welcome to Login Page!!!!");const l=new u,g="https://cloud.appwrite.io/v1",p="6672cfc000031266de15";l.setEndpoint(g).setProject(p);const n=new i(l),o=document.getElementById("login-form");o.addEventListener("submit",async e=>{e.preventDefault();const t=o.email.value.trim(),c=o.password.value;console.log("Attempting to log in with email:",t);try{let r;try{r=await n.get(),console.log("Current session details:",r),alert("You are already logged in."),o.reset();return}catch(a){if(a.code===401){const s=await n.createEmailPasswordSession(t,c);console.log("Login successful:",s),alert("Login successful:",s),o.reset(),window.location.href="/pages/news.html"}else throw a}}catch(r){console.error("Login error:",r),m(r)}});function m(e){if(e instanceof d)switch(e.code){case 401:alert("Unauthorized: Please check your email and password.");break;case 403:alert("Forbidden: You do not have permission to access.");break;case 404:alert("Not Found: The requested resource could not be found.");break;case 429:alert("Too many requests. Please try again later.");break;case 500:alert("Internal Server Error: Please try again later.");break;case 503:alert("Service Unavailable: The server is currently unable to handle the request.");break;default:alert(`Error: ${e.message}`)}else alert("An unexpected error occurred. Please try again later."),console.error("Login Error:",e)}
