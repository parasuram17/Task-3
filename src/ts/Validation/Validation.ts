class Validation{

    isValid(emptyLabelInput:NodeListOf<Element>){
        let flags = this.validateSubmit(emptyLabelInput);

        if (flags.includes(true)) return false;

        if (!this.isvalidateEmail()) return false;
        if (!this.isvalidatePhNo()) return false;

        return true;

    }

    validateSubmit(emptyLabelInput:NodeListOf<Element>) {
        let flags = []

        for (let i = 0; i < emptyLabelInput.length; i++) {
            let emptyInput = emptyLabelInput[i].querySelector("input");

            if (emptyInput != null) {
                let requiredPrompt:HTMLElement = emptyLabelInput[i].querySelector('.visible-prompt') as HTMLElement;
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
        return flags
    }

    isvalidateEmail() {
        let inputField:HTMLElement = document.querySelector(".label-input-email") as HTMLElement;
        let inputFieldInput:HTMLInputElement = document.getElementById("input-email") as HTMLInputElement;

        let inputFieldValue = inputFieldInput.value;
        if (inputFieldValue.includes('@') == false) {

            let prompt: HTMLElement = document.getElementById('text-prompt') as HTMLElement;
            let visibility: HTMLElement = inputField.querySelector('.visible-prompt') as HTMLElement;
            let warningBox:HTMLElement = inputField.querySelector('.inpt-box') as HTMLElement;

            prompt.innerText = "enter valid email format";
            visibility.classList.add('active');
            warningBox.classList.add('active');

            return false;
        }
        return true;
    
    }

    isvalidatePhNo() {
        let inputField:HTMLElement = document.querySelector(".label-input-phno") as HTMLElement;
        let inputFieldInput:HTMLInputElement = document.getElementById("input-phno") as HTMLInputElement

        let inputFieldValue = inputFieldInput.value;
        if (isNaN(Number(inputFieldValue)) || inputFieldValue.length != 10) {

            let prompt: HTMLElement = document.getElementById('text-prompt2') as HTMLElement;
            let visibility: HTMLElement = inputField.querySelector('.visible-prompt') as HTMLElement;
            let warningBox:HTMLElement = inputField.querySelector('.inpt-box') as HTMLElement

            prompt.innerText = "enter a valid ph no";
            visibility.classList.add('active');
            warningBox.classList.add('active')

            return false;
        }
        return true;
    }

    validateCardForm(emptyInput:HTMLInputElement) {
        let requiredPrompt: HTMLElement = document.querySelector('.visible-prompt') as HTMLElement;
        let box: HTMLElement = document.querySelector(".inpt-box") as HTMLElement;
        
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