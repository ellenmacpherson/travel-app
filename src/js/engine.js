let mainNav = document.getElementById('nav-ul');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
    console.log(mainNav.classList)
    mainNav.classList.toggle('active');
});