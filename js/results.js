var debug = false;
var nbMaxGlobal = "100+";

// Variable sessionStorage
var player = JSON.parse(sessionStorage.getItem("player"));
if (player === null && !debug) {
    location.href = "index.php";
} else if (debug) {
    player = {name: "Arnaud", avatar: "assets/img/avatars/Robot_Avatars_13.png", pts: 10};
}

var sessionRank = JSON.parse(sessionStorage.getItem("sessionRank"));
var sessionDiv = document.getElementById("session");
var rankOfSession = 1;

var playerRankSession;

if (sessionRank === null) {
    sessionRank = [];
}
// Checking player's position in session
var lastSessionRank = sessionRank.slice();
sessionRank.push(player);
sessionRank.sort((a, b) => {return b["pts"] - a["pts"]}); // Tri décroissant
var playerRankSession = sessionRank.indexOf(player) + 1;

lastSessionRank.sort((a, b) => {return b["pts"] - a["pts"]});
lastSessionRank.forEach((elt) => {
    sessionDiv.innerHTML += `
    <div class="leader">
        <div class="number"><p>${rankOfSession}.</p></div>
        <div class="avatar"><img src="${elt["avatar"]}"></div>
        <div class="player-name-rank"><p>${elt["name"]}</p></div>
        <div class="max-pts"><p>${elt["pts"]} pts</p></div>
    </div>
    `;
    rankOfSession++;
});

// Checking player's position in global
var playerRankGlobal;
var globalRankDiv = document.getElementById("global");
var leadersGlobal = globalRankDiv.getElementsByClassName("leader");
var posPts = []
for (let i=0; i < leadersGlobal.length; i++) {
    var pos = leadersGlobal[i].getElementsByClassName("number")[0].innerText;
    pos = parseInt(pos.replace(".", ""));
    var pts = leadersGlobal[i].getElementsByClassName("max-pts")[0].innerText;
    pts = parseInt(pts.replace(" pts", ""));
    posPts.push([pos, pts]);
    if (player["pts"] >= pts) {
        playerRankGlobal = pos;
        break;
    }
}
if (typeof(playerRankGlobal) === 'undefined') {
    if (posPts[posPts.length - 1][0] < 50) {
        playerRankGlobal = posPts[posPts.length - 1][0] + 1
    } else {
        playerRankGlobal = nbMaxGlobal;
    }
}

// Met de la couleur aux classements
var ranks = document.getElementsByClassName("rank");
for (let i = 0; i < ranks.length; i++) {
    var rank = 1;
    var leaders = ranks[i].getElementsByClassName("leader");
    for (let j = 0; j < leaders.length; j++) {
        var place = "";
        if (rank === 1) {
            place = "first";
        } else if (rank === 2) {
            place = "second";
        } else if (rank === 3) {
            place = "third";
        } else {
            place = "other";
        }
        leaders[j].getElementsByClassName("number")[0].classList.add(place);
        leaders[j].getElementsByClassName("max-pts")[0].classList.add(place);
        rank++;
    }
}

// On change les placeholders
var placePts = document.getElementById("pts");
var placeGlobal = document.getElementById("class-global");
var placeSession = document.getElementById("class-session");

placePts.innerText = player["pts"];
placeGlobal.innerText = playerRankGlobal;
placeSession.innerText = playerRankSession;

function createCookie(name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    else {
      expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

var continueButton = document.getElementById("continue");
continueButton.addEventListener("click", () => {
    sessionStorage.setItem("sessionRank", JSON.stringify(sessionRank));

    createCookie("player", JSON.stringify(player), "10");

    location.href = "save-results.php";
    //location.href = "index.php";
});
