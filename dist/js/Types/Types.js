export class TypeCheck {
    static instanceofEmployeeData(object) {
        return object['idNo'] && object['name'];
    }
    static instanceofRoleData(object) {
        return object['role'] && object['imgarr'];
    }
    static instanceofEmployeeFormData(object) {
        return object['Emp no'] && object['First Name'];
    }
    static instanceofRoleFormData(object) {
        return object['Role Name'] && object['Location'];
    }
}
