
let profilePicture = document.getElementById("profile-picture");
let inputPicture = document.getElementById("input-file")
inputPicture.onchange = () => {
    profilePicture.src = URL.createObjectURL(inputPicture.files[0]);
}

let globalurl;
const profilePic = document.getElementById('input-file');
profilePic.addEventListener('change', () => {
    const fr = new FileReader();
    fr.readAsDataURL(profilePic.files[0]);
    fr.addEventListener('load', () => {
        let url = fr.result;
        globalurl = url

    });
})

const empForm = document.querySelector(".form-employee");
empForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const empFormData = new FormData(empForm);
    const empFormDataObject = Object.fromEntries(empFormData);
    empFormDataObject['profile picture'] = globalurl;
    const exists = localStorage.getItem("employeeData");
    if (exists == null) {
        const jsonString = JSON.stringify([empFormDataObject]);
        localStorage.setItem("employeeData", jsonString);
        alert("added successfully");
    }
    else {
        const existingData = localStorage.getItem("employeeData");
        const existingDataArray = JSON.parse(existingData);
        for (let i = 0; i < existingDataArray.length; i++) {
            if (existingDataArray[i]['Emp no'] == empFormDataObject['Emp no'] ||
                existingDataArray[i]['Email ID'] == empFormDataObject['Email ID']) {
                alert("enter unique email or emp no");
                return;
            }
        }
        existingDataArray.push(empFormDataObject);
        const jsonString = JSON.stringify(existingDataArray);
        localStorage.setItem("employeeData", jsonString);
        alert("added successfully");
    }
    window.location.href = "index.html";
})