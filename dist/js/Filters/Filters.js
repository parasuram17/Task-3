import { TypeCheck } from "../Types/Types.js";
import { clearDOM } from "../DOMManipulation/DOMclear.js";
import { DOMFetch } from "../DOMManipulation/DOMFetch.js";
import { insertDOM } from "../DOMManipulation/DOMInsert.js";
export class Filters {
    constructor() {
        this.postFilterStorage = [];
    }
    getFilters(statusFilter = '') {
        let locationFilter = document.getElementById('location');
        let departmentFilter = document.getElementById('department');
        let locationText = locationFilter.options[locationFilter.selectedIndex].text;
        let departmentText = departmentFilter.options[departmentFilter.selectedIndex].text;
        let filtersObj = {
            location: locationText,
            department: departmentText,
        };
        if (statusFilter.length > 0)
            filtersObj.status = statusFilter;
        return filtersObj;
    }
    applyFilters(filters, filterData, filteredCharacters = []) {
        if (filters.status)
            clearDOM.clear('index');
        else
            clearDOM.clear('roles');
        for (let ite = 0; ite < filterData.length; ite++) {
            let totalData = DOMFetch.fetchData(filterData[ite]);
            let filteredData = this.filteringData(totalData, filters, filteredCharacters);
            if (filteredData != null) {
                if (TypeCheck.instanceofEmployeeData(filteredData)) {
                    this.postFilterStorage.push(filteredData);
                }
                insertDOM.insertData(filteredData);
            }
        }
        if (this.postFilterStorage.length > 0)
            return this.postFilterStorage;
        else
            return [];
    }
    filteringData(totData, filterObjParam, filteredCharacters) {
        let filterObj = structuredClone(filterObjParam);
        if (TypeCheck.instanceofEmployeeData(totData)) {
            if (filterObj['status'] == 'Status') {
                filterObj['status'] = totData['onlineStatus'];
            }
        }
        if (filterObj['location'] == 'Location') {
            filterObj['location'] = totData['locat'];
        }
        if (filterObj['department'] == 'Department') {
            filterObj['department'] = totData['dept'];
        }
        if (this.filtersSame(totData, filterObj)) {
            if (TypeCheck.instanceofEmployeeData(totData)) {
                if (filteredCharacters.length > 0) {
                    if (filteredCharacters.indexOf(totData['name'][0].toUpperCase()) !== -1) {
                        return totData;
                    }
                    else {
                        return null;
                    }
                }
            }
            return totData;
        }
    }
    filtersSame(totData, filterObj) {
        let boolSame = filterObj['location'] == totData['locat'] &&
            filterObj['department'] == totData['dept'];
        if (TypeCheck.instanceofEmployeeData(totData)) {
            return boolSame && filterObj['status'] == totData['onlineStatus'];
        }
        return boolSame;
    }
}
