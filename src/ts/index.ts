import { EmployeeData, EmployeeFormData, empKey } from './Types/Types.js';
import { EmployeeDataFetch } from './DataFetch/DataFetch.js';
import { clearDOM } from './DOMManipulation/DOMclear.js';
import { insertDOM } from './DOMManipulation/DOMInsert.js';
import { DOMFetch } from './DOMManipulation/DOMFetch.js';
import { EmployeeFilters } from './Filters/EmployeeFilters.js';
import { filtersReset } from './Filters/ResetFilters.js';
import { downloadCSV } from './ExportData/DownloadCSV.js';
import { displayToaster } from './Toaster/Toaster.js';
import { loadEventListener } from './LoadEventListeners/LoadEventListeners.js';
import { helper } from './Helper/Helper.js';

let postFilterStorage: (EmployeeData)[] = [];
let glbSortCount = 0
let empData = EmployeeDataFetch.fetchEmployeeData();
let filteredCharacters: (string)[] = [];

function ellipsesEventListenerDelete() {
    let ellipseFDeletes: NodeListOf<HTMLElement> = document.querySelectorAll('.tt-delete') as NodeListOf<HTMLElement>;
    ellipseFDeletes.forEach((ellipseFDelete) => {
        ellipseFDelete.addEventListener('click', () => {
            let empNo = ellipseFDelete.id
            empNo = empNo.replaceAll('-child3', '')
            postFilterStorage = helper.deleteEmpDetails(empNo, empData, filteredCharacters);
            ellipsesEventListenerDelete();
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {

    let loadDataArr = EmployeeDataFetch.fetchEmployeeData();
    loadDataArr.forEach((data: EmployeeFormData) => {
        let loadedData: EmployeeData = DOMFetch.fetchData(data) as EmployeeData;
        postFilterStorage.push(loadedData);
        insertDOM.insertData(loadedData);
    })

    let toast = localStorage.getItem("Toast");
    if (toast != null) {
        let toastBool = JSON.parse(toast);
        if (toastBool[0] == true) {
            if (toastBool[1] == true)
                displayToaster.showToastNotification('success');
            else if (toastBool[1] == false)
                displayToaster.showToastNotification('failure');

            localStorage.setItem("Toast", JSON.stringify([false, false]));
        }
    }

    let exportButton: HTMLButtonElement = document.getElementById('export-button') as HTMLButtonElement;
    exportButton.addEventListener('click', () => {
        let rows: Array<EmployeeData> = postFilterStorage as Array<EmployeeData>;
        let data = [];
        let headers = ['Name', 'Email', 'Location', 'Department', 'Role', 'Emp No', 'Join Date'];
        data.push(headers.join(","));
        rows.forEach((r) => {
            let row: string[] = [];
            row.push(r['name']);
            row.push(r['email']);
            row.push(r['locat']);
            row.push(r['dept']);
            row.push(r['job_title']);
            row.push(r['idNo']);
            row.push(r['joinDt']);
            data.push(row.join(","));
        })
        downloadCSV.downloadFile(data.join("\n"), "Employees.csv")
    })

    let addEmployeeButton: HTMLButtonElement = document.getElementById('button-add-employee') as HTMLButtonElement
    addEmployeeButton.addEventListener("click", () => {
        localStorage.removeItem('viewData');
        localStorage.removeItem('editData');
        location.href = "addEmployees.html";
    })

    let alphabetButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn-alphabet') as NodeListOf<HTMLButtonElement>;
    alphabetButtons.forEach((alphabetButton) => {
        alphabetButton.addEventListener('click', () => {
            let letter = alphabetButton.innerHTML;
            if (filteredCharacters.indexOf(letter) == -1) {
                filteredCharacters.push(letter);
            }
            else if (filteredCharacters.indexOf(letter) != -1) {
                filteredCharacters.splice(filteredCharacters.indexOf(letter), 1);
            }

            alphabetButton.classList.toggle('active');
            helper.highlightFilterIcon(filteredCharacters);
            let filterObj = new EmployeeFilters;
            let filters = filterObj.getFilterObject;
            postFilterStorage = filterObj.applyFilters(filters, empData, filteredCharacters);

            loadEventListener.innerCheckBoxesEventListener();
            loadEventListener.ellipsesEventListener();
            loadEventListener.ellipsesEventListenerView();
            loadEventListener.ellipsesEventListenerEdit();
            ellipsesEventListenerDelete();
        })
    })

    let resetButton: HTMLButtonElement = document.querySelector(".btn-reset") as HTMLButtonElement;
    resetButton.addEventListener('click', () => {
        postFilterStorage = filtersReset.reset('index', empData);
        filteredCharacters = []
        helper.highlightFilterIcon(filteredCharacters)

        loadEventListener.innerCheckBoxesEventListener();
        loadEventListener.ellipsesEventListener();
        loadEventListener.ellipsesEventListenerView();
        loadEventListener.ellipsesEventListenerEdit();
        ellipsesEventListenerDelete();
    })

    let filterApplyButton: HTMLButtonElement = document.querySelector('.btn-apply') as HTMLButtonElement;
    filterApplyButton.addEventListener('click', () => {
        let filterObj = new EmployeeFilters;
        let filters = filterObj.getFilterObject;
        postFilterStorage = filterObj.applyFilters(filters, empData, filteredCharacters)

        loadEventListener.innerCheckBoxesEventListener();
        loadEventListener.ellipsesEventListener();
        loadEventListener.ellipsesEventListenerView();
        loadEventListener.ellipsesEventListenerEdit();
        ellipsesEventListenerDelete();
    })

    let main_checkbox: HTMLInputElement = document.querySelector(".checkbox") as HTMLInputElement;
    main_checkbox.addEventListener('click', () => {
        let checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(".check-box") as NodeListOf<HTMLInputElement>;
        let checkboxArray = Array.from(checkboxes);
        checkboxArray.forEach((cb) => { cb.checked = main_checkbox.checked });

        helper.activateDelete();
    })


    let multiDeleteButton: HTMLButtonElement = document.querySelector('.btn-delete') as HTMLButtonElement;
    multiDeleteButton.addEventListener('click', () => {

        let tableRows = document.querySelectorAll(".table-rows");
        let deleteBtn: HTMLElement = document.querySelector(".btn-delete") as HTMLElement;
        let tableRowsArray = Array.from(tableRows);

        tableRowsArray.forEach((tr) => {
            let checkboxes: HTMLInputElement = tr.querySelector("input") as HTMLInputElement;
            if (checkboxes.checked == true) {
                let empID: string = tr.getElementsByClassName('th-empno')[0].textContent as string;

                empData.forEach((data: EmployeeFormData) => {
                    if (data['Emp no'] == empID.trim()) {
                        empData.splice(empData.indexOf(data), 1);
                    }
                })

                helper.updateRoleDataDelete(empID.trim());
            }
        })

        const jsonStr = JSON.stringify(empData);
        localStorage.setItem("employeeData", jsonStr);
        clearDOM.clear('index');
        postFilterStorage = empData.map((data: any) => {
            let updatedData: EmployeeData = DOMFetch.fetchData(data) as EmployeeData
            data = updatedData;
        })

        let filterObj = new EmployeeFilters;
        let filters = filterObj.getFilterObject;
        postFilterStorage = filterObj.applyFilters(filters, empData, filteredCharacters)
        let main_cb: HTMLInputElement = document.querySelector(".checkbox") as HTMLInputElement;
        main_cb.checked = false;
        deleteBtn.classList.remove('active');

        loadEventListener.innerCheckBoxesEventListener();
        loadEventListener.ellipsesEventListener();
        loadEventListener.ellipsesEventListenerView();
        loadEventListener.ellipsesEventListenerEdit();
        ellipsesEventListenerDelete();
    })

    let sortButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.sortButton') as NodeListOf<HTMLElement>
    sortButtons.forEach((sortButton) => {
        sortButton.addEventListener('click', () => {
            let sortKey: empKey = sortButton.classList[1] as empKey
            let sortingStorage: Array<EmployeeData> = structuredClone(postFilterStorage) as Array<EmployeeData>;
            function sortDataBy(sortingStorage: Array<EmployeeData>, sortKey: empKey) {
                let sortedData;
                sortedData = sortingStorage.sort(function (a: EmployeeData, b: EmployeeData) {
                    let x = a[sortKey].toLowerCase();
                    let y = b[sortKey].toLowerCase();
                    if (glbSortCount % 2 == 0) {
                        if (x > y) { return -1; }
                        if (x < y) { return 1; }
                    }
                    else {
                        if (x > y) { return 1; }
                        if (x < y) { return -1; }
                    }
                    return 0;
                });
                return sortedData;
            }
            sortingStorage = sortDataBy(sortingStorage, sortKey);
            clearDOM.clear('index');
            sortingStorage.forEach((data) => {
                insertDOM.insertData(data)
            })
            glbSortCount += 1

            loadEventListener.innerCheckBoxesEventListener();
            loadEventListener.ellipsesEventListener();
            loadEventListener.ellipsesEventListenerView();
            loadEventListener.ellipsesEventListenerEdit();
            ellipsesEventListenerDelete();
        })
    })

    loadEventListener.innerCheckBoxesEventListener();
    loadEventListener.ellipsesEventListener();
    loadEventListener.ellipsesEventListenerView();
    loadEventListener.ellipsesEventListenerEdit();
    ellipsesEventListenerDelete();
}
);