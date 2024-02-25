let postFilterStorage = [];
let glbSortCount = 0
let empData = getLocalStorageArray();
let filteredCharacters = [];

function clearTable() {
    let allRows = document.querySelectorAll(".table-rows");

    for (let i of allRows) {
        i.remove();
    }
}

// localStorage.setItem("Toast",JSON.stringify(false))
toast = localStorage.getItem("Toast");
if (toast != null){
let toastBool = JSON.parse(toast);
if (toastBool[0] == true){
    if(toastBool[1] == true)
        showToastNotification('success');
    else if(toastBool[1] == false)
        showToastNotification('failure');

    localStorage.setItem("Toast", JSON.stringify([false,false]));
    }
}


function showToastNotification(msg) {
    let toastNotificationContainer = document.querySelector('#toaster-notification')
    let message = document.createElement('div');
    if (msg == 'success') {
        message.classList.add('toast-success')
        message.innerHTML =
        `
        <div class = "success-failure-message">
            <div class = "tick-message">
                <div><i class="fa-solid fa-circle-check"></i></div>
                <div>
                    <p class="message-head-success">Success</p>
                    <p class="message-desc-success">Employee has been added</p>
                </div>
            </div>
            <span class="material-symbols-outlined green-x">close</span> 
        </div>
        `;
    }
    if (msg == 'failure') {
        message.classList.add('toast-failure');
        message.innerHTML =
        `
        <div class = "success-failure-message">
            <div class = "tick-message">
                <div><i class="fa-solid fa-circle-check"></i></div>
                <div>
                    <p class="message-head-failure">Failure</p>
                    <p class="message-desc-failure">Enter Unique IDs</p>
                </div>
            </div>
            <span class="material-symbols-outlined red-x">close</span> 
        </div>
        `;
    }
    toastNotificationContainer.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);

}

function tableToCSV() {
    let data = [];
    let headers = ['Name','Email', 'Location','Department', 'Role', 'Emp No', 'Join Date'];
    data.push(headers.join(","));
    let rows = postFilterStorage
    for (let i = 0; i < rows.length; i++) {
        let row = [];
        row.push(rows[i]['name']);
        row.push(rows[i]['email']);
        row.push(rows[i]['loc']);
        row.push(rows[i]['dept']);
        row.push(rows[i]['job_title']);
        row.push(rows[i]['idNo']);
        row.push(rows[i]['joinDt']);
        data.push(row.join(","));
    }
    downloadCSV(data.join("\n"))
}
function downloadCSV(csv, file="Employees.csv") {
    let csv_file, download_link;
    csv_file = new Blob([csv], { type: "text/csv" });
    download_link = document.createElement('a');
    download_link.download = file;
    download_link.href = window.URL.createObjectURL(csv_file);
    download_link.style.display = "none";
    document.body.appendChild(download_link);
    download_link.click();
}

function addEmployeeRedirect() {
    localStorage.removeItem('viewData');
    localStorage.removeItem('editData');
    location.href = "addEmployees.html";
}

function highlightFilterIcon() {
    let filterIcon = document.querySelector('.icon-filter')
    if (filteredCharacters.length > 0) {
        filterIcon.classList.add('active');
    }
    else {
        filterIcon.classList.remove('active')
    }
}


function highlightAlphabet(alphabetButton) {
    let letter = alphabetButton.innerHTML;
    if (filteredCharacters.indexOf(letter) == -1) {
        filteredCharacters.push(letter);
    }
    else if (filteredCharacters.indexOf(letter) != -1) {
        filteredCharacters.splice(filteredCharacters.indexOf(letter), 1);
    }
    alphabetButton.classList.toggle('active');
    highlightFilterIcon();
    applyFilters();
}

function resetBtn() {
    clearTable()
    postFilterStorage = []
    filteredCharacters = []
    let alphabetButtons = document.querySelectorAll(".btn-alphabet");
    let filterTags = document.querySelectorAll('.filter-tags');
    highlightFilterIcon()
    for (let iter = 0; iter < empData.length; iter++) {
        let theData = fetchData(empData[iter]);
        postFilterStorage.push(theData);
        insertData(theData);
    }
    for(let i = 0;i<alphabetButtons.length;i++){
        alphabetButtons[i].classList.remove('active');
    }
    for(let i = 0;i<filterTags.length;i++){
        filterTags[i].selectedIndex = 0;
    }
}

function applyFilters() {
    postFilterStorage = []
    
    let statusFilter = document.getElementById('status');
    let locationFilter = document.getElementById('location');
    let departmentFilter = document.getElementById('department');
    
    let statusText = statusFilter.options[statusFilter.selectedIndex].text;
    let locationText = locationFilter.options[locationFilter.selectedIndex].text;
    let departmentText = departmentFilter.options[departmentFilter.selectedIndex].text;
    
    let filtersObj = {
        stat: statusText,
        locat: locationText,
        depart: departmentText,
    }
    applyingFilters(filtersObj);
}

function applyingFilters(filters) {
    clearTable()
    for (let ite = 0; ite < empData.length; ite++) {
        let totalData = fetchData(empData[ite]);
        let filteredData = filteringData(totalData, filters);
        if (filteredData != null) {
            postFilterStorage.push(filteredData);
            insertData(filteredData);
        }
    }
}

function filteringData(totData, filterObjParam) {
    let filterObj = structuredClone(filterObjParam)
    if (filterObj['stat'] == 'Status') {
        filterObj['stat'] = totData['onlineStatus'];
    }
    if (filterObj['locat'] == 'Location') {
        filterObj['locat'] = totData['loc'];
    }
    if (filterObj['depart'] == 'Department') {
        filterObj['depart'] = totData['dept'];
    }
    if (filtersSame(totData,filterObj)) {
        if (filteredCharacters.length > 0) {
            if(filteredCharacters.indexOf(totData['name'][0].toUpperCase()) !== -1){
                return totData;
            }
            else{
                return null;
            }
        }
        return totData;
    }
}

function filtersSame(totData,filterObj){
    return filterObj['stat'] == totData['onlineStatus'] &&
            filterObj['locat'] == totData['loc'] &&
            filterObj['depart'] == totData['dept']
}


function activateDelete() {
    let deleteButton = document.querySelector(".btn-delete");
    let checkboxs = document.querySelectorAll(".check-box");
    for (let i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked == true) {
            deleteButton.classList.add('active');
            return
        }
    }
    deleteButton.classList.remove('active');
}

function checkUncheckAll() {
    let main_checkbox = document.querySelector(".checkbox");
    let checkbox = document.querySelectorAll(".check-box");
    for (let k = 0; k < checkbox.length; k++) {
        checkbox[k].checked = main_checkbox.checked;
    }
    activateDelete();
}

function deleteIndividualRecord(empID) {
    for (let i = 0; i < empData.length; i++) {
        if (empData[i]['Emp no'] == empID) {
            empData.splice(empData.indexOf(empData[i]), 1);
        }
    }
    updateRoleDataDelete(empID)

}

function deleteRecords() {
    let tableRows = document.querySelectorAll(".table-rows");
    let deleteBtn = document.querySelector(".btn-delete");
    for (let i = 0; i < tableRows.length; i++) {
        let checkboxes = tableRows[i].querySelector("input");
        if (checkboxes.checked == true) {
            let empID = tableRows[i].getElementsByClassName('th-empno')[0].textContent
            deleteIndividualRecord(empID.trim());
        }
    }
    const jsonStr = JSON.stringify(empData);
    localStorage.setItem("employeeData", jsonStr);
    clearTable();
    postFilterStorage = []
    for(let i = 0;i<empData.length;i++){
        let updatedData = fetchData(empData[i]);
        postFilterStorage.push(updatedData);
    }
    applyFilters() 
    let main_cb = document.querySelector(".checkbox")
    main_cb.checked = false;
    deleteBtn.classList.remove('active');

}

function sortingTable(sortParam){
    let sortingStorage = structuredClone(postFilterStorage);
    let allTableRows = document.querySelectorAll(' .'+sortParam);
    let valuesArray = [];
    clearTable();
    for(let i = 0;i<allTableRows.length;i++){
        valuesArray.push(allTableRows[i].innerHTML.trim());
    }
    if (glbSortCount%2 == 0){
        valuesArray.sort();
    }
    else{
        valuesArray.sort();
        valuesArray.reverse();
    }
    for(let i = 0;i<valuesArray.length;i++){
        for(let j = 0;j<sortingStorage.length;j++){
            if(sortParam == "table-person-name"){
                if(sortingStorage[j]['name'] == valuesArray[i]){
                    insertData(sortingStorage[j]);
                    sortingStorage.splice(sortingStorage.indexOf(sortingStorage[j]),1);
                }
            }
            else if(sortParam == "th-location"){
                if(sortingStorage[j]['loc'] == valuesArray[i]){
                    insertData(sortingStorage[j]);
                    sortingStorage.splice(sortingStorage.indexOf(sortingStorage[j]),1);
                }
            }
            else if(sortParam == "th-department"){
                if(sortingStorage[j]['dept'] == valuesArray[i]){
                    insertData(sortingStorage[j]);
                    sortingStorage.splice(sortingStorage.indexOf(sortingStorage[j]),1);
                }
            }
            else if(sortParam == "th-role"){
                if(sortingStorage[j]['job_title'] == valuesArray[i]){
                    insertData(sortingStorage[j]);
                    sortingStorage.splice(sortingStorage.indexOf(sortingStorage[j]),1);
                }
            }
            else if(sortParam == "th-empno"){
                if(sortingStorage[j]['idNo'] == valuesArray[i]){
                    insertData(sortingStorage[j]);
                    sortingStorage.splice(sortingStorage.indexOf(sortingStorage[j]),1);  
                }
            }
            else if(sortParam == "btn-active"){
                if(sortingStorage[j]['onlineStatus'] == valuesArray[i]){
                    insertData(sortingStorage[j]);
                    sortingStorage.splice(sortingStorage.indexOf(sortingStorage[j]),1);
                }
            }
            else if(sortParam == "th-joindt"){
                if(sortingStorage[j]['joinDt'] == valuesArray[i]){
                    insertData(sortingStorage[j]);
                    sortingStorage.splice(sortingStorage.indexOf(sortingStorage[j]),1);
                }
            }
        }
    }
    glbSortCount+=1
}

function getRecord(empNo){
    let ls = getLocalStorageArray();
    let record;
    for(i of ls){
        if (i['Emp no'] == empNo){
            record = i;
            return record;
        }
    }
}
function viewEmpDetails(empNo){
    rec = getRecord(empNo);
    const jsonString = JSON.stringify(rec)
    localStorage.setItem("viewData", jsonString);
    localStorage.removeItem('editData');
    window.location.href = 'addEmployees.html'
}
function editEmpDetails(empNo){
    rec = getRecord(empNo);
    const jsonString = JSON.stringify(rec)
    localStorage.setItem("editData", jsonString);
    localStorage.removeItem('viewData');
    window.location.href = 'addEmployees.html';

}
function deleteEmpDetails(empNo){
    for (let i = 0; i < empData.length; i++) {
        if (empData[i]['Emp no'] == empNo) {
            empData.splice(empData.indexOf(empData[i]), 1);
        }
    }
    const jsonStr = JSON.stringify(empData);
    localStorage.setItem("employeeData", jsonStr);
    clearTable();
    postFilterStorage = []
    for(let i = 0;i<empData.length;i++){
        let updatedData = fetchData(empData[i]);
        postFilterStorage.push(updatedData);
    }
    applyFilters();
    updateRoleDataDelete(empNo);
}

function updateRoleDataDelete(empID){
    let roleData = localStorage.getItem("roleData");
    if (roleData != null){
        let roleDataArray = JSON.parse(roleData);
        for(i of roleDataArray){
            let otherRolesImgs = i['imgArray'];
            for(let j = 0;j<otherRolesImgs.length;j++){
                if(otherRolesImgs[j] == empID){
                    otherRolesImgs.splice(otherRolesImgs.indexOf(otherRolesImgs[j]),1)
                }
            }
        }
        const jsonString = JSON.stringify(roleDataArray);
        localStorage.setItem("roleData", jsonString);
    }
}

function fetchData(loadDataArray) {
    let profile_Pic = loadDataArray['profile picture'];
    let firstName = loadDataArray['First Name'];
    let lastName = loadDataArray['Last Name'];
    let emailID = loadDataArray['Email ID'];
    let location = loadDataArray['Location'];
    let department = loadDataArray['Department'];
    let role = loadDataArray['Job Title'];
    let empno = loadDataArray['Emp no'];
    let status = 'Active'
    let joinDate = loadDataArray['Join Date'];
    
    let dataObj = {
        picture: profile_Pic,
        name: firstName + " " + lastName,
        email: emailID,
        loc: location,
        dept: department,
        job_title: role,
        idNo: empno,
        onlineStatus: status,
        joinDt: joinDate,
    }
    return dataObj
    
}

function insertData(dataObject) {
    let tbody = document.querySelector('tbody');
    let tableRowTemplate =
    `
    <tr class="table-rows">
        <td>
            <input type="checkbox" class="check-box" onclick="activateDelete()"/>
        </td>
        <td class="th-user">
            <div class="profile-section-copy">
                <div>
                    <img class="img-avatar" src="${dataObject['picture']}"/>
                </div>
                <div>
                    <p class="table-person-name">${dataObject['name']}</p>
                    <p class="table-person-email">${dataObject['email']}</p>
                </div>
            </div>
        </td>
        <td class="row-content th-location">
            ${dataObject['loc']}
        </td>
        <td class="row-content th-department">
            ${dataObject['dept']}
        </td>
        <td class="row-content th-role">
            ${dataObject['job_title']}
        </td>
        <td class="row-content th-empno">
            ${dataObject['idNo']}
        </td>
        <td class="th-status">
            <button class="btn-active">${dataObject['onlineStatus']}</button>
        </td>
        <td class="row-content th-joindt">
            ${dataObject['joinDt']}
        </td>
        <td class="triple-dot" onclick="toolTipVisible(this)">
            <a>
                ...
                <div class="tooltip">
                    <a onclick= "viewEmpDetails('${dataObject['idNo']}')"><p class="tooltip-text">View Details</p></a>
                    <a onclick="editEmpDetails('${dataObject['idNo']}')"><p class="tooltip-text">Edit</p></a>
                    <a onclick="deleteEmpDetails('${dataObject['idNo']}')"><p class="tooltip-text">Delete</p></a>
                </div>
            </a>
        </td>
    </tr>`;
    tbody.innerHTML += tableRowTemplate;
}
function toolTipVisible(toolTip) {
    toolTip.classList.toggle('active');
}

function getLocalStorageArray() {
    const loadData = localStorage.getItem("employeeData");
    if (loadData != null) {
        const loadDataArray = JSON.parse(loadData);
        return loadDataArray;
    }
    return null;
}


document.addEventListener('DOMContentLoaded', () => {
    let loadDataArr = getLocalStorageArray();
    for (let it = 0; it < loadDataArr.length; it++) {
        let loadedData = fetchData(loadDataArr[it]);
        postFilterStorage.push(loadedData);
        insertData(loadedData);
    }
}
);