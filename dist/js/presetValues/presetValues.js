import { TypeCheck } from "../Types/Types.js";
class presetValues {
    presetValue(presetObject, disable = false) {
        if (TypeCheck.instanceofRoleFormData(presetObject)) {
            let roleName = document.getElementById('input-role-name-addRoles');
            let departmentDropDown = document.getElementById('input-department-addRoles');
            let locationDropDown = document.getElementById('input-location');
            let departmentOptions = departmentDropDown.options;
            let locationOptions = locationDropDown.options;
            roleName.readOnly = true;
            roleName.value = presetObject['Role Name'];
            for (let i of departmentOptions) {
                if (presetObject['Department'] == i.innerText) {
                    departmentDropDown.selectedIndex = i.index;
                    break;
                }
            }
            for (let i of locationOptions) {
                if (presetObject['Location'] == i.innerText) {
                    locationDropDown.selectedIndex = i.index;
                    break;
                }
            }
            for (let i = 0; i < presetObject['imgArray'].length; i++) {
                console.log(presetObject['imgArray'][i].trim());
                let empl = document.getElementById(presetObject['imgArray'][i]);
                empl.getElementsByTagName('input')[0].checked = true;
            }
        }
        if (TypeCheck.instanceofEmployeeFormData(presetObject)) {
            let empno = document.getElementById('input-emp-no');
            let firstName = document.getElementById('input-first-name');
            let lastName = document.getElementById('input-last-name');
            let DOB = document.getElementById('input-dob');
            let emailID = document.getElementById('input-email');
            let phoneNO = document.getElementById('input-phno');
            let joinDT = document.getElementById('input-join-date');
            let locationDropDown = document.getElementById('input-location');
            let jobTitleDropDown = document.getElementById('input-job-title');
            let departmentDropDown = document.getElementById('input-department');
            let assignManagerDropDown = document.getElementById('input-assign-manager');
            let assignProjectDropDown = document.getElementById('input-assign-project');
            let displayPic = document.getElementById('profile-picture');
            displayPic.src = presetObject['profile picture'];
            empno.value = presetObject['Emp no'];
            firstName.value = presetObject['First Name'];
            lastName.value = presetObject['Last Name'];
            DOB.value = presetObject['DOB'];
            emailID.value = presetObject['Email ID'];
            phoneNO.value = presetObject['Phone no'];
            joinDT.value = presetObject['Join Date'];
            let locationOptions = locationDropDown.options;
            let jobTitleOptions = jobTitleDropDown.options;
            let departmentOptions = departmentDropDown.options;
            let assignManagerOptions = assignManagerDropDown.options;
            let assignProjectOptions = assignProjectDropDown.options;
            for (let i of locationOptions) {
                if (presetObject['Location'] == i.innerText) {
                    locationDropDown.selectedIndex = i.index;
                    break;
                }
            }
            for (let i of jobTitleOptions) {
                if (presetObject['Job Title'] == i.innerText) {
                    jobTitleDropDown.selectedIndex = i.index;
                    break;
                }
            }
            for (let i of departmentOptions) {
                if (presetObject['Department'] == i.innerText) {
                    departmentDropDown.selectedIndex = i.index;
                    break;
                }
            }
            for (let i of assignManagerOptions) {
                if (presetObject['Assign Manager'] == i.innerText) {
                    assignManagerDropDown.selectedIndex = i.index;
                    break;
                }
            }
            for (let i of assignProjectOptions) {
                if (presetObject['Assign Project'] == i.innerText) {
                    assignProjectDropDown.selectedIndex = i.index;
                    break;
                }
            }
            empno.readOnly = true;
            firstName.readOnly = disable;
            lastName.readOnly = disable;
            DOB.readOnly = disable;
            emailID.readOnly = disable;
            phoneNO.readOnly = disable;
            joinDT.readOnly = disable;
            locationDropDown.disabled = disable;
            jobTitleDropDown.disabled = disable;
            departmentDropDown.disabled = disable;
            assignManagerDropDown.disabled = disable;
            assignProjectDropDown.disabled = disable;
        }
    }
}
export let preset = new presetValues();
