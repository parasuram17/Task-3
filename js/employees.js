function insertEmpCard(cardObj) {
    let empCardBody = document.querySelector('.cards')
    let name = cardObj['First Name']+" "+cardObj['Last Name']
    let empCardTemplate =
    `
    <div class="c1">
        <div class="profile-section-copy profile-section-copy-employee-page">
            <div>
                <img class="img-avatar" src="${cardObj['profile picture']}">
            </div>
            <div>
                <p class="card-person-name">${name}</p>
                <p class="card-person-role">Employee</p>
            </div>
        </div>
        <div class="card-sub-heading">
            <div>
                <img class="card-icons" src="images/empId.svg">
            </div>
            <div>
                ${cardObj['Emp no']}
            </div>
        </div>
        <div class="card-sub-heading">
            <div>
                <img class="card-icons" src="images/email-1_svgrepo.com.svg">
            </div>
            <div>
                ${cardObj['Email ID']}
            </div>
        </div>
        <div class="card-sub-heading">
            <div>
                <img class="card-icons" src="images/team_svgrepo.com.svg">
            </div>
            <div>
                ${cardObj['Department']}
            </div>
        </div>
        <div class="card-sub-heading">
            <div>
                <img class="card-icons" src="images/location-pin-alt-1_svgrepo.com.svg">
            </div>
            <div>
                ${cardObj['Location']}
            </div>
        </div>
        <div class="view-arrow">
            <p>View</p>
            <img class="icon-arrow" src="images/Vector.svg">
        </div>
    </div>
    `;
    empCardBody.innerHTML+=empCardTemplate;
}

function getRoleDataStorage() {
    const loadData = localStorage.getItem("viewAllEmployees");
    if (loadData != null) {
        const loadDataArray = JSON.parse(loadData);
        return loadDataArray;
    }
    return null;
}

document.addEventListener('DOMContentLoaded' ,()=>{
    let roleDataStorage = getRoleDataStorage();
    let empDataStorage = localStorage.getItem("employeeData")
    let empDataStorageArray = JSON.parse(empDataStorage);
    if (roleDataStorage != null){
        for(let i = 0;i<roleDataStorage['imgArray'].length;i++){
            let currentID = roleDataStorage['imgArray'][i];
            for(let j=0; j<empDataStorageArray.length;j++){
                if (empDataStorageArray[j]['Emp no'] == currentID){
                    currentObject = empDataStorageArray[j]
                    insertEmpCard(currentObject);
                }
            }
            
        }
    }
    
})