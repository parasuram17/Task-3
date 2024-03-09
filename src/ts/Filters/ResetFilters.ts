import { clearDOM } from "../DOMManipulation/DOMclear.js"
import { EmployeeData, EmployeeFormData, RoleData, RoleFormData, TypeCheck } from "../Types/Types.js";
import { DOMFetch } from "../DOMManipulation/DOMFetch.js";
import { insertDOM } from "../DOMManipulation/DOMInsert.js";

class ResetFilters {
    postFilterStorage: (EmployeeData)[] = []

    reset(callingPage: string, resetData: Array<EmployeeFormData> | Array<RoleFormData>) {
        clearDOM.clear(callingPage)
        let filterTags: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.filter-tags') as NodeListOf<HTMLSelectElement>;

        for (let iter = 0; iter < resetData.length; iter++) {
            let data: EmployeeData | RoleData = DOMFetch.fetchData(resetData[iter]) as EmployeeData | RoleData;
            insertDOM.insertData(data)
            if (TypeCheck.instanceofEmployeeData(data)) {
                this.postFilterStorage.push(data);
            }
        }
        
        for (let i = 0; i < filterTags.length; i++) {
            filterTags[i].selectedIndex = 0;
        }

        if (callingPage =="index") {
            let alphabetButtons = document.querySelectorAll(".btn-alphabet");
            for (let i = 0; i < alphabetButtons.length; i++) {
                alphabetButtons[i].classList.remove('active');
            }
        }

        return this.postFilterStorage
    }
}

export let filtersReset = new ResetFilters();