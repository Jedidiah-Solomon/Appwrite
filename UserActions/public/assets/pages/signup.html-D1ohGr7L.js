import"../modulepreload-polyfill-B5Qt9EMX.js";import{A as d,I as u,C as m}from"../sdk-D7tY1HV6.js";console.log("Welcome to Signup Page!!!!!!!!");const c=new m,p="https://cloud.appwrite.io/v1",y="6672cfc000031266de15";c.setEndpoint(p).setProject(y);const h=new d(c),l=document.getElementById("signup-form");l.addEventListener("submit",async e=>{e.preventDefault();const r=l.name.value.trim(),s=l.email.value.trim(),a=l.password.value;if(!r||!s||!a){alert("Please fill in all fields.");return}try{const t=await f(s,a,r);console.log("User created successfully:",t),alert(`User created successfully and your ID is: ${t.$id}`),l.reset(),await g(r,s,a,t.$id),window.location.href="/pages/login.html"}catch(t){w(t)}});async function f(e,r,s,a=3,t=2e3){for(let n=0;n<a;n++)try{return await h.create(u.unique(),e,r,s)}catch(o){if(o.code===429&&n<a-1)console.warn(`Rate limit exceeded, retrying in ${t/1e3} seconds...`),alert(`Rate limit exceeded, retrying in ${t/1e3} seconds...`),await new Promise(i=>setTimeout(i,t));else throw o}}async function g(e,r,s,a){const t=`
    Welcome onboard Our Esteemed Customer, ${e}!
    Here are your account details:
    - Username: ${e}
    - Email: ${r}
    - Password: ${s}
    - ID: ${a}

    Happy new month to all our customers. God bless you.
  `,n=`
    <b> Welcome onboard Our Esteemed Customer, ${e}!</b><br>
    <p>Here are your account details:</p>
    <ul>
      <li>Username: ${e}</li>
      <li>Email: ${r}</li>
      <li>Password: ${s}</li>
      <li>ID: ${a}</li>
    </ul>
    <p>Happy new month to all our customers. God bless you.</p>
  `;try{const o=await fetch("http://localhost:5000/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:r,text:t,html:n})});if(o.ok)console.log("Email sent successfully"),alert("Email sent successfully!! Please check your mail");else{const i=await o.text();console.error("Error sending email:",i),alert(`Error sending email: ${i}`)}}catch(o){console.error("Error sending email:",o),alert("Error sending email:",o)}}function w(e){switch(e.code){case 400:b(e);break;case 401:alert("Unauthorized: Please check your API credentials.");break;case 403:alert("Forbidden: You do not have permission to perform this action.");break;case 404:alert("Not Found: The requested resource could not be found.");break;case 409:alert("User already exists. Please try logging in.");break;case 429:alert("Too many requests. Please try again later.");break;case 500:alert("Internal Server Error: Please try again later.");break;case 503:alert("Service Unavailable: The server is currently unable to handle the request.");break;default:console.error("Error creating user:",e),alert("An unknown error occurred. Please try again later.")}}function b(e){const r=e.message.toLowerCase();r.includes("email")?alert("Invalid email format. Please enter a valid email address."):r.includes("password")?alert("Weak password. Please ensure your password meets the required criteria."):alert("Bad Request: Please check your input and try again."),console.error("Bad Request Error:",e),alert("Bad Request Error:",e)}
