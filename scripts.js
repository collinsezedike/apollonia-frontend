// scripts.js
const deptContainer = document.getElementById('departments')
const staffContainer = document.getElementById('staff')

//this are the event listeners for the department section
const addDept = document.getElementById('add-dept')
const deptForm = document.getElementById('dept-form')
const cancelDept = document.getElementById('cancel-dept')
addDept.addEventListener('click',()=>{
  deptForm.style.top = 0
  deptForm.style.left = 0  
})
cancelDept.addEventListener('click',(e)=>{
  e.preventDefault()
  deptForm.style.top = '100vh'
  deptForm.style.left = 0
})

//this are the event listeners for the staff section
const addStaff = document.getElementById('add-staff')
const staffForm = document.getElementById('staff-form')
const cancelStaff = document.getElementById('cancel-staff')
addStaff.addEventListener('click',()=>{
  staffForm.style.top = 0
  staffForm.style.left = 0
})
cancelStaff.addEventListener('click',(e)=>{
  e.preventDefault()
  staffForm.style.top = '100vh'
  staffForm.style.left = 0
})

// Function to show the selected tab content and hide others
function openTab(evt, tabName) {
  var i, tabcontent;

  // Hide all tab content
  tabcontent = document.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Display the selected tab content and set 'active' class to the clicked tab link
  document.getElementById(tabName).style.display = "flex";
  document.getElementById(tabName).classList.remove("d-none");
}

// Get all elements with class=".nav-link" and attach a click event listener
var tabLinks = document.querySelectorAll(".nav-link");
for (var i = 0; i < tabLinks.length; i++) {
  tabLinks[i].addEventListener("click", function(event) {
    event.preventDefault();
    var tabName = this.getAttribute("href").substring(1);
    openTab(event, tabName);
  });
}

// staffContainer.addEventListener('click', function(event) {
//   if (event.target.classList.contains('edit-btn')) {
//     // Handle edit button click here
//     const card = event.target.closest('.card');
//     if (card) {
//       editToggle()
//       console.log('Edit clicked for card:', card);
//     }
//   }
// });

// Function to toggle between card and form on "Edit" button click
const editToggle = ()=>{
  var editBtns = document.querySelectorAll('.edit-btn');
  for (let i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener('click', function() {
      var cardBody = this.parentElement;
      var card = cardBody.parentElement;
      var editForm = cardBody.querySelector('.edit-form');
      card.classList.add('card-flipped');
      editForm.classList.remove('d-none');
      // editForm.classList.add('d-block');
    });
  }
}
// Function to cancel editing and flip back to the card
const cancelToggle = ()=>{
  var cancelBtns = document.querySelectorAll('.cancel-btn');
  for (let j = 0; j < cancelBtns.length; j++) {
    cancelBtns[j].addEventListener('click', function() {
      var editForm = this.parentElement;
      var cardBody = editForm.parentElement;
      var card = cardBody.parentElement;
      card.classList.remove('card-flipped');
    });
  }
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
    const deptData = await fetch('http://localhost:5000/api/v1/departments');
    const staffData = await fetch('http://localhost:5000/api/v1/staffs');
    const deptJson = await deptData.json();
    const staffjson = await staffData.json();
    deptJson.data.forEach((dept)=>{
      // Create a new card element
      const card = document.createElement("div");
      card.classList.add("card");
      // Append content to the card
      card.innerHTML = 
      `
        <div class="card-body">
          <div class="card-front">
            <h5 class="card-title">${dept.name}</h5>
            <h5 class="card-title">Staff: ${dept.staff_count}</h5>
            <button class="btn btn-primary edit-btn">Edit Department Name</button>
          </div>
          <div class="card-back">
            <!-- Form for editing department name -->
            <form class="edit-form">
              <div class="mb-3">
                <label for="departmentName" class="form-label">New Department Name</label>
                <input type="text" class="form-control" id="departmentName">
              </div>
              <button type="submit" class="btn btn-success">Save</button>
              <button type="button" class="btn btn-secondary cancel-btn">Cancel</button>
            </form>
          </div>
        </div>  
      `
      // Append the newly created card to the container
      deptContainer.appendChild(card);
      editToggle()
      cancelToggle()
    })

    staffjson.data.forEach((staff)=>{
      // Create a new card element
      const card = document.createElement("div");
      card.classList.add("card");
      // Append content to the card
      card.innerHTML = 
      `
        <div class="card-body">
          <div class="card-front">
            <h5 class="card-title">${staff.name} ${staff.surname}</h5>
            <button class="btn btn-primary edit-btn">Edit Staff Name</button>
          </div>
          <div class="card-back">
            <!-- Form for editing staff name -->
            <form class="edit-form">
              <div class="mb-3">
                <label for="staffName" class="form-label">New Staff Name</label>
                <input type="text" class="form-control" id="staffName">
              </div>
              <button type="submit" class="btn btn-success">Save</button>
              <button type="button" class="btn btn-secondary cancel-btn">Cancel</button>
            </form>
          </div>
        </div>
      `
      // Append the newly created card to the container
      staffContainer.appendChild(card);
      editToggle()
      cancelToggle()
    })
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
fetchData()