// scripts.js
  const deptContainer = document.getElementById('departments')
  const staffContainer = document.getElementById('staff')
  const deptOption = document.getElementById('dept-option')
  const editDeptOption = document.getElementById('edit-dept-option')
  const deleteDeptName = document.getElementById('delete-dept-name')
  const deleteStaffName = document.getElementById('delete-staff-name')
  const editStaffName = document.getElementById('edit-staff-name')
  const editDeptInput = document.getElementById('edit-dept-input')
  const deleteDeptBtn = document.getElementById('dlt-dept-btn')
  const deleteStaffBtn = document.getElementById('dlt-staff-btn')


//variables
  var deptId  //will hold the id for the department
  var staffId  //will hold the id for the staff


// Function to handle opening and closing the add department form
  const toggleAddForm = (top,opacity,id)=>{
    const form = document.getElementById(id)
    form.style.top = top
    form.style.opacity = opacity
  }
//event listeners for the add department button
  const addDept = document.getElementById('add-dept')
  const cancelDept = document.getElementById('cancel-dept')
  addDept.addEventListener('click', ()=>toggleAddForm(0 , 1 , 'dept-form'))
  cancelDept.addEventListener('click',()=>toggleAddForm('100vh' , 0 , 'dept-form'))

//this are the event listeners for the staff section
  const addStaff = document.getElementById('add-staff')
  const cancelStaff = document.getElementById('cancel-staff')
  addStaff.addEventListener('click',()=>toggleAddForm(0 , 1 , 'staff-form'))
  cancelStaff.addEventListener('click',()=>toggleAddForm('100vh' , 0 , 'staff-form'))

// Function to show the selected tab content and hide others
  const openTab = (tabName)=>{
    // Hide all tab content
      const tabcontent = document.querySelectorAll(".tabcontent")
      for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"
      }

    // Display the selected tab content and set 'active' class to the clicked tab link
      document.getElementById(tabName).style.display = 'grid'
      document.getElementById(tabName).classList.remove("d-none")
    }

// Get all elements with class=".nav-link" and attach a click event listener
  const tabLinks = document.querySelectorAll(".nav-link")
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener("click", function(e) {
      e.preventDefault()
      var tabName = this.getAttribute("href").substring(1)
      openTab(tabName)
    })
  }

async function fetchData() {
  try {
    const deptData = await fetch('https://apollonia.onrender.com/api/v1/departments/')
    const staffData = await fetch('https://apollonia.onrender.com/api/v1/staffs/')
    const deptJson = await deptData.json()
    const staffJson = await staffData.json()

    //function to handle no department or staff
      const noReturnData = (data , container)=>{
        // Create a new card element
          const card = document.createElement("p")
          card.classList.add("no-info")
        // Append content to the card
          card.innerHTML = `<p> No ${data} Found </p>`
        // Append the newly created p to the container
          container.appendChild(card)
      }
    if(deptJson.data.length < 1){
      noReturnData('Department', deptContainer)
    }
    else{
      deptJson.data.forEach((dept)=>{
        // Create a new card element
        const card = document.createElement("div")
        card.classList.add("card")
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
        const editOption = document.createElement("option")
        option.classList.add("dept-option")
        option.setAttribute('value',dept._id)
        editOption.setAttribute('value',dept._id)
        // Append content to the the select 
        option.innerText = dept.name
        editOption.innerText = dept.name
        // Append the newly created child
        editDeptOption.appendChild(editOption)
        deptOption.appendChild(option)
      })
    }

    if(staffJson.data.length < 1){
      noReturnData('staff',staffContainer)
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

    //This function will handle all the edit ,cancel and delete buttons
      const editCancelAndDeleteBtns = (id , visibility , opacity)=>{
        const editForm = document.getElementById(id)
        editForm.style.visibility = visibility
        editForm.style.opacity = opacity
      }

      //this are the event listeners for the edit of the department section
      const editDeptBtn = document.getElementsByClassName('edit-dept-btn')
      const cancelEditDept = document.getElementById('cancel-edit-dept')
      
      Array.from(editDeptBtn).forEach((dept)=>{
        dept.addEventListener('click',()=>{
          editCancelAndDeleteBtns('edit-dept-form' , 'visible' , 1)
          document.getElementById('edit-dept-name').innerText = `"${dept.getAttribute('name')}" `
          editDeptInput.setAttribute('placeholder',dept.getAttribute('name'))
          deptId = dept.getAttribute('id')
        })
      })
      cancelEditDept.addEventListener('click',()=>{
        editCancelAndDeleteBtns('edit-dept-form' , 'hidden' , 0)
        deptId = ''
      })

    //this are the event listeners for the delete of the department section
    const deleteDeptBtn = document.getElementsByClassName('delete-dept-btn')
    const cancelDeleteDept = document.getElementById('cancel-delete-dept')

    Array.from(deleteDeptBtn).forEach((dept)=>{
      dept.addEventListener('click',()=>{
        editCancelAndDeleteBtns('delete-dept-form' , 'visible' , 1)
        deleteDeptName.innerText =`"${dept.getAttribute('name')}" `
        deptId = dept.getAttribute('id')
      })
    })
    cancelDeleteDept.addEventListener('click',(e)=>{
      editCancelAndDeleteBtns('delete-dept-form' , 'hidden' , 0)
      deptId = ''
    })
    
    //this are the event listeners for the edit of the staff section
    const editStaff = document.getElementsByClassName('edit-staff-btn')
    const cancelEditStaff = document.getElementById('cancel-edit-staff')

    Array.from(editStaff).forEach((staff)=>{
      staff.addEventListener('click',()=>{
        editCancelAndDeleteBtns('edit-staff-form' , 'visible' , 1)
        editStaffName.innerText =`"${staff.getAttribute('name')}" `
        staffId = staff.getAttribute('id')
      })
    })
    
    cancelEditStaff.addEventListener('click',()=>{
      editCancelAndDeleteBtns('edit-staff-form' , 'hidden' , 0)
      staffId = ''
    })

    //this are the event listeners for the delete of the staff section
    const deleteStaffBtn = document.getElementsByClassName('delete-staff-btn')
    const cancelDeleteStaff = document.getElementById('cancel-delete-staff')

    Array.from(deleteStaffBtn).forEach((staff)=>{
      staff.addEventListener('click',()=>{
        editCancelAndDeleteBtns('delete-staff-form' , 'visible' , 1)
        deleteStaffName.innerText =`"${staff.getAttribute('name')}" `
        staffId = staff.getAttribute('id')
      })
    })
    cancelDeleteStaff.addEventListener('click',(e)=>{
      editCancelAndDeleteBtns('delete-staff-form' , 'hidden' , 0)
      staffId = ''
    })

  } catch (error) {
    console.error('Fetch error:', error);
  }
}
fetchData()

//This functions handles the other CRUD operations
  const crudHandler = async(e , reqObj , operation , uri)=>{
    e.preventDefault()
  
    const options = {
      method: operation,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqObj)
    }
  
    try {
      // Make the post request
      await fetch(uri, options)
  
      window.location.reload()
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error.message);
    }
  }

//this function adds new dept
  const addNewDept = document.getElementById('add-new-dept')
  addNewDept.addEventListener('submit',(e)=>{
    const req = {
      name : document.getElementById('department-name').value
    }
    const URL = 'https://apollonia.onrender.com/api/v1/departments/';
    crudHandler(e , req , 'POST' , URL)
  })
  
  //this function adds new staff
  const addNewStaff = document.getElementById('add-new-staff')
  addNewStaff.addEventListener('submit',async(e)=>{
    
    const req = {
      name : document.getElementById('staff-first-name').value,
      surname : document.getElementById('staff-surname').value,
      department_id : document.getElementById('dept-option').value
    }
    const URL = 'https://apollonia.onrender.com/api/v1/staffs/'
    crudHandler(e , req , 'POST' , URL)
  })
  
  
  //this function update a dept
  const updateDept = document.getElementById('update-dept')
  updateDept.addEventListener('click',async(e)=>{
  
    const req = {
      name : editDeptInput.value
    } 
    const URL = `https://apollonia.onrender.com/api/v1/departments/${deptId}`
    crudHandler(e , req , 'PUT' , URL)
  })
  
  //this function update a staff
  const updateStaff = document.getElementById('update-staff')
  updateStaff.addEventListener('click',async(e)=>{
  
    const req = {
      name : document.getElementById('edit-staff-first-name').value,
      surname : document.getElementById('edit-staff-surname').value,
      department_id : document.getElementById('edit-dept-option').value
    }
    const URL = `https://apollonia.onrender.com/api/v1/staffs/${staffId}`
    
    crudHandler(e , req , 'PUT' , URL)
  })
  
//This function is for the delete operations
  const deleteHandler = async(e,uri)=>{
    e.preventDefault()

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }

    try {
      // Make the delete request
        await fetch(uri, options)
        window.location.reload()
    } catch (error) {
    // Handle any errors that occurred during the fetch
      console.error('Error:', error.message);
    }
  }

//this function delete a dept
  deleteDeptBtn.addEventListener('click',async(e)=>{

    const URL = `https://apollonia.onrender.com/api/v1/departments/${deptId}`;
    deleteHandler(e,URL)
  })

//this function delete a staff
  deleteStaffBtn.addEventListener('click',async(e)=>{

    const URL = `https://apollonia.onrender.com/api/v1/staffs/${staffId}`
    deleteHandler(e,URL)
  })