import { EmployeeDataFetch } from "../DataFetch/DataFetch.js";
import { helper } from "../Helper/Helper.js";
import { checkValid } from "../Validation/Validation.js";
import { preset } from "../presetValues/presetValues.js";
export class ViewEditAddEmployees {
    static loadAddEmpForm(emptyLabelInput, defaultUrl) {
        const empForm = document.querySelector(".form-employee");
        const addButton = document.querySelector('.btn-adding-employee');
        addButton.addEventListener("click", (e) => {
            e.preventDefault();
            const empFormData = new FormData(empForm);
            const empFormDataObject = Object.fromEntries(empFormData);
            empFormDataObject['profile picture'] = defaultUrl;
            const exists = localStorage.getItem("employeeData");
            if (!checkValid.isValid(emptyLabelInput))
                return;
            if (exists == null || JSON.parse(exists) == null) {
                const jsonString = JSON.stringify([empFormDataObject]);
                localStorage.setItem("employeeData", jsonString);
                localStorage.setItem("Toast", JSON.stringify([true, true]));
                helper.updateRoleData(empFormDataObject['Emp no'], empFormDataObject['Job Title']);
                window.location.href = "index.html";
            }
            else {
                const existingDataArray = EmployeeDataFetch.fetchEmployeeData();
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
                helper.updateRoleData(empFormDataObject['Emp no'], empFormDataObject['Job Title']);
                window.location.href = "index.html";
            }
        });
    }
    static loadViewEmpForm() {
        let heading = document.getElementById('h1-tag');
        let upImg = document.querySelector('.input-box');
        let addBtn = document.querySelector('.btn-adding-employee');
        let viewingRecord = localStorage.getItem('viewData');
        let viewingRecordObject = JSON.parse(viewingRecord);
        heading.innerHTML = "View Employee Details";
        upImg.style.display = "none";
        addBtn.style.display = "none";
        preset.presetValue(viewingRecordObject, true);
    }
    static loadEditEmpForm(emptyLabelInput) {
        let heading = document.getElementById('h1-tag');
        let updateButton = document.querySelector('.input-box');
        let addBtn = document.querySelector('.btn-adding-employee');
        let editingRecord = localStorage.getItem('editData');
        let editingRecordObject = JSON.parse(editingRecord);
        heading.innerHTML = "Edit Employee";
        let updateButtonLabel = updateButton.getElementsByTagName("label");
        updateButtonLabel[0].innerHTML = "Update Profile Picture";
        addBtn.innerText = "Update Employee";
        preset.presetValue(editingRecordObject, false);
        let defaultUrl = editingRecordObject['profile picture'];
        const empForm = document.querySelector(".form-employee");
        const addButton = document.querySelector('.btn-adding-employee');
        addButton.addEventListener("click", (e) => {
            e.preventDefault();
            const empFormData = new FormData(empForm);
            const empFormDataObject = Object.fromEntries(empFormData);
            empFormDataObject['profile picture'] = defaultUrl;
            if (!checkValid.isValid(emptyLabelInput))
                return;
            const existingDataArray = EmployeeDataFetch.fetchEmployeeData();
            for (let i = 0; i < existingDataArray.length; i++) {
                if (existingDataArray[i]['Emp no'] == empFormDataObject['Emp no']) {
                    existingDataArray[i] = empFormDataObject;
                    helper.updateRoleData(empFormDataObject['Emp no'], empFormDataObject['Job Title']);
                    break;
                }
            }
            const jsonString = JSON.stringify(existingDataArray);
            localStorage.setItem("employeeData", jsonString);
            localStorage.setItem("Toast", JSON.stringify([true, true]));
            window.location.href = 'index.html';
        });
    }
}
