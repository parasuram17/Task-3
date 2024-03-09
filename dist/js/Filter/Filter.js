import { clearDOM } from "../DOMManipulation/DOMclear.js";
import { DOMFetch } from "../DOMManipulation/DOMFetch.js";
export class Filters {
    constructor(postFilterStorage, empData, filteredCharacters) {
        this.postFilterStorage = postFilterStorage;
    }
    getFilters() {
        postFilterStorage = [];
        let statusFilter = document.getElementById('status');
        let locationFilter = document.getElementById('location');
        let departmentFilter = document.getElementById('department');
        let statusText = statusFilter.options[statusFilter.selectedIndex].text;
        let locationText = locationFilter.options[locationFilter.selectedIndex].text;
        let departmentText = departmentFilter.options[departmentFilter.selectedIndex].text;
        let filtersObj = {
            status: statusText,
            location: locationText,
            department: departmentText,
        };
        this.applyingFilters(filtersObj);
    }
    applyingFilters(filters) {
        clearDOM.clear('index');
        for (let ite = 0; ite < empData.length; ite++) {
            let totalData = DOMFetch.fetchData(empData[ite]);
            let filteredData = this.filteringData(totalData, filters);
            if (filteredData != null) {
                postFilterStorage.push(filteredData);
                insertDOM.insertData(filteredData);
            }
        }
    }
    filteringData(totData, filterObjParam) {
        let filterObj = structuredClone(filterObjParam);
        if (filterObj['status'] == 'Status') {
            filterObj['status'] = totData['onlineStatus'];
        }
        if (filterObj['location'] == 'Location') {
            filterObj['location'] = totData['loc'];
        }
        if (filterObj['department'] == 'Department') {
            filterObj['department'] = totData['dept'];
        }
        if (this.filtersSame(totData, filterObj)) {
            if (filteredCharacters.length > 0) {
                if (filteredCharacters.indexOf(totData['name'][0].toUpperCase()) !== -1) {
                    return totData;
                }
                else {
                    return null;
                }
            }
            return totData;
        }
    }
    filtersSame(totData, filterObj) {
        return filterObj['status'] == totData['onlineStatus'] &&
            filterObj['location'] == totData['loc'] &&
            filterObj['department'] == totData['dept'];
    }
}
