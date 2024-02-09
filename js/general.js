{
    let collapseButton = document.querySelector('#collapsing-button');
    let sideBar = document.querySelector('.sidebar');
    let body = document.querySelector('body')
    collapseButton.onclick = function(){
        sideBar.classList.toggle('active');
        body.classList.toggle('active');
    }
}