import { EmployeeDataFetch } from "../DataFetch/DataFetch.js";
import { helper } from "../Helper/Helper.js";
import { EmployeeFormData } from "../Types/Types.js";
import { checkValid } from "../Validation/Validation.js";
import { preset } from "../presetValues/presetValues.js";

export class ViewEditAddEmployees{
    static loadAddEmpForm(emptyLabelInput:NodeListOf<Element>, defaultUrl:string) {
        const empForm: HTMLFormElement = document.querySelector(".form-employee") as HTMLFormElement;
        const addButton: HTMLElement = document.querySelector('.btn-adding-employee') as HTMLElement;

        addButton.addEventListener("click", (e) => {
            e.preventDefault();

            const empFormData = new FormData(empForm);
            const empFormDataObject: EmployeeFormData = Object.fromEntries(empFormData) as unknown as EmployeeFormData;
            empFormDataObject['profile picture'] = defaultUrl;
            const exists = localStorage.getItem("employeeData");
    
            if(!checkValid.isValid(emptyLabelInput)) return 
            
            if (exists == null || JSON.parse(exists) == null) {
                const jsonString = JSON.stringify([empFormDataObject]);
                localStorage.setItem("employeeData", jsonString);
                localStorage.setItem("Toast", JSON.stringify([true, true]));
                helper.updateRoleData(empFormDataObject['Emp no'], empFormDataObject['Job Title']);
                window.location.href = "index.html";
            }

            else {
                const existingDataArray = EmployeeDataFetch.fetchEmployeeData();

                for (let i = 0; i < existingDataArray.length; i++) {
                    if (existingDataArray[i]['Emp no'] == empFormDataObject['Emp no'] ||
                        existingDataArray[i]['Email ID'] == empFormDataObject['Email ID']) {
                        localStorage.setItem("Toast", JSON.stringify([true, false]));
                        window.location.href = "index.html";
                        return;
                    }
                }

                existingDataArray.push(empFormDataObject);
                const jsonString = JSON.stringify(existingDataArray);
                localStorage.setItem("employeeData", jsonString);
                localStorage.setItem("Toast", JSON.stringify([true, true]));
                helper.updateRoleData(empFormDataObject['Emp no'], empFormDataObject['Job Title']);
                window.location.href = "index.html";
            }
        })
    }
    
    static loadViewEmpForm() {
        let heading: HTMLElement = document.getElementById('h1-tag') as HTMLElement;
        let upImg: HTMLElement = document.querySelector('.input-box') as HTMLElement;
        let addBtn: HTMLElement = document.querySelector('.btn-adding-employee') as HTMLElement;
        
        let viewingRecord: string = localStorage.getItem('viewData') as string;
        let viewingRecordObject = JSON.parse(viewingRecord);

        heading.innerHTML = "View Employee Details";
        upImg.style.display = "none";
        addBtn.style.display = "none";
        
        preset.presetValue(viewingRecordObject, true);
    }
    
    static loadEditEmpForm(emptyLabelInput:NodeListOf<Element>) {
        let heading: HTMLElement = document.getElementById('h1-tag') as HTMLElement
        let updateButton: HTMLElement = document.querySelector('.input-box') as HTMLElement;
        let addBtn: HTMLElement = document.querySelector('.btn-adding-employee') as HTMLElement
        
        let editingRecord: string = localStorage.getItem('editData') as string;
        let editingRecordObject = JSON.parse(editingRecord);
        
        heading.innerHTML = "Edit Employee";
        let updateButtonLabel: HTMLCollectionOf<HTMLLabelElement> = updateButton.getElementsByTagName("label") as HTMLCollectionOf<HTMLLabelElement>;
        updateButtonLabel[0].innerHTML = "Update Profile Picture";
        addBtn.innerText = "Update Employee";
    
        preset.presetValue(editingRecordObject, false);
        let defaultUrl = editingRecordObject['profile picture'];
    
        const empForm: HTMLFormElement = document.querySelector(".form-employee") as HTMLFormElement;
        const addButton: HTMLElement = document.querySelector('.btn-adding-employee') as HTMLElement

        addButton.addEventListener("click", (e) => {
            e.preventDefault();
            const empFormData = new FormData(empForm);
            const empFormDataObject: EmployeeFormData = Object.fromEntries(empFormData) as unknown as EmployeeFormData;
            empFormDataObject['profile picture'] = defaultUrl;
            
            if(!checkValid.isValid(emptyLabelInput)) return
    
            const existingDataArray = EmployeeDataFetch.fetchEmployeeData();

            for (let i = 0; i < existingDataArray.length; i++) {
                if (existingDataArray[i]['Emp no'] == empFormDataObject['Emp no']) {
                    existingDataArray[i] = empFormDataObject;
                    helper.updateRoleData(empFormDataObject['Emp no'], empFormDataObject['Job Title']);
                    break;
                }
            }
            
            const jsonString = JSON.stringify(existingDataArray);
            localStorage.setItem("employeeData", jsonString);
            localStorage.setItem("Toast", JSON.stringify([true, true]));
            window.location.href = 'index.html';
        })
    }
}