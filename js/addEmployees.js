let emptyLabelInput = document.querySelectorAll(".label-input");
for(let i = 0 ;i<emptyLabelInput.length;i++){
    let emptyInput = emptyLabelInput[i].querySelector("input");
    if(emptyInput != null ){
        emptyInput.addEventListener('blur', f =>{
            let requiredPrompt = emptyLabelInput[i].querySelector('.visible-prompt');
            if (emptyInput.value ==""){
                requiredPrompt.classList.add('active');
            }
            else{
                requiredPrompt.classList.remove('active');
            }
        })
    }
}

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

let toastNotificationContainer = document.querySelector('#toaster-notification')
function showToastNotification(msg){
    let message = document.createElement('div');
    if(msg == 'success'){
        message.classList.add('toast-success')
        message.innerHTML = 
        `
        <div class = "success-failure-message">
            <div class = "tick-message">
                <div>
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <div>
                    <p class="message-head-success">Success</p>
                    <p class="message-desc-success">Employee has been added</p>
                </div>
                </div>
            <span class="material-symbols-outlined green-x">close</span> 
        </div>
        `;
    }
    if(msg == 'failure'){
        message.classList.add('toast-failure');
        message.innerHTML =
        `
        <div class = "success-failure-message">
            <div class = "tick-message">
                <div>
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <div>
                    <p class="message-head-failure">Failure</p>
                    <p class="message-desc-failure">Enter Unique IDs</p>
                </div>
                </div>
            <span class="material-symbols-outlined red-x">close</span> 
        </div>
        `;
    }
    toastNotificationContainer.appendChild(message);

    setTimeout(()=>{
        message.remove();
    },3000);

}

function cancelButton(){
    window.location.href="index.html";
}

const defaultUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQACWAJYAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAMgAyAMBIgACEQEDEQH/xAAwAAEBAAMBAQEAAAAAAAAAAAAABQIDBAEGBwEBAQEBAAAAAAAAAAAAAAAAAAECA//aAAwDAQACEAMQAAAA/XxrmAAAAAAAAAAAAAAAAAdnVNSVnAkuzjsBAAAAAAAAMq2PVnYKA5+gQca0m4CwAAAAABu090tITYAACLam2cIuAAAAAAHfwdUtYTYAACdRkpyjWAAAAAAHvhbmyPXzr0KAPDCJv57gLAAAAAAAG7SWx0fP5y3UTArTdJAsAAAAAAAMu6WfurbGpeygODygiXptK+fXOJOBljcgAAAAOn2rNY5k0AAAABhLr+JAdXLrIIAA2a6UvZkTYAAAAAAGMW5w2TRcAALMa5NbBNAAAAAAANO7WQxrAIAuQ7k3sEoAAAAAADXs1kMawCALhN7BKAAAAAAA1hDGsAn/xAA3EAACAQEDCAkCBQUAAAAAAAABAgMEABExBRIgITBAQVETIjI0YXFyobFTkRQjYoGCEBVSYNH/2gAIAQEAAT8A/wBUAJNwBJ5C0WT3cXyHMHLE2SggXFS3mbfhIPpLZ8nwNgCp8DaXJ8iAmM545YGxBBuIuPLco42kcIovJtT0qQLfi/FtKopUnXk/BrSI0blHFxG40VP0MWcw67e2wrafpYs5R111+Y3Clj6WoVTgNZ2VVH0VQwGB1jb5NX8yRuQA2WUl/MjbmCNvkw65B5bLKR1xjwO3oHzKi44MLtlXvn1N3+Iu26sVYMMQbxaGQSxK44+2wmlEMTOeGHjYksxY4k3ncKSpMD3G8ocfDxsrB1DKQQcCNJmCqWY3AYm1XUmd7hqQYblBUyQHVrXiptFWRS6s7Nbk39cLS1kMV4zs5uS2nqZJzrNy8FG6rLInZdh5G34qf6rfezSSP2nY+Z3TE3WSlnfCMgczqsuTpD2nUe9hk3nL9lt/bV+q32scmDhL91s2TpB2XU+1npZ0xjJHMa7YG47dEeRs1FLHwtDk7jK38RaOGOIdRAP22EkEco66A+N1pcncYm/i3/bOjRtmupB8dpTUjTdZtSc+do4kiXNQADaSRJKua4vFqmkaDrL1k58tlR0vTHPfsD3sAALhtiARccLVlL0Jz07B9thDEZpVQfueQsiBFCqLgBcNwdA6lWF4Oo2miMMrIeGB5jTydEAjSHEm4eW5ZRjvRZBiNR8tOlXNpox+m/cqtc6lkH6b9ODu8fpHxuU/d5PSdODu8fpHxuU/d5PSfjTg7vH6R8blP3eT0n404O7x+kfG5T93k9J+ND//xAAZEQADAQEBAAAAAAAAAAAAAAABETAAIED/2gAIAQIBAT8A8Tz9gqKiSyyk8888+3QxHBqamn//xAAbEQEAAwEAAwAAAAAAAAAAAAABESAwABIxQP/aAAgBAwEBPwD4o6Mwo4FXAq+sRouQ95cuUdB0HR0XC6TUxaGpqaf/2Q==";
const empForm = document.querySelector(".form-employee");
empForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const empFormData = new FormData(empForm);
    const empFormDataObject = Object.fromEntries(empFormData);
    if(empFormDataObject['profile picture']['name']==''){
        empFormDataObject['profile picture'] = defaultUrl;
    }
    else{
        empFormDataObject['profile picture'] = globalurl;
    }
    const exists = localStorage.getItem("employeeData");
    if (exists == null) {
        const jsonString = JSON.stringify([empFormDataObject]);
        localStorage.setItem("employeeData", jsonString);
        showToastNotification('success');
    }
    else {
        const existingData = localStorage.getItem("employeeData");
        const existingDataArray = JSON.parse(existingData);
        for (let i = 0; i < existingDataArray.length; i++) {
            if (existingDataArray[i]['Emp no'] == empFormDataObject['Emp no'] ||
                existingDataArray[i]['Email ID'] == empFormDataObject['Email ID']) {
                showToastNotification('failure')
                return;
            }
        }
        existingDataArray.push(empFormDataObject);
        const jsonString = JSON.stringify(existingDataArray);
        localStorage.setItem("employeeData", jsonString);
        showToastNotification('success');
    }
    // window.location.href = "index.html";
    empForm.reset();

})
