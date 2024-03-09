import { Filters } from "./Filters.js";

export class EmployeeFilters extends Filters{
    statusFilter:HTMLSelectElement = document.getElementById('status') as HTMLSelectElement;
    statusText = this.statusFilter.options[this.statusFilter.selectedIndex].text;
    getFilterObject = this.getFilters(this.statusText);
}

