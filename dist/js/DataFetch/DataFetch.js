export class EmployeeDataFetch {
    static fetchEmployeeData() {
        const employeeDataLocalStorage = localStorage.getItem('employeeData');
        if (employeeDataLocalStorage) {
            const employeeDataArray = JSON.parse(employeeDataLocalStorage);
            return employeeDataArray;
        }
        return null;
    }
}
export class RoleDataFetch {
    static fetchRoleData() {
        const roleDataLocalStorage = localStorage.getItem('roleData');
        if (roleDataLocalStorage) {
            const roleDataArray = JSON.parse(roleDataLocalStorage);
            return roleDataArray;
        }
        return null;
    }
}
export class viewEmployeeDataFetch {
    static fetchViewEmployeeData() {
        const loadData = localStorage.getItem("viewAllEmployees");
        if (loadData != null) {
            const loadDataArray = JSON.parse(loadData);
            return loadDataArray;
        }
        return null;
    }
}
