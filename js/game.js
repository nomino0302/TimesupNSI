var debug = false;

var player = sessionStorage.getItem("player");
if (player === null && !debug) {
    location.href = "index.php";
} else if (debug) {
    player = {name: "Arnaud", avatar: "assets/img/avatars/Robot_Avatars_13.png", pts: 0};
} else {
    player = JSON.parse(player);
}

var timePlace = document.getElementById("time");
var avatarPlace = document.getElementById("avatar-info");
var namePlace = document.getElementById("name-info");
var ptsPlace = document.getElementById("pts");
var consignePlace = document.getElementById("consigne");
var motPlace = document.getElementById("mot");
var foundButton = document.getElementById("found");
var passButton = document.getElementById("pass");

var time = 5;

challenges = {
    "Mimez :": [
        "Chien", "Vélo", "Pirate", "Violon", "Skate", "Hache"
    ],
    "Faites deviner en 1 brève description :" : [
        "Chat", "Fôret", "Entreprise", "Mathématiques", "Tennis", "Copain"
    ],
    "Faites deviner en 1 SEUL synonyme :" : [
        "Père", "Trésor", "Ordinateur", "Twitter", "Chaussure", "Télévision"
    ]
};
var tempChallenges = {};
var pattern = Object.keys(challenges)
pattern.forEach((elt) => {
    tempChallenges[elt] = [];
});
var beforeChange = 5

// Initial render
timePlace.innerText = time;
avatarPlace.setAttribute("src", player["avatar"]);
namePlace.innerText = player["name"];
ptsPlace.innerText = player["pts"];

function decreaseTimer() {
    if (time > 0) {
        time--;
    } else {
        if (!debug) {
            sessionStorage.setItem("player", JSON.stringify(player));
            location.href = "results.php";
        } else {
            console.log(player);
            clearInterval(interID);
        }
    }

    timePlace.innerText = time;
}

function choseChallenge() {
    if (beforeChange <= 0) {
        pattern.push(pattern.shift());
        beforeChange = 5;
    }
    beforeChange--;

    var valConsigne = pattern[0];
    if (challenges[valConsigne].length === 0) {
        challenges[valConsigne] = tempChallenges[valConsigne];
        tempChallenges[valConsigne] = [];
    }

    var indMot = Math.floor(Math.random() * challenges[valConsigne].length);
    var valMot = challenges[valConsigne][indMot];

    challenges[valConsigne].splice(indMot, 1);
    tempChallenges[valConsigne].push(valMot);

    return {consigne: valConsigne, mot: valMot};
}

function refreshUI(challengeKeyValue) {
    ptsPlace.innerText = player["pts"];
    consignePlace.innerText = challengeKeyValue.consigne;
    motPlace.innerText = challengeKeyValue.mot;
}

foundButton.addEventListener("click", () => {
    player["pts"]++;
    refreshUI(choseChallenge());
});

passButton.addEventListener("click", () => {
    refreshUI(choseChallenge());
});

refreshUI(choseChallenge());
var interID = setInterval(decreaseTimer, 1000);
