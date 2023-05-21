// Variable sessionStorage
sessionStorage.removeItem("player");
var sessionRank = JSON.parse(sessionStorage.getItem("sessionRank"));
var sessionDiv = document.getElementById("session");
var rankOfSession = 1;
if (sessionRank !== null) {
    sessionRank.sort((a, b) => {return b["pts"] - a["pts"]}); // Tri décroissant
    sessionRank.forEach((elt) => {
        sessionDiv.innerHTML += `
        <div class="leader">
            <div class="number"><p>${rankOfSession}.</p></div>
            <div class="avatar"><img src="${elt["avatar"]}"></div>
            <div class="player-name-rank"><p>${elt["name"]}</p></div>
            <div class="max-pts"><p>${elt["pts"]} pts</p></div>
        </div>
        `;
        rankOfSession++;
    })
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

// Events pour commencer la partie
var playButton = document.getElementById("play");
var playerName = document.getElementById("player-name");
var playerAvatar = document.getElementById("avatar-player");

playButton.addEventListener("click", () => {
    if (playerName.value !== "") {
        var player = {name: playerName.value, avatar: playerAvatar.getAttribute("src"), pts: 0};
        sessionStorage.setItem("player", JSON.stringify(player));
        location.href = "game.html";
    }
});
