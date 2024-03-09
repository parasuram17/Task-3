import { DOMFetch } from "./DOMManipulation/DOMFetch.js";
import { insertDOM } from "./DOMManipulation/DOMInsert.js";
import { EmployeeDataFetch } from "./DataFetch/DataFetch.js";
import { EmployeeData, RoleFormData } from "./Types/Types.js";
import { EditAddRole } from "./EditAddRole/EditAddRole.js";
import { loadEventListener } from "./LoadEventListeners/LoadEventListeners.js";

document.addEventListener("DOMContentLoaded", () => {
    let emptyInput: HTMLInputElement = document.getElementById('input-role-name-addRoles') as HTMLInputElement;
    let empDataArray = EmployeeDataFetch.fetchEmployeeData();

    if (empDataArray != null) {
        for (let it = 0; it < empDataArray.length; it++) {
            let empData: EmployeeData = DOMFetch.fetchData(empDataArray[it]) as EmployeeData;
            insertDOM.insertData(empData);
        }
    }

    if (localStorage.getItem("editCard") != null) {
        EditAddRole.loadEditCard()
    }

    else {
        EditAddRole.loadAddCard()
    }
    
    emptyInput.addEventListener('blur', () => {
        let requiredPrompt: HTMLElement = document.querySelector('.visible-prompt') as HTMLElement;
        let box: HTMLElement = document.querySelector(".inpt-box") as HTMLElement;
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

    loadEventListener.cancelButtonEventListener();
})