
/*js for sidebar start*/
{
    let collapseButton = document.querySelector('#collapsing-button');
    let sideBar = document.querySelector('.sidebar');
    let body = document.querySelector('body')
    collapseButton.onclick = function(){
        sideBar.classList.toggle('active');
        body.classList.toggle('active');
    }
}
/*js for sidebar end*/

/* js for index page start*/

{
    function tableToCSV(table,file){
        var data = [];
        var rows = document.querySelectorAll('table tr');
        for(var i = 0; i<rows.length; i++){
            var row =[];
            var cols = rows[i].querySelectorAll("tbody td, thead th");
            for(var j = 0; j<cols.length; j++){
                row.push(cols[j].innerText);
            }
        data.push(row.join(","));
        }

        downloadCSV(data.join("\n"),file)
    }
    function downloadCSV(csv, file){
        var csv_file, download_link;
        csv_file = new Blob([csv], {type:"text/csv"});
        download_link = document.createElement('a');
        download_link.download = file;
        download_link.href = window.URL.createObjectURL(csv_file);
        download_link.style.display = "none";
        document.body.appendChild(download_link);
        download_link.click();  
    }

    document.getElementById("export-button").addEventListener('click', function(){
        var table = document.querySelector("table").outerHTML;
        tableToCSV(table,"Employees.csv")
    });
}

{
    function addEmployeeRedirect() {
        location.href = "addEmployees.html";
    }
}
{
    document.addEventListener('DOMContentLoaded', () => {
        tbody=document.querySelector('tbody');
        const loadData = localStorage.getItem("employeeData");
        const loadDataArray = JSON.parse(loadData);
        for (item of loadDataArray) {
            var profile_Pic = item['profile picture'];
            var firstName = item['First Name'];
            var lastName = item['Last Name'];
            var emailID = item['Email ID'];
            var location = item['Location'];
            var department = item['Department'];
            var role = item['Job Title'];
            var empno = item['Emp no'];
            var status = 'Active'
            var joinDate = item['Join Date'];
            var ellipsis = '...';

            let tableRowTemplate =
            `
            <tr class="table-rows">
                            <td><input type="checkbox" class="check-box"/></td>
                            <td class="th-user">
                                <div class="profile-section-copy">
                                    <div>
                                        <img class="img-avatar" src="${profile_Pic}"/>
                                    </div>
                                    <div>
                                        <p class="table-person-name">${firstName+" " } ${lastName}</p>
                                        <p class="table-person-email">${emailID}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="row-content th-location">${location}</td>
                            <td class="row-content th-department">${department}</td>
                            <td class="row-content th-role">${role}</td>
                            <td class="row-content th-empno">${empno}</td>
                            <td class="th-status">
                                <button class="btn-active">${status}</button>
                            </td>
                            <td class="row-content th-joindt">${joinDate}</td>
                            <td class="triple-dot">${ellipsis}</td>
                        </tr>`;
                tbody.innerHTML += tableRowTemplate;
        
        }



    });


}

/* js for index page end*/

/* js for addEmployees page start*/
{
    let profilePicture = document.getElementById("profile-picture");
    let inputPicture = document.getElementById("input-file")
    inputPicture.onchange = () => {
        profilePicture.src = URL.createObjectURL(inputPicture.files[0]);
    }
}
{
    let globalurl;
    const profilePic = document.getElementById('input-file');
    profilePic.addEventListener('change', () => {
        const fr = new FileReader();
        fr.readAsDataURL(profilePic.files[0]);
        fr.addEventListener('load', () => {
            var url = fr.result;
            globalurl = url
            // console.log(url);
        });
    })

    const empForm = document.querySelector(".form-employee");
    empForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const empFormData = new FormData(empForm);
        const empFormDataObject = Object.fromEntries(empFormData);
        empFormDataObject['profile picture'] = globalurl;
        // console.log(empFormDataObject['profile picture'])
        const exists = localStorage.getItem("employeeData");
        if (exists == null) {
            const jsonString = JSON.stringify([empFormDataObject]);
            localStorage.setItem("employeeData", jsonString);
            alert("added successfully");
        }
        else {
            const existingData = localStorage.getItem("employeeData");
            const existingDataArray = JSON.parse(existingData);
            existingDataArray.push(empFormDataObject);
            const jsonString = JSON.stringify(existingDataArray);
            localStorage.setItem("employeeData", jsonString);
            alert("added successfully");
        }
        window.location.href = "index.html";
    })
}
/* js for addEmployees page end*/


