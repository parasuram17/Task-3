import { Filters } from "./Filters.js";
export class RolesFilters extends Filters {
    constructor() {
        super(...arguments);
        this.getFilterObject = this.getFilters();
    }
}
