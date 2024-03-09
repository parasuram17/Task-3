import { Images } from './constants.js';
let AVATAR_IMAGE_URL = Images.AVATAR_IMAGE_URL;
let DEFAULT_IMAGE_URL = Images.DEFAULT_IMAGE_URL;
let OTHER_IMAGE_URL = Images.OTHER_IMAGE_URL;
(function () {
    let emp1 = {
        "Assign Manager": "Select",
        "Assign Project": "Select",
        "DOB": "2024-02-21",
        "Department": "UX/UI",
        "Email ID": "andre.onana@tezo.com",
        "Emp no": "TZ002341",
        "First Name": "Andre",
        "Job Title": "Customer Service Manager",
        "Join Date": "2024-02-21",
        "Last Name": "Onana",
        "Location": "Hyderabad",
        "Phone no": "9999999999",
        "profile picture": AVATAR_IMAGE_URL,
    };
    let emp2 = {
        "Assign Manager": "Select",
        "Assign Project": "Select",
        "DOB": "2024-02-21",
        "Department": "Product Engg.",
        "Email ID": "diogo.dalot@tezo.com",
        "Emp no": "TZ002342",
        "First Name": "Diogo",
        "Job Title": "Ux Designer",
        "Join Date": "2024-02-21",
        "Last Name": "Dalot",
        "Location": "Delhi",
        "Phone no": "9999999999",
        "profile picture": DEFAULT_IMAGE_URL,
    };
    let emp3 = {
        "Assign Manager": "Select",
        "Assign Project": "Select",
        "DOB": "2024-02-21",
        "Department": "UX/UI",
        "Email ID": "rafael.varane@tezo.com",
        "Emp no": "TZ002343",
        "First Name": "Rafael",
        "Job Title": "Assistant Backend Developer",
        "Join Date": "2024-02-21",
        "Last Name": "Varane",
        "Location": "Bangalore",
        "Phone no": "9999999999",
        "profile picture": OTHER_IMAGE_URL,
    };
    let emp4 = {
        "Assign Manager": "Select",
        "Assign Project": "Select",
        "DOB": "2024-02-21",
        "Department": "UX/UI",
        "Email ID": "licha.martinez@tezo.com",
        "Emp no": "TZ002344",
        "First Name": "Lisandro",
        "Job Title": "Customer Service Manager",
        "Join Date": "2024-02-21",
        "Last Name": "Martinez",
        "Location": "Hyderabad",
        "Phone no": "9999999999",
        "profile picture": AVATAR_IMAGE_URL,
    };
    let emp5 = {
        "Assign Manager": "Select",
        "Assign Project": "Select",
        "DOB": "2024-02-21",
        "Department": "UX/UI",
        "Email ID": "luke.shaw@tezo.com",
        "Emp no": "TZ002345",
        "First Name": "Luke",
        "Job Title": "Front End Developer",
        "Join Date": "2024-02-21",
        "Last Name": "Shaw",
        "Location": "Bangalore",
        "Phone no": "9999999999",
        "profile picture": AVATAR_IMAGE_URL,
    };
    let emp6 = {
        "Assign Manager": "Select",
        "Assign Project": "Select",
        "DOB": "2024-02-21",
        "Department": "UX/UI",
        "Email ID": "bruno.fernandes@tezo.com",
        "Emp no": "TZ002346",
        "First Name": "Bruno",
        "Job Title": "Human Resource Manager",
        "Join Date": "2024-02-21",
        "Last Name": "Fernandes",
        "Location": "Delhi",
        "Phone no": "9999999999",
        "profile picture": DEFAULT_IMAGE_URL,
    };
    let role1 = {
        "Department": "IT",
        "Description": "",
        "Location": "Hyderabad",
        "Role Name": "Customer Service Manager",
        "imgArray": ["TZ002341", "TZ002344"]
    };
    let role2 = {
        "Department": "Product Engg.",
        "Description": "",
        "Location": "Hyderabad",
        "Role Name": "Ux Designer",
        "imgArray": ["TZ002342"]
    };
    let role3 = {
        "Department": "UX/UI",
        "Description": "",
        "Location": "Hyderabad",
        "Role Name": "Assistant Backend Developer",
        "imgArray": ["TZ002343"]
    };
    let role4 = {
        "Department": "IT",
        "Description": "",
        "Location": "Hyderabad",
        "Role Name": "Human Resource Manager",
        "imgArray": ["TZ002346"]
    };
    let role5 = {
        "Department": "Product Engg.",
        "Description": "",
        "Location": "Hyderabad",
        "Role Name": "Front End Developer",
        "imgArray": ["TZ002345"]
    };
    let role6 = {
        "Department": "UX/UI",
        "Description": "",
        "Location": "Hyderabad",
        "Role Name": "Senior Developer",
        "imgArray": []
    };
    let allRoles = [role1, role2, role3, role4, role5, role6];
    let allEmployees = [emp1, emp2, emp3, emp4, emp5, emp6];
    if (!localStorage.getItem('employeeData'))
        localStorage.setItem('employeeData', JSON.stringify(allEmployees));
    if (!localStorage.getItem('roleData'))
        localStorage.setItem('roleData', JSON.stringify(allRoles));
})();
