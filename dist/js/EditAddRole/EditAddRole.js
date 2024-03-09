import { helper } from "../Helper/Helper.js";
import { checkValid } from "../Validation/Validation.js";
import { preset } from "../presetValues/presetValues.js";
export class EditAddRole {
    static loadAddCard() {
        const roleForm = document.querySelector(".add-role-form");
        const sumbitButton = document.querySelector(".btn-adding-role");
        sumbitButton.addEventListener("click", (e) => {
            e.preventDefault();
            const roleFormData = new FormData(roleForm);
            const roleFormDataObject = Object.fromEntries(roleFormData);
            if (checkValid.validateCardForm(this.emptyInput))
                return;
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
        let heading = document.getElementById('h1-tag');
        let updateBtn = document.querySelector('.btn-adding-role');
        const roleForm = document.querySelector(".add-role-form");
        let editingCard = localStorage.getItem('editCard');
        let editingCardObject = JSON.parse(editingCard);
        heading.innerHTML = "Editing Role";
        updateBtn.innerText = "Update Role";
        preset.presetValue(editingCardObject);
        updateBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const roleFormData = new FormData(roleForm);
            const roleFormDataObject = Object.fromEntries(roleFormData);
            if (checkValid.validateCardForm(this.emptyInput))
                return;
            const dataExists = localStorage.getItem("roleData");
            const DataArray = JSON.parse(dataExists);
            for (let i = 0; i < DataArray.length; i++) {
                if (DataArray[i]['Role Name'] == roleFormDataObject['Role Name']) {
                    DataArray[i] = roleFormDataObject;
                    break;
                }
            }
            const jsonString = JSON.stringify(DataArray);
            localStorage.setItem("roleData", jsonString);
            helper.imgHandling(roleFormDataObject);
            window.location.href = "roles.html";
        });
    }
}
EditAddRole.emptyInput = document.getElementById('input-role-name-addRoles');
