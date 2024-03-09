import { EmployeeData, EmployeeFormData, RoleData, RoleFormData, TypeCheck } from "../Types/Types.js";

export class DOMFetch {
    static fetchData(formData: EmployeeFormData | RoleFormData) {

        if (TypeCheck.instanceofEmployeeFormData(formData)) {
            let profile_Pic = formData['profile picture'];
            let firstName = formData['First Name'];
            let lastName = formData['Last Name'];
            let emailID = formData['Email ID'];
            let location = formData['Location'];
            let department = formData['Department'];
            let role = formData['Job Title'];
            let empno = formData['Emp no'];
            let status = 'Active'
            let joinDate = formData['Join Date'];

            let dataObj: EmployeeData = {
                picture: profile_Pic,
                name: firstName + " " + lastName,
                email: emailID,
                locat: location,
                dept: department,
                job_title: role,
                idNo: empno,
                onlineStatus: status,
                joinDt: joinDate,
            }
            return dataObj
        }
        else if (TypeCheck.instanceofRoleFormData(formData)) {  
            
            let roleName = formData['Role Name'];
            let department = formData['Department'];
            let location = formData['Location'];
            let imgArray = formData['imgArray']
            
            let dataObj: RoleData = {
                role: roleName,
                dept: department,
                locat: location,
                imgarr: imgArray,
            }
            return dataObj
        }
    }
}