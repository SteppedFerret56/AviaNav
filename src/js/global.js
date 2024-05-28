async function getApiResponse() {
    try {
        const response = await fetch('https://my-app.flynnjacob42.workers.dev/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

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

function utcTime() {
    const utcTimeText = document.querySelector('.utcTime');

    let utcString = new Date().toUTCString();
    let utcTime = utcString.substring(17, 25);
    utcTimeText.textContent = `UTC: ${utcTime}`;
}

setInterval(utcTime, 1000);