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

function clearTable() {
    let allRows = document.querySelectorAll(".table-rows")
    for (let i of allRows) {
        i.remove();
    }
}
function resetTable() {
    clearTable()
    postFilterStorage = []
    let fullTable = getLocalStorageArray()
    for (let iter = 0; iter < fullTable.length; iter++) {
        let theData = fetchData(fullTable[iter]);
        postFilterStorage.push(theData);
        insertData(theData);
    }
    filteredCharacters = []
    highlightFilterIcon()
    let alphabetButtons = document.querySelectorAll(".btn-alphabet");
    for(let i = 0;i<alphabetButtons.length;i++){
        alphabetButtons[i].classList.remove('active');
    }
    let filterTags = document.querySelectorAll('.filter-tags')
    for(let i = 0;i<filterTags.length;i++){
        filterTags[i].selectedIndex = 0;
    }
}
function addEmployeeRedirect() {
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

let allTheDataArray = getLocalStorageArray();
let filteredCharacters = [];

function highlightAlphabet(alphabetButton) {
    let letter = alphabetButton.innerHTML;
    if (filteredCharacters.indexOf(letter) == -1) {
        filteredCharacters.push(letter);
    }
    else if (filteredCharacters.indexOf(letter) != -1) {
        filteredCharacters.splice(filteredCharacters.indexOf(letter), 1);
    }
    highlightFilterIcon();
    alphabetButton.classList.toggle('active');
    applyFilters();
}

function applyFilters() {
    postFilterStorage = []
    let statusFilter = document.getElementById('status');
    let statusText = statusFilter.options[statusFilter.selectedIndex].text;
    let locationFilter = document.getElementById('location');
    let locationText = locationFilter.options[locationFilter.selectedIndex].text;
    let departmentFilter = document.getElementById('department');
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
    for (let ite = 0; ite < allTheDataArray.length; ite++) {
        let totalData = fetchData(allTheDataArray[ite]);
        let filteredData = filteringData(totalData, filters);
        if (filteredData != null) {
            postFilterStorage.push(filteredData);
            insertData(filteredData);
        }
    }
}

function filteringData(totData, filterObjPara) {
    const filterObj = structuredClone(filterObjPara)
    if (filterObj['stat'] == 'Status') {
        filterObj['stat'] = totData['onlineStatus'];
    }
    if (filterObj['locat'] == 'Location') {
        filterObj['locat'] = totData['loc'];
    }
    if (filterObj['depart'] == 'Department') {
        filterObj['depart'] = totData['dept'];
    }

    if (filteredCharacters.length > 0) {
        if (filterObj['stat'] == totData['onlineStatus'] &&
            filterObj['locat'] == totData['loc'] &&
            filterObj['depart'] == totData['dept'] &&
            filteredCharacters.indexOf(totData['name'][0]) !== -1) {
                return totData;
            }
            else {
                return null;
        }
    }
    else {
        if (filterObj['stat'] == totData['onlineStatus'] &&
        filterObj['locat'] == totData['loc'] &&
            filterObj['depart'] == totData['dept']) {
            return totData;
        }
        else {
            return null;
        }
    }
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


let empData = getLocalStorageArray();
function deleteIndividualRecord(empID) {
    for (let i = 0; i < empData.length; i++) {
        if (empData[i]['Emp no'] == empID) {
            empData.splice(empData.indexOf(empData[i]), 1)
        }
    }
}

function deleteRecords() {
    let tableRows = document.querySelectorAll(".table-rows");
    for (let i = 0; i < tableRows.length; i++) {
        let checkboxes = tableRows[i].querySelector("input");
        if (checkboxes.checked == true) {
            let empID = tableRows[i].getElementsByClassName('th-empno')[0].textContent
            deleteIndividualRecord(empID);
        }
    }
    const jsonStr = JSON.stringify(empData);
    localStorage.setItem("employeeData", jsonStr);
    resetTable();
    activateDelete();
    
}

let glbSortCount = 0
function sortingTable(sortParam){
    let sortingStorage = structuredClone(postFilterStorage);
    let allTableRows = document.querySelectorAll(' .'+sortParam);
    let valuesArray = [];
    clearTable();
    for(let i = 0;i<allTableRows.length;i++){
        valuesArray.push(allTableRows[i].innerHTML);
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
    <td><input type="checkbox" class="check-box" onclick="activateDelete()"/></td>
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
                            <td class="row-content th-location">${dataObject['loc']}</td>
                            <td class="row-content th-department">${dataObject['dept']}</td>
                            <td class="row-content th-role">${dataObject['job_title']}</td>
                            <td class="row-content th-empno">${dataObject['idNo']}</td>
                            <td class="th-status">
                            <button class="btn-active">${dataObject['onlineStatus']}</button>
                            </td>
                            <td class="row-content th-joindt">${dataObject['joinDt']}</td>
                            <td class="triple-dot" onclick="toolTipVisible(this)">
                            <a>
                            ...
                            <div class="tooltip" >
                                    <p class="tooltip-text">View Details</p>
                                    <p class="tooltip-text">Edit</p>
                                    <p class="tooltip-text">Delete</p>
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
        return loadDataArray
    }
}

let postFilterStorage = [];
document.addEventListener('DOMContentLoaded', () => {
    let loadDataArr = getLocalStorageArray();
    for (let it = 0; it < loadDataArr.length; it++) {
        let loadedData = fetchData(loadDataArr[it]);
        postFilterStorage.push(loadedData);
        insertData(loadedData);
    }
}
);