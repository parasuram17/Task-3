import { EmployeeFormData, RoleFormData, TypeCheck } from "../Types/Types.js";

class presetValues{
    presetValue(presetObject: RoleFormData| EmployeeFormData, disable:boolean = false) {
        if(TypeCheck.instanceofRoleFormData(presetObject)){
            let roleName: HTMLInputElement = document.getElementById('input-role-name-addRoles') as HTMLInputElement;
            let departmentDropDown: HTMLSelectElement = document.getElementById('input-department-addRoles') as HTMLSelectElement;
            let locationDropDown: HTMLSelectElement = document.getElementById('input-location') as HTMLSelectElement;
            
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
                console.log(presetObject['imgArray'][i].trim())
                let empl: HTMLInputElement = document.getElementById(presetObject['imgArray'][i]) as HTMLInputElement;
                empl.getElementsByTagName('input')[0].checked = true;
            }
        }

        if(TypeCheck.instanceofEmployeeFormData(presetObject)){
            
            let empno:HTMLInputElement = document.getElementById('input-emp-no') as HTMLInputElement;
            let firstName:HTMLInputElement = document.getElementById('input-first-name') as HTMLInputElement;
            let lastName:HTMLInputElement = document.getElementById('input-last-name') as HTMLInputElement;
            let DOB: HTMLInputElement = document.getElementById('input-dob') as HTMLInputElement;
            let emailID: HTMLInputElement= document.getElementById('input-email') as HTMLInputElement;
            let phoneNO: HTMLInputElement = document.getElementById('input-phno') as HTMLInputElement;
            let joinDT:HTMLInputElement = document.getElementById('input-join-date') as HTMLInputElement;
            let locationDropDown:HTMLSelectElement = document.getElementById('input-location') as HTMLSelectElement;
            let jobTitleDropDown:HTMLSelectElement = document.getElementById('input-job-title') as HTMLSelectElement;
            let departmentDropDown:HTMLSelectElement = document.getElementById('input-department') as HTMLSelectElement;
            let assignManagerDropDown:HTMLSelectElement = document.getElementById('input-assign-manager') as HTMLSelectElement;
            let assignProjectDropDown:HTMLSelectElement = document.getElementById('input-assign-project') as HTMLSelectElement;
            let displayPic:HTMLImageElement = document.getElementById('profile-picture') as HTMLImageElement;

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