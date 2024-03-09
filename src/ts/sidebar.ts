class Sidebar {
    collapseButton: HTMLElement;
    sideBar: HTMLElement;
    body: HTMLElement;
    
    constructor(collapseButton: HTMLElement, sideBar: HTMLElement, body: HTMLElement) {
        this.collapseButton = collapseButton;
        this.sideBar = sideBar;
        this.body = body;
    }

    collapseSidebar() {
        collapseButton.addEventListener('click', () => {
            sideBar.classList.toggle('active');
            body.classList.toggle('active');
            let storageCollapse = localStorage.getItem("sidebarCollapse")
            if (storageCollapse) {
                let sc = JSON.parse(storageCollapse);
                sc = !sc
                localStorage.setItem("sidebarCollapse", JSON.stringify(sc));
            }
            else {
                localStorage.setItem("sidebarCollapse", JSON.stringify(true));
            }
        })
    }

    isSidebarCollapsed() {
        let storageCollapse = localStorage.getItem("sidebarCollapse");
        if (storageCollapse == "true") {
            sideBar.classList.add('active');
            body.classList.add('active');
        }
        else {
            sideBar.classList.remove('active');
            body.classList.remove('active');
        }

    }
}
let collapseButton: HTMLElement = document.querySelector('#collapsing-button') as HTMLElement;
let sideBar: HTMLElement = document.querySelector('.sidebar') as HTMLElement;
let body: HTMLElement = document.querySelector('body') as HTMLElement;

let s1 = new Sidebar(collapseButton, sideBar, body);
s1.collapseSidebar()
s1.isSidebarCollapsed() 
