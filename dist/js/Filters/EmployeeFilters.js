import { Filters } from "./Filters.js";
export class EmployeeFilters extends Filters {
    constructor() {
        super(...arguments);
        this.statusFilter = document.getElementById('status');
        this.statusText = this.statusFilter.options[this.statusFilter.selectedIndex].text;
        this.getFilterObject = this.getFilters(this.statusText);
    }
}
