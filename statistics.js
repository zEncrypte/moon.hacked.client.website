const spinnerTotalUsers = document.getElementsByClassName("loadingTotalUsers")[0];
const spinnerLast24hrs = document.getElementsByClassName("loadingLast24hrs")[0];
const spinnerUsersOnline = document.getElementsByClassName("loadingCurrentUsers")[0];

const totalUsersDiv = document.getElementById("textTotalUsers");
const last24hrsDiv = document.getElementById("text24hrs");
const totalUsersOnline = document.getElementById("textCurrentUsers");

window.onload = function () {
    let stats = new XMLHttpRequest();
    stats.open("GET", "https://protection.moonx.gg/api/v1/statistics", true);

    stats.onload = function (e) {
        if (stats.readyState === 4 && stats.status === 200) {
            const parsedElement = JSON.parse(stats.responseText);
            totalUsersDiv.innerHTML = parsedElement.total;
            last24hrsDiv.innerHTML = parsedElement.loginsLastDay;
            spinnerLast24hrs.id = "displayHide";
            spinnerTotalUsers.id = "displayHide";
        }
    };

    stats.onerror = function (e) {
        totalUsersDiv.innerHTML = "Unavailable";
        last24hrsDiv.innerHTML = "Unavailable";
        spinnerLast24hrs.id = "displayHide";
        spinnerTotalUsers.id = "displayHide";
    };

    stats.send();

    let users = new XMLHttpRequest();
    users.open("GET", "https://irc-api.moonclient.xyz/api/v1/users/count", true);

    users.onload = function (e) {
        if (users.readyState === 4 && users.status === 200) {
            const parsedElement = JSON.parse(users.responseText);
            totalUsersOnline.innerHTML = parsedElement.count;
            spinnerUsersOnline.id = "displayHide";
        }
    };

    users.onerror = function (e) {
        totalUsersOnline.innerHTML = "Unavailable";
        spinnerUsersOnline.id = "displayHide";
    };

    users.send();
}

if (window.location.protocol.indexOf('https') === 0) {
    let el = document.createElement('meta')
    el.setAttribute('http-equiv', 'Content-Security-Policy')
    el.setAttribute('content', 'upgrade-insecure-requests')
    document.head.append(el)
}