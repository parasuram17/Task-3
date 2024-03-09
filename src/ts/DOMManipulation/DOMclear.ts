class DOMClear{
    clear(callingPage:string){
        let selectedDOM:NodeListOf<HTMLElement>;
        
        if(callingPage == 'index'){
            selectedDOM = document.querySelectorAll('.table-rows');
        }

        else{
            selectedDOM = document.querySelectorAll('.c1');
        }

        for (let i of selectedDOM) {
            i.remove();
        }
    }
}
export let clearDOM = new DOMClear()
