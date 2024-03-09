class Toaster {
    showToastNotification(msg) {
        let toastNotificationContainer = document.querySelector('#toaster-notification');
        let message = document.createElement('div');
        if (msg == 'success') {
            message.classList.add('toast-success');
            message.innerHTML =
                `
            <div class = "success-failure-message">
                <div class = "tick-message">
                    <div><i class="fa-solid fa-circle-check"></i></div>
                    <div>
                        <p class="message-head-success">Success</p>
                        <p class="message-desc-success">Employee has been added</p>
                    </div>
                </div>
                <span class="material-symbols-outlined green-x">close</span> 
            </div>
            `;
        }
        if (msg == 'failure') {
            message.classList.add('toast-failure');
            message.innerHTML =
                `
            <div class = "success-failure-message">
                <div class = "tick-message">
                    <div><i class="fa-solid fa-circle-check"></i></div>
                    <div>
                        <p class="message-head-failure">Failure</p>
                        <p class="message-desc-failure">Employee with same ID already exists!</p>
                    </div>
                </div>
                <span class="material-symbols-outlined red-x">close</span> 
            </div>
            `;
        }
        toastNotificationContainer.appendChild(message);
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}
export let displayToaster = new Toaster();
