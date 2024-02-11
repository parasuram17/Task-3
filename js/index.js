
function tableToCSV(table, file) {
    var data = [];
    var rows = document.querySelectorAll('table tr');
    for (var i = 0; i < rows.length; i++) {
        var row = [];
        var cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }
        data.push(row.join(","));
    }

    downloadCSV(data.join("\n"), file)
}
function downloadCSV(csv, file) {
    var csv_file, download_link;
    csv_file = new Blob([csv], { type: "text/csv" });
    download_link = document.createElement('a');
    download_link.download = file;
    download_link.href = window.URL.createObjectURL(csv_file);
    download_link.style.display = "none";
    document.body.appendChild(download_link);
    download_link.click();
}

document.getElementById("export-button").addEventListener('click', function () {
    var table = document.querySelector("table").outerHTML;
    tableToCSV(table, "Employees.csv")
});



function addEmployeeRedirect() {
    location.href = "addEmployees.html";
}

function alphabetFilter(rowDataObj, filterLetter){
    if (rowDataObj['name'][0] == filterLetter){
        return rowDataObj
    }
    else{
        return null
    }

}
function clearTable(){
    let allRows = document.querySelectorAll(".table-rows")
    for (let i of allRows){
        i.remove();
    }
}

function highlightAlphabet(alphabetButton) {
    let letter =  alphabetButton.innerHTML;
    let filterIcon = document.querySelector(".icon-filter");
    alphabetButton.classList.toggle('active');
    filterIcon.classList.add('active');
    clearTable();
    let allTheDataArray = getLocalStorageArray();
    for(let it = 0; it<allTheDataArray.length; it++){
        let allData = fetchData(allTheDataArray, it);
        let customData = alphabetFilter(allData,letter);
        //delete pre-existing markup
        if (customData != null){
            insertData(customData);
        }
    }

}

function resetTable(){
    clearTable()
    let fullTable = getLocalStorageArray()
    for(let iter = 0; iter<fullTable.length; iter++){
        let theData = fetchData(fullTable, iter);
        insertData(theData);
}
}

function filteringData(totData,filterObjPara){
    const filterObj = structuredClone(filterObjPara)
    if (filterObj['stat'] == 'Status' ){
        filterObj['stat'] = totData['onlineStatus'];
    }
    if (filterObj['locat'] == 'Location' ){
        filterObj['locat'] = totData['loc'];
    } 
    if (filterObj['depart'] == 'Department' ){
        filterObj['depart'] = totData['dept'];
    }

    if (filterObj['stat'] == totData['onlineStatus'] && filterObj['locat'] == totData['loc'] && filterObj['depart'] == totData['dept']){
        return totData;
    }
    else{
        return null;
    }
}

function applyFilters(filters){
    clearTable()
    let filtersArray = getLocalStorageArray();
    // console.log(filtersArray);
    for(let ite = 0; ite<filtersArray.length; ite++){
        let totalData = fetchData(filtersArray,ite);
        let filteredData = filteringData(totalData,filters);
        if (filteredData !=null){
            insertData(filteredData);
        }

    }

}

function fetchFilters(){
    let statusFilter = document.getElementById('status');
    let statusText = statusFilter.options[statusFilter.selectedIndex].text;
    let locationFilter = document.getElementById('location');
    let locationText = locationFilter.options[locationFilter.selectedIndex].text;
    let departmentFilter = document.getElementById('department');
    let departmentText = departmentFilter.options[departmentFilter.selectedIndex].text;
    let filtersObj = {
        stat:  statusText,
        locat: locationText,
        depart: departmentText,
    }
    return applyFilters(filtersObj);
    
}


function fetchData(loadDataArray, item){
        let profile_Pic = loadDataArray[item]['profile picture'];
        let firstName = loadDataArray[item]['First Name'];
        let lastName = loadDataArray[item]['Last Name'];
        let emailID = loadDataArray[item]['Email ID'];
        let location = loadDataArray[item]['Location'];
        let department = loadDataArray[item]['Department'];
        let role = loadDataArray[item]['Job Title'];
        let empno = loadDataArray[item]['Emp no'];
        let status = 'Active'
        let joinDate = loadDataArray[item]['Join Date'];

        let dataObj = {
            picture: profile_Pic,
            name: firstName+" "+lastName,
            email:emailID,
            loc:location,
            dept:department,
            job_title:role,
            idNo:empno,
            onlineStatus:status,
            joinDt:joinDate,
        }
        return dataObj
        
    }

    function insertData(dataObject){
        let tbody = document.querySelector('tbody');
        let tableRowTemplate =
            `
            <tr class="table-rows">
                            <td><input type="checkbox" class="check-box"/></td>
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
function toolTipVisible(toolTip){
    toolTip.classList.toggle('active');
    
}

function getLocalStorageArray(){
    const loadData = localStorage.getItem("employeeData");
    if (loadData != null){
        const loadDataArray = JSON.parse(loadData);
        return loadDataArray
    }
}

document.addEventListener('DOMContentLoaded', () => {
            let loadDataArr = getLocalStorageArray();
            for(let it = 0; it<loadDataArr.length; it++){
            let loadedData = fetchData(loadDataArr, it);
            insertData(loadedData);
        }
    }
);

