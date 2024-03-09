import { Images } from './constants.js';
import { helper } from './Helper/Helper.js';
import { loadEventListener } from './LoadEventListeners/LoadEventListeners.js';
import { ViewEditAddEmployees } from './ViewEditAddEmployees/ViewEditAddEmployees.js';
document.addEventListener("DOMContentLoaded", () => {
    let inputPicture = document.getElementById("input-file");
    let defaultUrl = Images.DEFAULT_IMAGE_URL;
    inputPicture.addEventListener('change', () => {
        let profilePicture = document.getElementById("profile-picture");
        let newFile;
        if (inputPicture.files != null) {
            newFile = inputPicture.files[0];
            profilePicture.src = URL.createObjectURL(newFile);
            const fr = new FileReader();
            fr.addEventListener('load', () => {
                defaultUrl = fr.result;
            });
            fr.readAsDataURL(newFile);
        }
    });
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
            });
        }
    }
    let roles = document.getElementById("input-job-title");
    let allRoles = localStorage.getItem("roleData");
    if (allRoles != null) {
        let allRolesArray = JSON.parse(allRoles);
        for (let i of allRolesArray) {
            let newOption = `<option>${i['Role Name']}</option>`;
            roles.innerHTML += newOption;
        }
    }
    helper.setMaxDate();
    loadEventListener.cancelButtonEventListener();
    const viewExist = localStorage.getItem("viewData");
    const editExist = localStorage.getItem("editData");
    if (viewExist !== null) {
        ViewEditAddEmployees.loadViewEmpForm();
    }
    else if (editExist !== null) {
        ViewEditAddEmployees.loadEditEmpForm(emptyLabelInput);
    }
    else if (viewExist == null && editExist == null) {
        ViewEditAddEmployees.loadAddEmpForm(emptyLabelInput, defaultUrl);
    }
});
