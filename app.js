// Declaring class buttons

const txtdata = document.querySelector(".btn-primary");
const txtjson = document.querySelector(".btn-success");
const txtapi = document.querySelector(".btn-warning");

// Passing Arguments on Function

txtdata.addEventListener("click", () => {
 fetchData("button1", "./message/message.txt");
});
txtjson.addEventListener("click", () => {
 fetchData("button2", "./message/message.json");
});
txtapi.addEventListener("click", () => {
 fetchData("button3", "https://jsonplaceholder.typicode.com/users");
});

// Ajax Function that takes two parameters or arguments

function fetchData(buttons, urldata) {
 // Setting up Request

 const xhr = new XMLHttpRequest();
 const method = "Get";
 const url = urldata;
 const button = buttons;

 // Request Method

 xhr.open(method, url, true);

 // Sending Request

 xhr.send();

 //  Processing Request

 xhr.onload = () => {
  if (xhr.status === 200 && button === "button1") {
   let data = xhr.responseText;
   displaydata(data, button);
  } else if (button === "button2") {
   let data = JSON.parse(xhr.responseText);
   let fullname = data.name + " " + data["last-name"];
   displaydata(fullname);
  } else {
   let data = JSON.parse(xhr.responseText);
   let usercount = 0;
   for (let index of data) {
    let template = "";
    usercount++;
    template = `
     <div class="card">
     <div class="card-header">
     <h3>User ${usercount}</h3>
     </div>
    <div class="card-body">
    <ul class="list-group  mt-3 border">
    <li class="list-group-item">Name: ${index.name}</li>
    <li class="list-group-item">Username: ${index.username}</li>
    <li class="list-group-item">Email: ${index.email}</li>
    <li class="list-group-item">User Address: ${index.address.city}</li>
    </ul>
    </div>
     </div>
    `;
    document.querySelector(".text-api").innerHTML += template;
    console.log(template);
   }
  }
 };

 //  Displaying Request

 const displaydata = (data) => {
  let htmltemplate = `<p>${data}</p>`;
  if (button == "button1") {
   document.querySelector(".text-data").innerHTML = htmltemplate;
  } else {
   document.querySelector(".text-json").innerHTML = htmltemplate;
  }
 };
}
