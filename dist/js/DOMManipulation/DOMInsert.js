import { TypeCheck } from "../Types/Types.js";
class DOMInsert {
    insertData(dataObject) {
        if (TypeCheck.instanceofEmployeeData(dataObject)) {
            let tbody = document.querySelector('tbody');
            let empContainer = document.querySelector('.emp-details');
            if (tbody) {
                let tableRowTemplate = `
                <tr class="table-rows">
                    <td>
                        <input type="checkbox" class="check-box">
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
                        ${dataObject['locat']}
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
                    <td class="triple-dot">
                        <a>
                            ...
                            <div class="tooltip">
                                <a id = "${dataObject['idNo']}-child" class = "tt-view"><p class="tooltip-text">View Details</p></a>
                                <a id = "${dataObject['idNo']}-child2" class = "tt-edit"]><p class="tooltip-text">Edit</p></a>
                                <a id = "${dataObject['idNo']}-child3" class = "tt-delete"><p class="tooltip-text">Delete</p></a>
                            </div>
                        </a>
                    </td>
                </tr>`;
                tbody.innerHTML += tableRowTemplate;
            }
            if (empContainer) {
                let tableRowTemplate = `
                <div class="emp-details-row" id=${dataObject['idNo']}>
                    <div class="img-name-div">
                        <img src="${dataObject['picture']}" alt="emp-profile-pic"> 
                        <p>${dataObject['name']}</p>
                    </div>
                    <div>
                        <input type="checkbox">
                    </div>
                    
                </div>`;
                empContainer.innerHTML += tableRowTemplate;
            }
        }
        else if (TypeCheck.instanceofRoleData(dataObject)) {
            let cardBody = document.querySelector('.cards');
            let cardID = dataObject.role.replaceAll(" ", "-");
            let cardTemplate = `
            <div class="c1" id='${cardID}'>
                        <div class="card-heading">
                            <div class="card-heading-text">${dataObject['role']}</div>
                            <div class="edit-icon" ><a class="a-edit-button" id='${cardID}-child'><img src="../assets/images/edit.svg"></a></div>
                        </div>
                        <div class="card-sub-heading">
                            <div class="card-sub-heading-left">
                                <div>
                                    <img class="card-icons" src="../assets/images/team_svgrepo.com.svg">
                                </div>
                                <div>
                                    Department
                                </div>
                            </div>
                            <div class="card-sub-heading-right">
                                ${dataObject['dept']}
                            </div>
                        </div>
                        <div class="card-sub-heading">
                            <div class="card-sub-heading-left">
                                <div>
                                    <img class="card-icons" src="../assets/images/location-pin-alt-1_svgrepo.com.svg">
                                </div>
                                <div>
                                    Location
                                </div>
                            </div>
                            <div class="card-sub-heading-right">
                                ${dataObject['locat']}
                            </div>
                        </div>
                        <div class="card-sub-heading">
                            <div class="card-sub-heading-left">
                                Total Employees
                            </div>
                            <div class="card-sub-heading-right card-imgs">
                                
                            </div>
                        </div>
                        <a id="${cardID}-child2" class ="a-view-employees">
                        <div class="view-arrow">
                                <p>View all Employees </p>
                                <img class="icon-arrow" src="../assets/images/Vector.svg">
                        </div>
                        </a>
                    </div>
            
            `;
            cardBody.innerHTML += cardTemplate;
            let imgIDs = dataObject['imgarr'];
            let ID = document.getElementById(cardID);
            let cardImgs = ID.querySelector('.card-imgs');
            if (imgIDs != null) {
                if (imgIDs.length <= 4) {
                    for (let i = 0; i < imgIDs.length; i++) {
                        let img = this.getImgFromID(imgIDs[i]);
                        let cardImgTemplate = `<div><img class="imgs-top-5-emps" src="${img}"></div>`;
                        cardImgs.innerHTML += cardImgTemplate;
                    }
                }
                else {
                    for (let i = 0; i < 4; i++) {
                        let img = this.getImgFromID(imgIDs[i]);
                        let cardImgTemplate = `<div><img class="imgs-top-5-emps" src="${img}"></div>`;
                        cardImgs.innerHTML += cardImgTemplate;
                    }
                    let extra = `<div class="plus-43">+${dataObject['imgarr'].length - 4}</div>`;
                    cardImgs.innerHTML += extra;
                }
            }
        }
        else if (TypeCheck.instanceofEmployeeFormData(dataObject)) {
            let empCardBody = document.querySelector('.cards');
            let name = dataObject['First Name'] + " " + dataObject['Last Name'];
            let empCardTemplate = `
            <div class="c1">
                <div class="profile-section-copy profile-section-copy-employee-page">
                    <div>
                        <img class="img-avatar" src="${dataObject['profile picture']}">
                    </div>
                    <div>
                        <p class="card-person-name">${name}</p>
                        <p class="card-person-role">${dataObject['Job Title']}</p>
                    </div>
                </div>
                <div class="card-sub-heading">
                    <div>
                        <img class="card-icons" src="../assets/images/empId.svg">
                    </div>
                    <div>
                        ${dataObject['Emp no']}
                    </div>
                </div>
                <div class="card-sub-heading">
                    <div>
                        <img class="card-icons" src="../assets/images/email-1_svgrepo.com.svg">
                    </div>
                    <div>
                        ${dataObject['Email ID']}
                    </div>
                </div>
                <div class="card-sub-heading">
                    <div>
                        <img class="card-icons" src="../assets/images/team_svgrepo.com.svg">
                    </div>
                    <div>
                        ${dataObject['Department']}
                    </div>
                </div>
                <div class="card-sub-heading">
                    <div>
                        <img class="card-icons" src="../assets/images/location-pin-alt-1_svgrepo.com.svg">
                    </div>
                    <div>
                        ${dataObject['Location']}
                    </div>
                </div>
                <div class="view-arrow">
                    <p>View</p>
                    <img class="icon-arrow" src="../assets/images/Vector.svg">
                </div>
            </div>
        `;
            empCardBody.innerHTML += empCardTemplate;
        }
    }
    getImgFromID(imgID) {
        let employeeData = localStorage.getItem("employeeData");
        let employeeDataArray = JSON.parse(employeeData);
        for (let i of employeeDataArray) {
            if (i['Emp no'] == imgID) {
                return i['profile picture'];
            }
        }
    }
}
export let insertDOM = new DOMInsert();
