let roleData = getRoleDataStorage()

function clearCards() {
    let allCards = document.querySelectorAll(".c1");

    for (let i of allCards) {
        i.remove();
    }
}

function addRolesRedirect() {
    localStorage.removeItem("editCard");
    location.href = "addRoles.html";
}

function resetBtn() {
    clearCards()
    let filterTags = document.querySelectorAll('.filter-tags');
    for (let iter = 0; iter < roleData.length; iter++) {
        let theData = fetchData(roleData[iter]);
        insertCard(theData);
    }
    for(let i = 0;i<filterTags.length;i++){
        filterTags[i].selectedIndex = 0;
    }
}

function applyFilters() {
    postFilterStorage = []
    
    let locationFilter = document.getElementById('location');
    let departmentFilter = document.getElementById('department');
    
    let locationText = locationFilter.options[locationFilter.selectedIndex].text;
    let departmentText = departmentFilter.options[departmentFilter.selectedIndex].text;
    
    let filtersObj = {
        locat: locationText,
        depart: departmentText,
    }
    applyingFilters(filtersObj);
}

function applyingFilters(filters) {
    clearCards()
    for (let ite = 0; ite < roleData.length; ite++) {
        let singleCardData = fetchData(roleData[ite]);
        let filteredData = filteringData(singleCardData, filters);
        if (filteredData != null) {
            insertCard(filteredData);
        }
    }
}

function filteringData(oneCardData, filterObjParam) {
    let filterObj = structuredClone(filterObjParam)
    if (filterObj['locat'] == 'Location') {
        filterObj['locat'] = oneCardData['locat'];
    }
    if (filterObj['depart'] == 'Department') {
        filterObj['depart'] = oneCardData['dept'];
    }
    if (filterObj['stat'] == oneCardData['onlineStatus'] &&
    filterObj['locat'] == oneCardData['locat'] &&
    filterObj['depart'] == oneCardData['dept']) {
        return oneCardData;
    }
}

function getImgFromID(imgID){
    let employeeData = localStorage.getItem("employeeData");
    let employeeDataArray = JSON.parse(employeeData);
    for(i of employeeDataArray){
        if(i['Emp no'] == imgID){
            return i['profile picture'];
        }
    }
}

function getCard(cardID){
    let cards = getRoleDataStorage()
    for(i of cards){
        if(i['Role Name'] == cardID)
            return i
    }

}

function editCard(cardID){
    let selectedCard = getCard(cardID);
    const jString = JSON.stringify(selectedCard);
    localStorage.setItem("editCard",jString);
    window.location.href = "addRoles.html"
}

function loadViewEmployees(cardID){
    let selectedCard = getCard(cardID)
    const jString = JSON.stringify(selectedCard);
    localStorage.setItem("viewAllEmployees",jString);
    window.location.href = "employees.html";
}

function insertCard(cardObject){
    let cardBody = document.querySelector('.cards');
    let cardID = cardObject.role.replaceAll(" ","-");
    let cardTemplate = 
    `
    <div class="c1" id='${cardID}'>
                <div class="card-heading">
                    <div class="card-heading-text">${cardObject['role']}</div>
                    <div class="edit-icon"><a onclick="editCard('${cardObject['role']}')" ><img src="images/edit.svg"></a></div>
                </div>
                <div class="card-sub-heading">
                    <div class="card-sub-heading-left">
                        <div>
                            <img class="card-icons" src="images/team_svgrepo.com.svg">
                        </div>
                        <div>
                            Department
                        </div>
                    </div>
                    <div class="card-sub-heading-right">
                        ${cardObject['dept']}
                    </div>
                </div>
                <div class="card-sub-heading">
                    <div class="card-sub-heading-left">
                        <div>
                            <img class="card-icons" src="images/location-pin-alt-1_svgrepo.com.svg">
                        </div>
                        <div>
                            Location
                        </div>
                    </div>
                    <div class="card-sub-heading-right">
                        ${cardObject['locat']}
                    </div>
                </div>
                <div class="card-sub-heading">
                    <div class="card-sub-heading-left">
                        Total Employees
                    </div>
                    <div class="card-sub-heading-right card-imgs">
                        
                    </div>
                </div>
                <a onclick="loadViewEmployees('${cardObject['role']}')">
                <div class="view-arrow">
                        <p>View all Employees </p>
                        <img class="icon-arrow" src="images/Vector.svg">
                </div>
                </a>
            </div>
    
    `;
    cardBody.innerHTML+=cardTemplate;

    let imgIDs = cardObject['imgarr']
    let ID = document.getElementById(cardID);
    let cardImgs = ID.querySelector('.card-imgs');
    if (imgIDs != null){
        if (imgIDs.length <=4){
            for(let i = 0;i<imgIDs.length;i++){
                let img = getImgFromID(imgIDs[i]);
                let cardImgTemplate = `<div><img class="imgs-top-5-emps" src="${img}"></div>`;
                cardImgs.innerHTML+=cardImgTemplate;
            }
        }
        else{
            for(let i = 0;i<4;i++){
                let img = getImgFromID(imgIDs[i]);
                let cardImgTemplate = `<div><img class="imgs-top-5-emps" src="${img}"></div>`;
                cardImgs.innerHTML+=cardImgTemplate;
            }
            let extra = `<div class="plus-43">+${cardObject['imgarr'].length-4}</div>`
            cardImgs.innerHTML+=extra;
        }
    }
}

function fetchData(loadDataArray) {
    let roleName = loadDataArray['Role Name'];
    let department = loadDataArray['Department'];
    let location = loadDataArray['Location'];
    let imgArray = loadDataArray['imgArray']
    
    let roleDataObj = {
        role: roleName,
        dept: department,
        locat: location,
        imgarr: imgArray,
    }
    return roleDataObj
    
}

function getRoleDataStorage() {
    const loadData = localStorage.getItem("roleData");
    if (loadData != null) {
        const loadDataArray = JSON.parse(loadData);
        return loadDataArray;
    }
    return null;
}

document.addEventListener('DOMContentLoaded' ,()=>{
    let roleDataStorage = getRoleDataStorage();
    if (roleDataStorage != null){
        for (let it = 0; it < roleDataStorage.length; it++) {
        let roleData = fetchData(roleDataStorage[it]);
        insertCard(roleData);
        }
    }
    
})
