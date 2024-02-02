// scripts.js
const deptContainer = document.getElementById('departments')
const staffContainer = document.getElementById('staff')
const addNewDept = document.getElementById('add-new-dept')
const addNewStaff = document.getElementById('add-new-staff')
const deptOption = document.getElementById('dept-option')

//this are the event listeners for the department section
const addDept = document.getElementById('add-dept')
const deptForm = document.getElementById('dept-form')
const cancelDept = document.getElementById('cancel-dept')
addDept.addEventListener('click',()=>{
  deptForm.style.top = 0
  deptForm.style.left = 0  
  deptForm.style.opacity = 1  
})
cancelDept.addEventListener('click',(e)=>{
  e.preventDefault()
  deptForm.style.top = '100vh'
  deptForm.style.left = 0
  deptForm.style.opacity = 0
})

//this are the event listeners for the staff section
const addStaff = document.getElementById('add-staff')
const staffForm = document.getElementById('staff-form')
const cancelStaff = document.getElementById('cancel-staff')
addStaff.addEventListener('click',()=>{
  staffForm.style.top = 0
  staffForm.style.left = 0
  staffForm.style.opacity = 1
})
cancelStaff.addEventListener('click',(e)=>{
  e.preventDefault()
  staffForm.style.top = '100vh'
  staffForm.style.left = 0
  staffForm.style.opacity = 0
})

// Function to show the selected tab content and hide others
function openTab(evt, tabName) {
  var i, tabcontent;

  // Hide all tab content
  tabcontent = document.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none"
  }

  // Display the selected tab content and set 'active' class to the clicked tab link
  document.getElementById(tabName).style.display = 'grid'
  document.getElementById(tabName).classList.remove("d-none")
}

// Get all elements with class=".nav-link" and attach a click event listener
var tabLinks = document.querySelectorAll(".nav-link")
for (var i = 0; i < tabLinks.length; i++) {
  tabLinks[i].addEventListener("click", function(event) {
    event.preventDefault()
    var tabName = this.getAttribute("href").substring(1)
    openTab(event, tabName)
  })
}

function open_sidebar() {
  document.getElementById("main").style.marginLeft = "35%";
  document.getElementById("side-bar").style.width = "30%";
  document.getElementById("side-bar").classList.remove("d-none");
  document.getElementById("side-bar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}
function close_sidebar() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("side-bar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}

async function fetchData() {
  try {
    const deptData = await fetch('https://apollonia.onrender.com/api/v1/departments/');
    const staffData = await fetch('https://apollonia.onrender.com/api/v1/staffs/');
    const deptJson = await deptData.json();
    const staffJson = await staffData.json();
    if(deptJson.data.length < 1){
        // Create a new card element
        const card = document.createElement("p");
        card.classList.add("no-info");
        // Append content to the card
        card.innerHTML = `<p> No Department Found </p>`
        // Append the newly created p to the container
        deptContainer.appendChild(card);
    }
    else{
      deptJson.data.forEach((dept)=>{
        // Create a new card element
        const card = document.createElement("div");
        card.classList.add("card");
        // Append content to the card
        card.innerHTML = 
        `
          <h5 >${dept.name}</h5>
          <h5>Staff: ${dept.staff_count == undefined ? '0' : dept.staff_count}</h5>
          <div class="card-buttons-div">
            <button id=${dept._id} class="edit-dept-btn btn-edit">Edit</button>
            <button id=${dept._id} class="btn-delete">
              <img src="./img/bx-trash.png" />
            </button>
          </div>
        `
        // Append the newly created card to the container
        deptContainer.appendChild(card);
      })

      deptJson.data.forEach((dept)=>{
        // Create a the department option
        const option = document.createElement("option")
        option.classList.add("dept-option")
        option.setAttribute('value',dept._id)
        // Append content to the the select 
        option.innerText = dept.name
        // Append the newly created child
        deptOption.appendChild(option)
      })
    }

    if(staffJson.data.length < 1){
      // Create a new card element
      const card = document.createElement("p");
      card.classList.add("no-info");
      // Append content to the card
      card.innerHTML = `<p>No Staff Found </p>`
      // Append the newly created p to the container
      staffContainer.appendChild(card);
    }
    else{
      staffJson.data.forEach((staff)=>{
        // Create a new card element
        const card = document.createElement("div");
        card.classList.add("card");
        // Append content to the card
        card.innerHTML = 
        `
          <h5 class="card-title">${staff.name} ${staff.surname}</h5>
          <div class="card-buttons-div">
            <button id=${staff._id} class="edit-staff-btn btn-edit">Edit</button>
            <button id=${staff._id} class="btn-delete">
              <img src="./img/bx-trash.png" />
            </button>
          </div>
        `
        // Append the newly created card to the container
        staffContainer.appendChild(card);
      })
    }

    //this are the event listeners for the edit of the department section
    const editDeptBtn = document.getElementsByClassName('edit-dept-btn')
    const editDeptForm = document.getElementById('edit-dept-form')
    const cancelEditDept = document.getElementById('cancel-edit-dept')

    Array.from(editDeptBtn).forEach((dept)=>{
      dept.addEventListener('click',()=>{
        console.log(editDeptForm)
        editDeptForm.style.top = 0
        editDeptForm.style.left = 0
      })
    })
    cancelEditDept.addEventListener('click',(e)=>{
      e.preventDefault()
      editDeptForm.style.top = '1000vh'
      editDeptForm.style.left = 0
    })

    //this are the event listeners for the edit of the staff section
    const editStaff = document.getElementsByClassName('edit-staff-btn')
    const editStaffForm = document.getElementById('edit-staff-form')
    const cancelEditStaff = document.getElementById('cancel-edit-staff')

    Array.from(editStaff).forEach((staff)=>{
      staff.addEventListener('click',()=>{
        editStaffForm.style.top = 0
        editStaffForm.style.left = 0
      })
    })

    cancelEditStaff.addEventListener('click',(e)=>{
      e.preventDefault()
      editStaffForm.style.top = '1000vh'
      editStaffForm.style.left = 0
    })

  } catch (error) {
    console.error('Fetch error:', error);
  }
}
fetchData()

//this function adds new dept
addNewDept.addEventListener('submit',async(e)=>{
  e.preventDefault()
  const name = document.getElementById('department-name').value

  const URL = 'https://apollonia.onrender.com/api/v1/departments/';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name})
  }

  try {
    // Make the post request
    await fetch(URL, options)

    window.location.reload()
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error.message);
  }
})

//this function adds new staff
addNewStaff.addEventListener('submit',async(e)=>{
  e.preventDefault()
  const name = document.getElementById('staff-first-name').value
  const surname = document.getElementById('staff-surname').value
  const deptId = document.getElementById('dept-option').value
  console.log(deptId)

  const URL = 'https://apollonia.onrender.com/api/v1/staffs/';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        name,
        surname,
        department_id:deptId
      }
    )
  }

  try {
    // Make the post request
    await fetch(URL, options)

    window.location.reload()
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error.message);
  }
})
