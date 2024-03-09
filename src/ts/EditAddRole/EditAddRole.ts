import { helper } from "../Helper/Helper.js";
import { RoleFormData } from "../Types/Types.js";
import { checkValid } from "../Validation/Validation.js";
import { preset } from "../presetValues/presetValues.js";

export class EditAddRole{
    static emptyInput: HTMLInputElement = document.getElementById('input-role-name-addRoles') as HTMLInputElement;

    static loadAddCard() {
        const roleForm: HTMLFormElement = document.querySelector(".add-role-form") as HTMLFormElement;
        const sumbitButton: HTMLButtonElement = document.querySelector(".btn-adding-role") as HTMLButtonElement;

        sumbitButton.addEventListener("click", (e) => {
            e.preventDefault();
            const roleFormData = new FormData(roleForm);
            const roleFormDataObject: RoleFormData = Object.fromEntries(roleFormData) as unknown as RoleFormData;

            if (checkValid.validateCardForm(this.emptyInput)) return;
    
            const dataExists = localStorage.getItem("roleData");
            if (dataExists == null) {
                const jsonString = JSON.stringify([roleFormDataObject]);
                localStorage.setItem("roleData", jsonString);
            }

            else {
                const DataArray = JSON.parse(dataExists);
                for (let i = 0; i < DataArray.length; i++) {
                    if (DataArray[i]['Role Name'] == roleFormDataObject['Role Name']) {
                        window.location.href = "roles.html";
                        return;
                    }
                }

                DataArray.push(roleFormDataObject);
                const jsonString = JSON.stringify(DataArray);
                localStorage.setItem("roleData", jsonString);
            }
    
            helper.imgHandling(roleFormDataObject);
    
            window.location.href = "roles.html";
        });
    }
    static loadEditCard() {
        let heading: HTMLElement = document.getElementById('h1-tag') as HTMLElement;
        let updateBtn: HTMLElement = document.querySelector('.btn-adding-role') as HTMLElement
        const roleForm: HTMLFormElement = document.querySelector(".add-role-form") as HTMLFormElement;

        let editingCard: string = localStorage.getItem('editCard') as string;
        let editingCardObject = JSON.parse(editingCard);

        heading.innerHTML = "Editing Role";
        updateBtn.innerText = "Update Role";

        preset.presetValue(editingCardObject)

        updateBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const roleFormData = new FormData(roleForm);
            const roleFormDataObject: RoleFormData = Object.fromEntries(roleFormData) as unknown as RoleFormData;

            if (checkValid.validateCardForm(this.emptyInput)) return;

            const dataExists: string = localStorage.getItem("roleData") as string;
            const DataArray = JSON.parse(dataExists);

            for (let i = 0; i < DataArray.length; i++) {
                if (DataArray[i]['Role Name'] == roleFormDataObject['Role Name']) {
                    DataArray[i] = roleFormDataObject;
                    break;
                }
            }
            
            const jsonString = JSON.stringify(DataArray);
            localStorage.setItem("roleData", jsonString);
    
            helper.imgHandling(roleFormDataObject)
            window.location.href = "roles.html";
        });
    }
}