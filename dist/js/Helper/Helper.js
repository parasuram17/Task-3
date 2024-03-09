import { DOMFetch } from "../DOMManipulation/DOMFetch.js";
import { clearDOM } from "../DOMManipulation/DOMclear.js";
import { EmployeeDataFetch, RoleDataFetch } from "../DataFetch/DataFetch.js";
import { EmployeeFilters } from "../Filters/EmployeeFilters.js";
import { loadEventListener } from "../LoadEventListeners/LoadEventListeners.js";
class Helper {
    constructor() {
        this.postFilterStorage = [];
    }
    highlightFilterIcon(filteredCharacters) {
        let filterIcon = document.querySelector('.icon-filter');
        if (filteredCharacters.length > 0) {
            filterIcon.classList.add('active');
        }
        else {
            filterIcon.classList.remove('active');
        }
    }
    activateDelete() {
        let deleteButton = document.querySelector(".btn-delete");
        let checkboxs = document.querySelectorAll(".check-box");
        for (let i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].checked == true) {
                deleteButton.classList.add('active');
                return;
            }
        }
        deleteButton.classList.remove('active');
    }
    viewEmpDetails(empNo) {
        let rec = this.getRecord(empNo);
        const jsonString = JSON.stringify(rec);
        localStorage.setItem("viewData", jsonString);
        localStorage.removeItem('editData');
        window.location.href = 'addEmployees.html';
    }
    editEmpDetails(empNo) {
        let rec = this.getRecord(empNo);
        const jsonString = JSON.stringify(rec);
        localStorage.setItem("editData", jsonString);
        localStorage.removeItem('viewData');
        window.location.href = 'addEmployees.html';
    }
    deleteEmpDetails(empNo, empData, filteredCharacters) {
        for (let i = 0; i < empData.length; i++) {
            if (empData[i]['Emp no'] == empNo) {
                empData.splice(empData.indexOf(empData[i]), 1);
            }
        }
        const jsonStr = JSON.stringify(empData);
        localStorage.setItem("employeeData", jsonStr);
        clearDOM.clear('index');
        this.postFilterStorage = [];
        for (let i = 0; i < empData.length; i++) {
            let updatedData = DOMFetch.fetchData(empData[i]);
            this.postFilterStorage.push(updatedData);
        }
        let filterObj = new EmployeeFilters;
        let filters = filterObj.getFilterObject;
        this.postFilterStorage = filterObj.applyFilters(filters, empData, filteredCharacters);
        this.updateRoleDataDelete(empNo);
        loadEventListener.innerCheckBoxesEventListener();
        loadEventListener.ellipsesEventListener();
        loadEventListener.ellipsesEventListenerView();
        loadEventListener.ellipsesEventListenerEdit();
        return this.postFilterStorage;
    }
    updateRoleDataDelete(empID) {
        let roleDataArray = RoleDataFetch.fetchRoleData();
        for (let i of roleDataArray) {
            let otherRolesImgs = i['imgArray'];
            for (let j = 0; j < otherRolesImgs.length; j++) {
                if (otherRolesImgs[j] == empID) {
                    otherRolesImgs.splice(otherRolesImgs.indexOf(otherRolesImgs[j]), 1);
                }
            }
        }
        const jsonString = JSON.stringify(roleDataArray);
        localStorage.setItem("roleData", jsonString);
    }
    getRecord(empNo) {
        let ls = EmployeeDataFetch.fetchEmployeeData();
        for (let i of ls) {
            if (i['Emp no'] == empNo) {
                let record = i;
                return record;
            }
        }
    }
    getCard(cardID) {
        cardID = cardID.replaceAll("-", " ");
        let cards = RoleDataFetch.fetchRoleData();
        for (let i of cards) {
            if (i['Role Name'] == cardID)
                return i;
        }
    }
    editCard(cardID) {
        let selectedCard = this.getCard(cardID);
        const jString = JSON.stringify(selectedCard);
        localStorage.setItem("editCard", jString);
        window.location.href = "addRoles.html";
    }
    loadViewEmployees(cardID) {
        let selectedCard = this.getCard(cardID);
        const jString = JSON.stringify(selectedCard);
        localStorage.setItem("viewAllEmployees", jString);
        window.location.href = "employees.html";
    }
    imgHandling(roleFormDataObject) {
        let dataExists = localStorage.getItem("roleData");
        let empArray = EmployeeDataFetch.fetchEmployeeData();
        let empRows = document.querySelectorAll(".emp-details-row");
        let imgArray = [];
        let oldEmpArray = [];
        for (let i = 0; i < empRows.length; i++) {
            let checkbox = empRows[i].querySelector('input');
            if (checkbox.checked == true) {
                imgArray.push(empRows[i].id);
                empArray[i]['Job Title'] = roleFormDataObject['Role Name'];
            }
            if (empArray[i]['Job Title'] == roleFormDataObject['Role Name']) {
                oldEmpArray.push(empArray[i]['Emp no']);
            }
        }
        for (let l of oldEmpArray) {
            let flag = false;
            for (let m = 0; m < imgArray.length; m++) {
                if (l == imgArray[m]) {
                    flag = true;
                    break;
                }
            }
            if (flag == false) {
                for (let n of empArray) {
                    if (n['Emp no'] == l) {
                        n['Job Title'] = "Not Assigned";
                    }
                }
            }
        }
        let dataArray = JSON.parse(dataExists);
        let currObject;
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i]['Role Name'] == roleFormDataObject['Role Name'])
                currObject = dataArray[i];
        }
        currObject.imgArray = imgArray;
        for (let i of imgArray) {
            for (let j = 0; j < dataArray.length; j++) {
                if (dataArray[j]['Role Name'] == roleFormDataObject['Role Name'])
                    continue;
                let imgsDA = dataArray[j]['imgArray'];
                for (let k = 0; k < imgsDA.length; k++) {
                    if (imgsDA[k] == i) {
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
    setMaxDate() {
        let today = new Date().toISOString().split('T')[0];
        let DOB = document.getElementById('input-dob');
        let joinDT = document.getElementById('input-join-date');
        DOB.setAttribute("max", today);
        joinDT.setAttribute("max", today);
    }
    updateRoleData(empID, empRole) {
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
                            otherRolesImgs.splice(otherRolesImgs.indexOf(otherRolesImgs[j]), 1);
                        }
                    }
                }
            }
            const jsonString = JSON.stringify(roleDataArray);
            localStorage.setItem("roleData", jsonString);
        }
    }
}
export let helper = new Helper;
