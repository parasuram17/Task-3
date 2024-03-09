import { clearDOM } from "../DOMManipulation/DOMclear.js";
import { TypeCheck } from "../Types/Types.js";
import { DOMFetch } from "../DOMManipulation/DOMFetch.js";
import { insertDOM } from "../DOMManipulation/DOMInsert.js";
class ResetFilters {
    constructor() {
        this.postFilterStorage = [];
    }
    reset(callingPage, resetData) {
        clearDOM.clear(callingPage);
        let filterTags = document.querySelectorAll('.filter-tags');
        for (let iter = 0; iter < resetData.length; iter++) {
            let data = DOMFetch.fetchData(resetData[iter]);
            insertDOM.insertData(data);
            if (TypeCheck.instanceofEmployeeData(data)) {
                this.postFilterStorage.push(data);
            }
        }
        for (let i = 0; i < filterTags.length; i++) {
            filterTags[i].selectedIndex = 0;
        }
        if (callingPage == "index") {
            let alphabetButtons = document.querySelectorAll(".btn-alphabet");
            for (let i = 0; i < alphabetButtons.length; i++) {
                alphabetButtons[i].classList.remove('active');
            }
        }
        return this.postFilterStorage;
    }
}
export let filtersReset = new ResetFilters();
