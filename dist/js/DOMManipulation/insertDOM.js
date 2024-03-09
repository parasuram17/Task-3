class insertDOM {
    insertData(dataObject, callingPage) {
        if (this.instanceofEmployeeData(dataObject)) {
            let tbody = document.querySelector('tbody');
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
        else {
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
    instanceofEmployeeData(object) {
        return true;
    }
}
export let insertDOM = new DOMInsert();
