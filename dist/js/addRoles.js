import { DOMFetch } from "./DOMManipulation/DOMFetch.js";
import { insertDOM } from "./DOMManipulation/DOMInsert.js";
import { EmployeeDataFetch } from "./DataFetch/DataFetch.js";
import { EditAddRole } from "./EditAddRole/EditAddRole.js";
import { loadEventListener } from "./LoadEventListeners/LoadEventListeners.js";
document.addEventListener("DOMContentLoaded", () => {
    let emptyInput = document.getElementById('input-role-name-addRoles');
    let empDataArray = EmployeeDataFetch.fetchEmployeeData();
    if (empDataArray != null) {
        for (let it = 0; it < empDataArray.length; it++) {
            let empData = DOMFetch.fetchData(empDataArray[it]);
            insertDOM.insertData(empData);
        }
    }
    if (localStorage.getItem("editCard") != null) {
        EditAddRole.loadEditCard();
    }
    else {
        EditAddRole.loadAddCard();
    }
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
    });
    loadEventListener.cancelButtonEventListener();
});
