function loadAddCard(){
    const roleForm = document.querySelector(".add-role-form");
    const sumbitButton = document.querySelector(".btn-adding-role");
    sumbitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const roleFormData = new FormData(roleForm);
        const roleFormDataObject = Object.fromEntries(roleFormData);
        let valid = validateCardForm();
        if(valid) return;

        const dataExists = localStorage.getItem("roleData");
        if (dataExists == null) {
            const jsonString = JSON.stringify([roleFormDataObject]);
            localStorage.setItem("roleData", jsonString);
        }
        else {

            const DataArray = JSON.parse(dataExists);
            for (let i = 0; i < DataArray.length; i++) {
                if (DataArray[i]['Role Name'] == roleFormDataObject['Role Name'])
                {
                    window.location.href = "roles.html";
                    return;
                }
            }
            DataArray.push(roleFormDataObject);
            const jsonString = JSON.stringify(DataArray);
            localStorage.setItem("roleData", jsonString);
        }

        imgHandling(roleFormDataObject);

        window.location.href = "roles.html";
    });
}

function loadEditCard(){
    let editingCard = localStorage.getItem('editCard');
    let editingCardObject = JSON.parse(editingCard);
    document.getElementById('h1-tag').innerHTML = "Editing Role";
    document.querySelector('.btn-adding-role').innerText = "Update Role";
    presetValues(editingCardObject)
    const roleForm = document.querySelector(".add-role-form");
    const sumbitButton = document.querySelector(".btn-adding-role");
    sumbitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const roleFormData = new FormData(roleForm);
        const roleFormDataObject = Object.fromEntries(roleFormData);
        let valid = validateCardForm();
        if (valid) return;
        const dataExists = localStorage.getItem("roleData");
        const DataArray = JSON.parse(dataExists);
        for (let i = 0; i < DataArray.length; i++) {
            if(DataArray[i]['Role Name'] == roleFormDataObject['Role Name']){
                DataArray[i] = roleFormDataObject;
                break;
            }
        }
        const jsonString = JSON.stringify(DataArray);
        localStorage.setItem("roleData", jsonString);

        imgHandling(roleFormDataObject)
        window.location.href = "roles.html";
    });


}

function validateCardForm(){
    let requiredPrompt = document.querySelector('.visible-prompt');
        let box = document.querySelector(".inpt-box");
        if (emptyInput.value == "") {
            requiredPrompt.classList.add('active');
            box.classList.add('active');
            return true;
        }
        else {
            requiredPrompt.classList.remove('active');
            box.classList.remove('active');
        }
    return false;
}

function imgHandling(roleFormDataObject){
    let dataExists = localStorage.getItem("roleData")
    let empArray = getLocalStorageEmpArray();
    let empRows= document.querySelectorAll(".emp-details-row");
    let imgArray = [];
    let oldEmpArray = []
    for(let i =0;i<empRows.length;i++){
        let checkbox = empRows[i].querySelector('input');
        if (checkbox.checked == true){
            imgArray.push(empRows[i].id);
            empArray[i]['Job Title'] = roleFormDataObject['Role Name'];
        }
        if(empArray[i]['Job Title'] == roleFormDataObject['Role Name']){
            oldEmpArray.push(empArray[i]['Emp no'])
        }
    }
    for(l of oldEmpArray){
        let flag = false;
        for(let m = 0;m<imgArray.length;m++){
            if(l == imgArray[m]){
                flag = true
                break;
            }
        }
        if(flag==false){
            for(n of empArray){
                if(n['Emp no'] == l){
                    n['Job Title'] = "Not Assigned"
                }
            }
        }
    }
    let dataArray = JSON.parse(dataExists);
    let currObject;
    for(let i  = 0;i<dataArray.length;i++){
        if (dataArray[i]['Role Name'] == roleFormDataObject['Role Name'])
                currObject = dataArray[i];
    }
    currObject.imgArray = imgArray;
    
    for(i of imgArray){
        for(let j = 0;j<dataArray.length;j++){
            if (dataArray[j]['Role Name'] == roleFormDataObject['Role Name']) continue;
            let imgsDA = dataArray[j]['imgArray']
            for(let k = 0;k<imgsDA.length;k++){
                if(imgsDA[k]==i){
                    imgsDA.splice(imgsDA.indexOf(imgsDA[k]), 1);
                }
            }
        }
    }

    const jsonString = JSON.stringify(dataArray);
    localStorage.setItem("roleData", jsonString);

    const jsonStringEmp = JSON.stringify(empArray);
    localStorage.setItem("employeeData", jsonStringEmp);
}

function presetValues(editingCardObject){
    let roleName = document.getElementById('input-role-name-addRoles')
    roleName.readOnly = true;
    roleName.value = editingCardObject['Role Name'];
    let departmentDropDown = document.getElementById('input-department-addRoles');
    let departmentOptions = departmentDropDown.options;

    for(i of departmentOptions){
        if(editingCardObject['Department'] == i.innerText){
            departmentDropDown.selectedIndex = i.index;
            break;
        }
    }

    let locationDropDown = document.getElementById('input-location');
    let locationOptions = locationDropDown.options;
    
    for(i of locationOptions){
        if(editingCardObject['Location'] == i.innerText){
            locationDropDown.selectedIndex = i.index;
            break;
        }
    }
    for(let i = 0;i<editingCardObject['imgArray'].length;i++){
        let empl = document.getElementById(editingCardObject['imgArray'][i]);
        empl.getElementsByTagName('input')[0].checked = true;
    }
}

let emptyInput = document.getElementById('input-role-name-addRoles');
emptyInput.addEventListener('blur', () => {
    let requiredPrompt = document.querySelector('.visible-prompt');
    let box = document.querySelector(".inpt-box");
        if (emptyInput.value == "") {
            requiredPrompt.classList.add('active');
            box.classList.add('active');
        }
        else {
            if (requiredPrompt != null) {
                requiredPrompt.classList.remove('active');
                box.classList.remove('active');
            }
        }
    })

const cancelButton = document.querySelector(".btn-cancel");
cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "roles.html";
})

function insertData(empDataObject) {
    let empContainer = document.querySelector('.emp-details');
    let tableRowTemplate =
    `
    <div class="emp-details-row" id=${empDataObject['idNo']}>
        <div class="img-name-div">
            <img src="${empDataObject['picture']}" alt="emp-profile-pic"> 
            <p>${empDataObject['name']}</p>
        </div>
        <div>
            <input type="checkbox">
        </div>
        
    </div>
    `;
    empContainer.innerHTML += tableRowTemplate;
}

function fetchData(loadDataArray) {
    let profile_Pic = loadDataArray['profile picture'];
    let firstName = loadDataArray['First Name'];
    let lastName = loadDataArray['Last Name'];
    let empno = loadDataArray['Emp no'];
    
    let dataObj = {
        picture: profile_Pic,
        name: firstName + " " + lastName,
        idNo: empno,
    }
    return dataObj
    
}


function getLocalStorageEmpArray() {
    const loadData = localStorage.getItem("employeeData");
    if (loadData != null) {
        const loadDataArray = JSON.parse(loadData);
        return loadDataArray;
    }
    return null;
}

document.addEventListener("DOMContentLoaded" ,()=>{
    let empDataArray = getLocalStorageEmpArray();
    if (empDataArray != null){
        for (let it = 0; it < empDataArray.length; it++) {
            let empData = fetchData(empDataArray[it]);
            insertData(empData);
        }
    }
    if(localStorage.getItem("editCard") != null){
        loadEditCard()
    }
    else{
        loadAddCard()
    }

})