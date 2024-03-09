import { RoleData } from './Types/Types.js'
import { insertDOM } from './DOMManipulation/DOMInsert.js';
import { RoleDataFetch } from './DataFetch/DataFetch.js';
import { DOMFetch } from './DOMManipulation/DOMFetch.js';
import { RolesFilters } from './Filters/RolesFilters.js';
import { filtersReset } from './Filters/ResetFilters.js';
import { loadEventListener } from './LoadEventListeners/LoadEventListeners.js';

let roleData = RoleDataFetch.fetchRoleData()

document.addEventListener('DOMContentLoaded', () => {
    let roleDataStorage = RoleDataFetch.fetchRoleData();
    if (roleDataStorage != null) {
        for (let it = 0; it < roleDataStorage.length; it++) {
            let roleData: RoleData = DOMFetch.fetchData(roleDataStorage[it]) as RoleData;
            insertDOM.insertData(roleData);
        }
    }

    let addRolesButton: HTMLButtonElement = document.querySelector('.btn-add-role') as HTMLButtonElement;
    addRolesButton.addEventListener('click', () => {
        localStorage.removeItem("editCard");
        location.href = "addRoles.html";
    })

    let resetButton: HTMLButtonElement = document.querySelector(".btn-reset") as HTMLButtonElement;
    resetButton.addEventListener('click', () => {
        filtersReset.reset('roles', roleData);

        loadEventListener.editCardEventListener();
        loadEventListener.viewEmployeesEventListener();
    })

    let filterApplyButton: HTMLButtonElement = document.querySelector(".btn-apply") as HTMLButtonElement;
    filterApplyButton.addEventListener('click', () => {
        let f1 = new RolesFilters();
        let filters = f1.getFilterObject
        f1.applyFilters(filters, roleData);
        
        loadEventListener.editCardEventListener();
        loadEventListener.viewEmployeesEventListener();

    })

    loadEventListener.editCardEventListener();
    loadEventListener.viewEmployeesEventListener();
})
