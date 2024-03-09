import { helper } from "../Helper/Helper.js";
class LoadEventListeners {

    innerCheckBoxesEventListener() {
        let innerCheckBoxes = document.querySelectorAll('.check-box');
        
        innerCheckBoxes.forEach((innerCheckBox) => {
            innerCheckBox.addEventListener('click', () => {
                helper.activateDelete();
            })
        })
    }

    ellipsesEventListener() {
        let ellipses: NodeListOf<HTMLElement> = document.querySelectorAll('.triple-dot') as NodeListOf<HTMLElement>;
       
        ellipses.forEach((ellipse: HTMLElement) => {
            ellipse.addEventListener('click', () => {
                ellipse.classList.toggle('active');
            })
        })
    }

    ellipsesEventListenerView() {
        let ellipseFViews: NodeListOf<HTMLElement> = document.querySelectorAll('.tt-view') as NodeListOf<HTMLElement>;
        
        ellipseFViews.forEach((ellipseFView) => {
            ellipseFView.addEventListener('click', () => {
                let empNo = ellipseFView.id
                empNo = empNo.replaceAll('-child', '')
                helper.viewEmpDetails(empNo);
            })
        })
    }

    ellipsesEventListenerEdit() {
        let ellipseFEdits: NodeListOf<HTMLElement> = document.querySelectorAll('.tt-edit') as NodeListOf<HTMLElement>;
        
        ellipseFEdits.forEach((ellipseFEdit) => {
            ellipseFEdit.addEventListener('click', () => {
                let empNo = ellipseFEdit.id
                empNo = empNo.replaceAll('-child2', '')
                helper.editEmpDetails(empNo);
            })
        })
    }

    editCardEventListener() {
        let editCardButtons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.a-edit-button') as NodeListOf<HTMLAnchorElement>;
        
        editCardButtons.forEach((editCardButton) => {
            editCardButton.addEventListener('click', () => {
                let cardID = editCardButton.id;
                cardID = cardID.replace('-child', '');
                helper.editCard(cardID)
            })
        })
    }

    viewEmployeesEventListener() {
        let viewEmpButtons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.a-view-employees') as NodeListOf<HTMLAnchorElement>;
        
        viewEmpButtons.forEach((viewEmpButton) => {
            viewEmpButton.addEventListener('click', () => {
                let cardID = viewEmpButton.id;
                cardID = cardID.replace('-child2', '');
                helper.loadViewEmployees(cardID);
            })
        })
    }

    cancelButtonEventListener(){
            let cButton:HTMLButtonElement = document.querySelector('.btn-cancel') as HTMLButtonElement;

            cButton.addEventListener('click' ,()=>{
                window.history.back();
            })
    }  
}

export let loadEventListener = new LoadEventListeners;