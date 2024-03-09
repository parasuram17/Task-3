import { Images } from './constants.js';
import { helper } from './Helper/Helper.js';
import { loadEventListener } from './LoadEventListeners/LoadEventListeners.js';
import { ViewEditAddEmployees } from './ViewEditAddEmployees/ViewEditAddEmployees.js';

document.addEventListener("DOMContentLoaded", () => {

    let inputPicture: HTMLInputElement = document.getElementById("input-file") as HTMLInputElement;
    let defaultUrl = Images.DEFAULT_IMAGE_URL;
    inputPicture.addEventListener('change', () => {
        let profilePicture: HTMLImageElement = document.getElementById("profile-picture") as HTMLImageElement;
        let newFile: File;
        if (inputPicture.files != null) {
            newFile = inputPicture.files[0];
            profilePicture.src = URL.createObjectURL(newFile);
            const fr = new FileReader();
            fr.addEventListener('load', () => {
                defaultUrl = fr.result as string;
            });
            fr.readAsDataURL(newFile);
        }
    })

    let emptyLabelInput = document.querySelectorAll(".label-input") as NodeListOf<Element>;
    for (let i = 0; i < emptyLabelInput.length; i++) {
        let emptyInput: HTMLInputElement = emptyLabelInput[i].querySelector("input") as HTMLInputElement;
        if (emptyInput != null) {
            emptyInput.addEventListener('blur', () => {
                let requiredPrompt: HTMLElement = emptyLabelInput[i].querySelector('.visible-prompt') as HTMLElement;
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

    let roles: HTMLElement = document.getElementById("input-job-title") as HTMLElement;
    let allRoles = localStorage.getItem("roleData");
    if (allRoles != null) {
        let allRolesArray = JSON.parse(allRoles);
        for (let i of allRolesArray) {
            let newOption = `<option>${i['Role Name']}</option>`
            roles.innerHTML += newOption;
        }
    }

    helper.setMaxDate();
    loadEventListener.cancelButtonEventListener()

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
})
