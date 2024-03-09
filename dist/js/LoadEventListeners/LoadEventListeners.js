import { helper } from "../Helper/Helper.js";
class LoadEventListeners {
    innerCheckBoxesEventListener() {
        let innerCheckBoxes = document.querySelectorAll('.check-box');
        innerCheckBoxes.forEach((innerCheckBox) => {
            innerCheckBox.addEventListener('click', () => {
                helper.activateDelete();
            });
        });
    }
    ellipsesEventListener() {
        let ellipses = document.querySelectorAll('.triple-dot');
        ellipses.forEach((ellipse) => {
            ellipse.addEventListener('click', () => {
                ellipse.classList.toggle('active');
            });
        });
    }
    ellipsesEventListenerView() {
        let ellipseFViews = document.querySelectorAll('.tt-view');
        ellipseFViews.forEach((ellipseFView) => {
            ellipseFView.addEventListener('click', () => {
                let empNo = ellipseFView.id;
                empNo = empNo.replaceAll('-child', '');
                helper.viewEmpDetails(empNo);
            });
        });
    }
    ellipsesEventListenerEdit() {
        let ellipseFEdits = document.querySelectorAll('.tt-edit');
        ellipseFEdits.forEach((ellipseFEdit) => {
            ellipseFEdit.addEventListener('click', () => {
                let empNo = ellipseFEdit.id;
                empNo = empNo.replaceAll('-child2', '');
                helper.editEmpDetails(empNo);
            });
        });
    }
    editCardEventListener() {
        let editCardButtons = document.querySelectorAll('.a-edit-button');
        editCardButtons.forEach((editCardButton) => {
            editCardButton.addEventListener('click', () => {
                let cardID = editCardButton.id;
                cardID = cardID.replace('-child', '');
                helper.editCard(cardID);
            });
        });
    }
    viewEmployeesEventListener() {
        let viewEmpButtons = document.querySelectorAll('.a-view-employees');
        viewEmpButtons.forEach((viewEmpButton) => {
            viewEmpButton.addEventListener('click', () => {
                let cardID = viewEmpButton.id;
                cardID = cardID.replace('-child2', '');
                helper.loadViewEmployees(cardID);
            });
        });
    }
    cancelButtonEventListener() {
        let cButton = document.querySelector('.btn-cancel');
        cButton.addEventListener('click', () => {
            window.history.back();
        });
    }
}
export let loadEventListener = new LoadEventListeners;
