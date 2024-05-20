function openNavmenu() {
    document.querySelector(".sideNavContainer").style.width = "250px";
}

function closeNavMenu() {
    document.querySelector(".sideNavContainer").style.width = "0";
}

document.addEventListener('click', function(event) {
    const sideNavContainer = document.querySelector(".sideNavContainer");
    const sideNavMenuIcon = document.querySelector(".sideNavMenuIcon");
    if (event.target !== sideNavMenuIcon && sideNavContainer.style.width === "250px") {
        closeNavMenu();
    }
});