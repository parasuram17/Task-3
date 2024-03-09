import { insertDOM } from "./DOMManipulation/DOMInsert.js";
import { EmployeeDataFetch, viewEmployeeDataFetch } from "./DataFetch/DataFetch.js";
document.addEventListener('DOMContentLoaded', () => {
    let roleDataStorage = viewEmployeeDataFetch.fetchViewEmployeeData();
    let empDataStorageArray = EmployeeDataFetch.fetchEmployeeData();
    if (roleDataStorage != null) {
        for (let i = 0; i < roleDataStorage['imgArray'].length; i++) {
            let currentID = roleDataStorage['imgArray'][i];
            for (let j = 0; j < empDataStorageArray.length; j++) {
                if (empDataStorageArray[j]['Emp no'] == currentID) {
                    let currentObject = empDataStorageArray[j];
                    insertDOM.insertData(currentObject);
                }
            }
        }
    }
});
