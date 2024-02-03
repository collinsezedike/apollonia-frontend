// scripts.js
const deptContainer = document.getElementById('departments')
const staffContainer = document.getElementById('staff')
const addNewDept = document.getElementById('add-new-dept')
const addNewStaff = document.getElementById('add-new-staff')
const deptOption = document.getElementById('dept-option')
const deleteDeptName = document.getElementById('delete-dept-name')
const editDeptName = document.getElementById('edit-dept-name')
const deleteStaffName = document.getElementById('delete-staff-name')
const editStaffName = document.getElementById('edit-staff-name')
const deleteDeptBtn = document.getElementById('dlt-dept-btn')
const deleteStaffBtn = document.getElementById('dlt-staff-btn')

//variables
 var dltStaffId  //will hold the id for the staff to be deleted
 var dltDeptId  //will hold the id for the department to be deleted

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
            <button id=${dept._id} name= ${dept.name} class="edit-dept-btn btn-edit">Edit</button>
            <button id=${dept._id} name= ${dept.name} class="delete-dept-btn btn-delete">
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
      const card = document.createElement("p")
      card.classList.add("no-info")
      // Append content to the card
      card.innerHTML = `<p>No Staff Found </p>`
      // Append the newly created p to the container
      staffContainer.appendChild(card)
    }
    else{
      staffJson.data.forEach((staff)=>{
        // Create a new card element
        const card = document.createElement("div")
        card.classList.add("card")
        // Append content to the card
        card.innerHTML = 
        `
          <h5 class="card-title">${staff.name} ${staff.surname}</h5>
          <div class="card-buttons-div">
            <button id=${staff._id} name=${staff.name} class="edit-staff-btn btn-edit">Edit</button>
            <button id=${staff._id} name=${staff.name} class="delete-staff-btn btn-delete">
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
        editDeptForm.style.visibility = 'visible'
        editDeptForm.style.opacity = 1
        editDeptName.innerText = `"${dept.getAttribute('name')}" `
      })
    })
    cancelEditDept.addEventListener('click',(e)=>{
      e.preventDefault()
      editDeptForm.style.opacity = 0
      editDeptForm.style.visibility = 'hidden'
    })

    //this are the event listeners for the delete of the department section
    const deleteDeptBtn = document.getElementsByClassName('delete-dept-btn')
    const deleteDeptForm = document.getElementById('delete-dept-form')
    const cancelDeleteDept = document.getElementById('cancel-delete-dept')

    Array.from(deleteDeptBtn).forEach((dept)=>{
      dept.addEventListener('click',()=>{
        deleteDeptForm.style.visibility = 'visible'
        deleteDeptForm.style.opacity = 1
        deleteDeptName.innerText =`"${dept.getAttribute('name')}" `
        dltDeptId = dept.getAttribute('id')
      })
    })
    cancelDeleteDept.addEventListener('click',(e)=>{
      e.preventDefault()
      deleteDeptForm.style.opacity = 0
      deleteDeptForm.style.visibility = 'hidden'
      dltDeptId = ''
    })

    //this are the event listeners for the edit of the staff section
    const editStaff = document.getElementsByClassName('edit-staff-btn')
    const editStaffForm = document.getElementById('edit-staff-form')
    const cancelEditStaff = document.getElementById('cancel-edit-staff')

    Array.from(editStaff).forEach((staff)=>{
      staff.addEventListener('click',()=>{
        editStaffForm.style.visibility = 'visible'
        editStaffForm.style.opacity = 1
        editStaffName.innerText =`"${staff.getAttribute('name')}" `
      })
    })
    
    cancelEditStaff.addEventListener('click',(e)=>{
      e.preventDefault()
      editStaffForm.style.opacity = 0
      editStaffForm.style.visibility = 'hidden'
    })

    //this are the event listeners for the delete of the staff section
    const deleteStaffBtn = document.getElementsByClassName('delete-staff-btn')
    const deleteStaffForm = document.getElementById('delete-staff-form')
    const cancelDeleteStaff = document.getElementById('cancel-delete-staff')

    Array.from(deleteStaffBtn).forEach((staff)=>{
      staff.addEventListener('click',()=>{
        deleteStaffForm.style.visibility = 'visible'
        deleteStaffForm.style.opacity = 1
        deleteStaffName.innerText =`"${staff.getAttribute('name')}" `
        dltStaffId = staff.getAttribute('id')
      })
    })
    cancelDeleteStaff.addEventListener('click',(e)=>{
      e.preventDefault()
      deleteStaffForm.style.opacity = 0
      deleteStaffForm.style.visibility = 'hidden'
      dltStaffId = ''
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


//this function delete a dept
deleteDeptBtn.addEventListener('click',async(e)=>{
  e.preventDefault()
  const URL = `https://apollonia.onrender.com/api/v1/departments/${dltDeptId}`;

  console.log(`clicking ${dltDeptId}`)
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  try {
    // Make the delete request
    await fetch(URL, options)

    window.location.reload()
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error.message);
  }
})

//this function delete a staff
deleteStaffBtn.addEventListener('click',async(e)=>{
  e.preventDefault()
  const URL = `https://apollonia.onrender.com/api/v1/staffs/${dltStaffId}`
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  try {
    // Make the delete request
    await fetch(URL, options)
    window.location.reload()
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error.message);
  }
})