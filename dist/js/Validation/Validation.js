class Validation {
    isValid(emptyLabelInput) {
        let flags = this.validateSubmit(emptyLabelInput);
        if (flags.includes(true))
            return false;
        if (!this.isvalidateEmail())
            return false;
        if (!this.isvalidatePhNo())
            return false;
        return true;
    }
    validateSubmit(emptyLabelInput) {
        let flags = [];
        for (let i = 0; i < emptyLabelInput.length; i++) {
            let emptyInput = emptyLabelInput[i].querySelector("input");
            if (emptyInput != null) {
                let requiredPrompt = emptyLabelInput[i].querySelector('.visible-prompt');
                if (emptyInput.value == "") {
                    requiredPrompt.classList.add('active');
                    emptyInput.classList.add('active');
                    flags.push(true);
                    continue;
                }
                else {
                    if (requiredPrompt != null) {
                        requiredPrompt.classList.remove('active');
                        emptyInput.classList.remove('active');
                    }
                }
                flags.push(false);
            }
        }
        return flags;
    }
    isvalidateEmail() {
        let inputField = document.querySelector(".label-input-email");
        let inputFieldInput = document.getElementById("input-email");
        let inputFieldValue = inputFieldInput.value;
        if (inputFieldValue.includes('@') == false) {
            let prompt = document.getElementById('text-prompt');
            let visibility = inputField.querySelector('.visible-prompt');
            let warningBox = inputField.querySelector('.inpt-box');
            prompt.innerText = "enter valid email format";
            visibility.classList.add('active');
            warningBox.classList.add('active');
            return false;
        }
        return true;
    }
    isvalidatePhNo() {
        let inputField = document.querySelector(".label-input-phno");
        let inputFieldInput = document.getElementById("input-phno");
        let inputFieldValue = inputFieldInput.value;
        if (isNaN(Number(inputFieldValue)) || inputFieldValue.length != 10) {
            let prompt = document.getElementById('text-prompt2');
            let visibility = inputField.querySelector('.visible-prompt');
            let warningBox = inputField.querySelector('.inpt-box');
            prompt.innerText = "enter a valid ph no";
            visibility.classList.add('active');
            warningBox.classList.add('active');
            return false;
        }
        return true;
    }
    validateCardForm(emptyInput) {
        let requiredPrompt = document.querySelector('.visible-prompt');
        let box = document.querySelector(".inpt-box");
        if (emptyInput.value == "") {
            requiredPrompt.classList.add('active');
            box.classList.add('active');
            return true;
        }
        else {
            requiredPrompt.classList.remove('active');
            box.classList.remove('active');
        }
        return false;
    }
}
export let checkValid = new Validation();
