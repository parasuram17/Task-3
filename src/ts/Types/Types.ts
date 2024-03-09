export interface EmployeeFormData{
    ['profile picture']:string,
    ['First Name']:string,
    ['Last Name']:string,
    ['Email ID']:string,
    ['Location']:string,
    ['DOB']:string,
    ['Phone no']:string,
    ['Department']:string,
    ['Job Title']:string,
    ['Emp no']:string,
    status:string,
    ['Join Date']:string,
    ['Assign Manager']:string,
    ['Assign Project']:string,
}
export interface EmployeeData{
    picture: string,
    name : string,
    email: string,
    locat: string,
    dept: string,
    job_title: string,
    idNo: string,
    onlineStatus: string,
    joinDt: string,
}
export interface RoleFormData {
    ['Role Name']:string,
    ['Description']?:string,
    ['Location']:string,
    ['Department']:string,
    ['imgArray']:Array<string>,
}
export interface RoleData {
    role:string,
    dept:string,
    locat:string,
    imgarr:Array<string>,
}
export interface Filter{
    status?: string,
    location: string,
    department: string,
}

export type empKey = keyof EmployeeData;
export class TypeCheck{
    static instanceofEmployeeData(object: any): object is EmployeeData{
        return object['idNo'] && object['name'];
    }

    static instanceofRoleData(object: any): object is RoleData{
        return object['role'] && object['imgarr'];
    }

    static instanceofEmployeeFormData(object: any): object is EmployeeFormData{
        return object['Emp no'] && object['First Name'];
    }

    static instanceofRoleFormData(object: any): object is RoleFormData{
        return object['Role Name'] && object['Location'];
    }
    
}