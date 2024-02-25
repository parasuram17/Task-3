import {
    DEFAULT_IMAGE_URL,
} from './constants.js';

let defaultUrl = DEFAULT_IMAGE_URL;

let emptyLabelInput = document.querySelectorAll(".label-input");
for (let i = 0; i < emptyLabelInput.length; i++) {
    let emptyInput = emptyLabelInput[i].querySelector("input");
    if (emptyInput != null) {
        emptyInput.addEventListener('blur', () => {
            let requiredPrompt = emptyLabelInput[i].querySelector('.visible-prompt');
            if (emptyInput.value == "") {
                requiredPrompt.classList.add('active');
                emptyInput.classList.add('active');
            }
            else {
                requiredPrompt.classList.remove('active');
                emptyInput.classList.remove('active');
            }
        })
    }
}

let inputPicture = document.getElementById("input-file")
inputPicture.addEventListener('change', () => {
    let profilePicture = document.getElementById("profile-picture");
    let newFile = inputPicture.files[0];
    profilePicture.src = URL.createObjectURL(newFile);
    const fr = new FileReader();
    fr.addEventListener('load', () => {
        defaultUrl = fr.result;
    });
    fr.readAsDataURL(newFile);
})

let roles = document.getElementById("input-job-title");
let allRoles = localStorage.getItem("roleData");
if (allRoles != null) {
    let allRolesArray = JSON.parse(allRoles);
    for (let i of allRolesArray) {
        let newOption = `<option>${i['Role Name']}</option>`
        roles.innerHTML += newOption;
    }
}


function loadAddEmpForm() {
    const empForm = document.querySelector(".form-employee");
    const addButton = document.querySelector('.btn-adding-employee');
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const empFormData = new FormData(empForm);
        const empFormDataObject = Object.fromEntries(empFormData);
        empFormDataObject['profile picture'] = defaultUrl;
        if (empFormDataObject['Job Title'] == null) {
            empFormDataObject['Job Title'] = "Not Assigned"
        }
        let flags = validateSubmit();
        if (flags.includes(true)) {
            return;
        }
        if (!isvalidateEmail()) return;
        if (!isvalidatePhNo()) return;

        const exists = localStorage.getItem("employeeData");
        if (exists == null || JSON.parse(exists) == null) {
            const jsonString = JSON.stringify([empFormDataObject]);
            localStorage.setItem("employeeData", jsonString);
            localStorage.setItem("Toast", JSON.stringify([true, true]));
            updateRoleData(empFormDataObject['Emp no'], empFormDataObject['Job Title']);
            window.location.href = "index.html";
        }
        else {
            const existingData = localStorage.getItem("employeeData");
            const existingDataArray = JSON.parse(existingData);
            for (let i = 0; i < existingDataArray.length; i++) {
                if (existingDataArray[i]['Emp no'] == empFormDataObject['Emp no'] ||
                    existingDataArray[i]['Email ID'] == empFormDataObject['Email ID']) {
                    localStorage.setItem("Toast", JSON.stringify([true, false]));
                    window.location.href = "index.html";
                    return;
                }
            }
            existingDataArray.push(empFormDataObject);
            const jsonString = JSON.stringify(existingDataArray);
            localStorage.setItem("employeeData", jsonString);
            localStorage.setItem("Toast", JSON.stringify([true, true]));
            updateRoleData(empFormDataObject['Emp no'], empFormDataObject['Job Title']);
            window.location.href = "index.html";
        }
    })
}

function loadViewEmpForm() {
    let viewingRecord = localStorage.getItem('viewData');
    let viewingRecordObject = JSON.parse(viewingRecord);
    document.getElementById('h1-tag').innerHTML = "View Employee Details";
    document.querySelector('.input-box').style.display = "none";
    presetValues(viewingRecordObject, true);
    document.querySelector('.btn-adding-employee').style.display = "none";

}

function loadEditEmpForm() {
    let editingRecord = localStorage.getItem('editData');
    let editingRecordObject = JSON.parse(editingRecord);
    document.getElementById('h1-tag').innerHTML = "Edit Employee";
    let updateButton = document.querySelector('.input-box');
    let updateButtonLabel = updateButton.getElementsByTagName("label");
    updateButtonLabel[0].innerHTML = "Update Profile Picture";
    document.querySelector('.btn-adding-employee').innerText = "Update Employee";

    presetValues(editingRecordObject, false);
    defaultUrl = editingRecordObject['profile picture'];

    const empForm = document.querySelector(".form-employee");
    const addButton = document.querySelector('.btn-adding-employee')
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const empFormData = new FormData(empForm);
        const empFormDataObject = Object.fromEntries(empFormData);
        empFormDataObject['profile picture'] = defaultUrl;
        let flags = validateSubmit();
        if (flags.includes(true)) {
            return;
        }
        if (!isvalidateEmail()) return;
        if (!isvalidatePhNo()) return;

        const existingData = localStorage.getItem("employeeData");
        const existingDataArray = JSON.parse(existingData);
        for (let i = 0; i < existingDataArray.length; i++) {
            if (existingDataArray[i]['Emp no'] == empFormDataObject['Emp no']) {
                existingDataArray[i] = empFormDataObject;
                updateRoleData(empFormDataObject['Emp no'], empFormDataObject['Job Title']);
                break;
            }
        }
        const jsonString = JSON.stringify(existingDataArray);
        localStorage.setItem("employeeData", jsonString);
        localStorage.setItem("Toast", JSON.stringify([true, true]));
        window.location.href = 'index.html';
    })
}

function updateRoleData(empID, empRole) {
    let roleData = localStorage.getItem("roleData");
    if (roleData != null) {
        let roleDataArray = JSON.parse(roleData);
        for (let i of roleDataArray) {
            if (i['Role Name'] == empRole) {
                if (i['imgArray'].includes(empID) == false) {
                    i['imgArray'].push(empID);
                }
            }
            else {
                let otherRolesImgs = i['imgArray'];
                for (let j = 0; j < otherRolesImgs.length; j++) {
                    if (otherRolesImgs[j] == empID) {
                        otherRolesImgs.splice(otherRolesImgs.indexOf(otherRolesImgs[j]), 1)
                    }
                }
            }
        }
        const jsonString = JSON.stringify(roleDataArray);
        localStorage.setItem("roleData", jsonString);
    }
}

function presetValues(recordObject, disable) {
    let empno = document.getElementById('input-emp-no');
    let firstName = document.getElementById('input-first-name');
    let lastName = document.getElementById('input-last-name');
    let DOB = document.getElementById('input-dob');
    let emailID = document.getElementById('input-email');
    let phoneNO = document.getElementById('input-phno');
    let joinDT = document.getElementById('input-join-date');
    let locationDropDown = document.getElementById('input-location');
    let jobTitleDropDown = document.getElementById('input-job-title');
    let departmentDropDown = document.getElementById('input-department');
    let assignManagerDropDown = document.getElementById('input-assign-manager');
    let assignProjectDropDown = document.getElementById('input-assign-project');
    document.getElementById('profile-picture').src = recordObject['profile picture'];
    empno.value = recordObject['Emp no'];
    firstName.value = recordObject['First Name'];
    lastName.value = recordObject['Last Name'];
    DOB.value = recordObject['DOB'];
    emailID.value = recordObject['Email ID'];
    phoneNO.value = recordObject['Phone no'];
    joinDT.value = recordObject['Join Date'];
    let locationOptions = locationDropDown.options;
    for (let i of locationOptions) {
        if (recordObject['Location'] == i.innerText) {
            locationDropDown.selectedIndex = i.index;
            break;
        }
    }
    let jobTitleOptions = jobTitleDropDown.options;
    for (let i of jobTitleOptions) {
        if (recordObject['Job Title'] == i.innerText) {
            jobTitleDropDown.selectedIndex = i.index;
            break;
        }
    }
    let departmentOptions = departmentDropDown.options;
    for (let i of departmentOptions) {
        if (recordObject['Department'] == i.innerText) {
            departmentDropDown.selectedIndex = i.index;
            break;
        }
    }
    let assignManagerOptions = assignManagerDropDown.options;
    for (let i of assignManagerOptions) {
        if (recordObject['Assign Manager'] == i.innerText) {
            assignManagerDropDown.selectedIndex = i.index;
            break;
        }
    }
    let assignProjectOptions = assignProjectDropDown.options;
    for (let i of assignProjectOptions) {
        if (recordObject['Assign Project'] == i.innerText) {
            assignProjectDropDown.selectedIndex = i.index;
            break;
        }
    }
    empno.readOnly = true;
    firstName.readOnly = disable;
    lastName.readOnly = disable;
    DOB.readOnly = disable;
    emailID.readOnly = disable;
    phoneNO.readOnly = disable;
    joinDT.readOnly = disable;
    locationDropDown.disabled = disable;
    jobTitleDropDown.disabled = disable;
    departmentDropDown.disabled = disable;
    assignManagerDropDown.disabled = disable;
    assignProjectDropDown.disabled = disable;
}



function validateSubmit() {
    let flags = []
    for (let i = 0; i < emptyLabelInput.length; i++) {
        let emptyInput = emptyLabelInput[i].querySelector("input");
        if (emptyInput != null) {
            let requiredPrompt = emptyLabelInput[i].querySelector('.visible-prompt');
            if (emptyInput.value == "") {
                requiredPrompt.classList.add('active');
                emptyInput.classList.add('active');
                flags.push(true);
                continue;
            }
            else {
                if (requiredPrompt != null) {
                    requiredPrompt.classList.remove('active');
                    emptyInput.classList.remove('active');
                }
            }
            flags.push(false);
        }
    }
    return flags
}

function isvalidateEmail() {
    let inputField = document.querySelector(".label-input-email");
    let inputFieldValue = document.getElementById("input-email").value;
    if (inputFieldValue.includes('@') == false) {
        document.getElementById('text-prompt').innerText = "enter valid email format";
        inputField.querySelector('.visible-prompt').classList.add('active');
        inputField.querySelector('.inpt-box').classList.add('active')
        return false;
    }
    return true;

}

function isvalidatePhNo() {
    let inputField = document.querySelector(".label-input-phno")
    let inputFieldValue = document.getElementById("input-phno").value;
    if (isNaN(inputFieldValue) || inputFieldValue.length != 10) {
        document.getElementById('text-prompt2').innerText = "enter a valid ph no";
        inputField.querySelector('.visible-prompt').classList.add('active');
        inputField.querySelector('.inpt-box').classList.add('active')
        return false;
    }
    return true;
}

function cancelButton() {
    window.location.href = "index.html";
}
function setMaxDate() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('input-dob').setAttribute("max", today);
    document.getElementById('input-join-date').setAttribute("max", today);
}
setMaxDate();


const viewExist = localStorage.getItem("viewData");
const editExist = localStorage.getItem("editData");
if (viewExist !== null) {
    loadViewEmpForm();
}
else if (editExist !== null) {
    loadEditEmpForm();
}
else if (viewExist == null && editExist == null) {
    loadAddEmpForm();
}
