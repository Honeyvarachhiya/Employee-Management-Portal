let employees = [];
let editIndex=null;

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");
const tableBody = document.querySelector("#employee-table");

// event listner for adding or updating
form.addEventListener("submit", function(e){
    e.preventDefault()

    localStorage.setItem("Name",nameInput.value);
    localStorage.setItem("Email",emailInput.value);
    localStorage.setItem("role",roleInput.value);
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleInput.value.trim();
    
    //case 1 -> for any value missing
     
     if(!name || !email || !role) return;

     const employeeData = {name, email, role}
    
     if(editIndex === null){
        employees.push(employeeData);
     }else{
        employees[editIndex]=employeeData;
        editIndex=null;
        form.querySelector("button").innerHTML="Add Employee";
     }
    form.reset();
    renderTable();
})

function renderTable(){
    tableBody.innerHTML="";
    employees.forEach((emp,index)=> {
    const row = document.createElement("tr")
    row.innerHTML=`<td>${emp.name}</td> 
                   <td>${emp.email}</td> 
                   <td>${emp.role}</td> 
                   <td class="action-btns"> 
                   <button onclick="editEmployee(${index})">Edit</button>
                   <button onclick="deleteEmployee(${index})">Delete</button>
                   </td>`

                   tableBody.appendChild(row);
    })
}

// Edit employee 

function editEmployee(index){
    const emp=employees[index];
    nameInput.value=emp.name;
    emailInput.value=emp.email;
    roleInput.value=emp.role;
    editIndex=index;
    form.querySelector("button").innerText="Update employee"
}

// Delete Employee
function deleteEmployee(index){
    if(confirm("Are you okk boss you want to delete it ???")){
        employees.splice(index, 1);
        renderTable();
    }
}