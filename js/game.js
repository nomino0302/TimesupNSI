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

var time = 80;

challenges = {
    "Mimez :": [
        "Vélo", "Pirate", "Violon", "Skate", "Hache", 'Chat', 'Chien', 'Voiture', 'Avion', 'Maison', 'Arbre', 'Téléphone', 'Ordinateur', 'Livre', 'Basketball',
        'Football', 'Natation', 'Musique', 'Danse', 'Rire', 'Pleurer', 'Dormir', 'Manger', 'Courir', 'Sauter', 'Écouter',
        'Regarder', 'Laver', 'Écrire', 'Cuisiner', 'Lecture', 'Peindre', 'Conduire', 'Voler', 'Nager', 'Jouer', 'Gagner',
        'Perdre', 'Étudier', 'Travailler', 'Chanter', 'Voyager', 'Découvrir', 'Aimer', 'Détester', 'Attendre', 'Réfléchir',
        'Aider', 'Sourire', 'Partager', 'Raconter', 'Rêver', 'Créer', 'Ranger', 'Nettoyer', 'Vêtements', 'Fleurs',
        'Montagne', 'Mer', 'Ciel', 'Étoile', 'Lune', 'Soleil', 'Pluie', 'Vent', 'Neige', 'Feu', 'Terre', 'Air', 'Eau',
        'Tigre', 'Lion', 'Girafe', 'Éléphant', 'Oiseau', 'Poisson', 'Papillon', 'Pique-nique', 'Carnaval', 'Lampe', 'Pingouin', 'Tourbillon', 'Aéroport', 'Piste de danse',
        'Pâtisserie', 'Sculpture sur glace', 'Bateau de croisière', 'Grenouille', 'Laboratoire', 'Jardin zen', 'Chasseur',
        'Plongée en apnée', 'Fleuriste', 'Éventail', 'Ballon', 'Girafe', 'Boussole', 'Cascade', 'Croissant', 'Dauphin', 'Épicerie', 'Fusée', 'Gazon',
        'Harmonica', 'Igloo', 'Jardin', 'Kangourou', 'Lanterne', 'Montgolfière', 'Nuage', 'Orque', 'Palmier', 'Quetzalcoatl',
        'Raquette', 'Souris', 'Tambour', 'Ukulele', 'Violon', 'Whisky', 'Xylophone', 'Yacht', 'Zèbre', 'Ananas', 'Biscuit',
        'Citronnelle', 'Dentifrice', 'Échelle', 'Flamant', 'Glace', 'Hérisson', 'Iguane', 'Jumelles', 'Ketchup', 'Limonade',
        'Miroir', 'Nénuphar', 'Orchidée', 'Pastèque', 'Quokka', 'Ruban', 'Serpent', 'Tortue', 'Umbrella', 'Violette', 'Whisky',
        'Xylophone', 'Yacht', 'Zéphyr', 'Alphabet', 'Bouteille', 'Chocolat', 'Dictionnaire', 'Énigme', 'Fenêtre', 'Globe',
        'Haltère', 'Imprimante', 'Jumelles', 'Kangourou', 'Lanterne', 'Marteau', 'Nourriture', 'Oiseau', 'Parapluie', 'Question',
        'Roue', 'Sifflet', 'Tambour', 'Ukulele', 'Vélo', 'Wagon', 'Xylophone', 'Yoyo', 'Zigzag', 'Alpinisme', 'Basketball',
        'Champignon', 'Déménagement', 'Escalade', 'Football', 'Gymnastique', 'Hockey', 'Imitation', 'Jardinage', 'Karaté', "Cantine"
    ],
    "Faites deviner en 1 brève description :" : [
        "Chat", "Fôret", "Entreprise", "Mathématiques", "Tennis", "Copain", 'Éléphant', 'Piano', 'Ballon', 'Cascade', 'Arc-en-ciel', 'Tigre', 'Château', 'Pirate', 'Robe', 'Surfer', 'Ours polaire',
        'Super-héros', 'Guitare', 'Dinosaure', 'Sirène', 'Chevalier', 'Fée', 'Clown', 'Randonnée', 'Théâtre', 'Échecs',
        'Magicien', 'Gymnastique', 'Sirène', 'Cowboy', 'Plongée sous-marine', 'Équitation', 'Astronaute', 'Cirque', 'Canyoning',
        'Explorateur', 'Peinture', 'Photographie', 'Sculpture', 'Cuisson', 'Jonglerie', 'Déménagement', 'Défilé de mode',
        'Safari', 'Camping', 'Vélo', 'Escalade', 'Pique-nique', "Saut à l'élastique", 'Ski', 'Plongée', 'Tennis', 'Volcan',
        'Pompier', 'Phare', "Parc d'attractions", 'Aquarium', 'Cascade', 'Pharaon', 'Poupée', 'Train', 'Explorateur', 'Plage',
        'Basketball', 'Rugby', 'Tambour', 'Football', 'Dentiste', 'Bibliothèque', 'Potier', 'Viking', 'Magasin', 'Jardinage',
        'Randonnée', 'Château de sable', 'Chasse au trésor', 'Parc', 'Exposition', 'Aqueduc', 'Observatoire', 'Labyrinthe',
        'Safari', 'Bateau', 'Cinéma', 'Microscope', 'Montgolfière', 'Pizza', 'Danse', 'Couture', 'Robot', 'Télévision',
        'Serpent', 'Tempête', 'Parapluie', 'Arcade', 'Zoo', 'Chalet', 'Sorcière', 'Acrobate', 'Pêche', 'Luge', 'Parachute',
        'Arc', 'Pluie', "Feu d'artifice", 'Train', 'Pom-pom girl', 'Bobsleigh', 'Spectacle de marionnettes', 'Désert',
        'Tunnel', 'Orque', 'Course', 'Cigogne', 'Princesse', 'Cirque', 'Saut à ski', 'Tempête de neige', 'Tour Eiffel', 'Banane', 'Dromadaire', 'Épée', 'Flamant', 'Hibou', 'Ile', 'Jongleur',
        'Kangourou', 'Lune', 'Montagne', 'Ninja', 'Oeuf', 'Papillon', 'Quiche', 'Renard', 'Saxophone', 'Tigre',
        'Unicorn', 'Violoncelle', 'Wagon', 'Xylophone', 'Yoga', 'Zèbre', 'Boussole', 'Coccinelle', 'Désert',
        'Écureuil', 'Flûte', 'Grenouille', 'Hamac', 'Iguane', 'Jungle', 'Koala', 'Loup', 'Nénuphar', "Géographie"
    ],
    "Faites deviner en 1 SEUL synonyme :" : [
        "Père", "Trésor", "Ordinateur", "Twitter", "Chaussure", "Télévision", 'Montre', 'Pirate', 'Cactus', 'Clown', 'Lion', 'Éclair', 'Cafard', 'Cigogne', 'Champignon', 'Kangourou',
        'Toupie', 'Microscope', 'Baleine', 'Poupée', 'Hélicoptère', 'Koala', 'Jonglage', 'Échecs', 'Piano', 'Bouteille',
        'Pingouin', 'Tortue', 'Crocodile', 'Bûcheron', 'Tunnel', 'Robot', 'Bateau', 'Plongée', 'Pirouette', 'Vent',
        'Vampire', 'Pompier', 'Serpent', 'Phare', 'Super-héros', 'Safari', 'Bulles', 'Arc-en-ciel', 'Karaté', 'Marteau',
        'Planète', 'Licorne', 'Puzzle', 'Snowboard', 'Caméléon', 'Dinosaure', 'Fakir', 'Libellule', 'Singe', 'Sombrero',
        'Grenouille', 'Magicien', 'Papillon', 'Planche à voile', 'Coccinelle', 'Hippopotame', 'Hérisson', 'Girafe', 'Bouée',
        'Canoë', 'Archer', 'Camping', 'Masque', 'Casque', 'Parapluie', 'Cuisine', 'Cheval', 'Danse', 'Explorateur',
        'Feu de camp', 'Cerf-volant', 'Chauve-souris', 'Acrobate', 'Fusée', 'Équitation', 'Kayak', 'Contorsionniste',
        'Hula hoop', 'Feuille', 'Poisson', 'Éventail', 'Cuisinier', 'Cycliste', 'Hamac', 'Jockey', 'Cascade', 'Yoga',
        'Escalade', 'Corde à sauter', 'Cliff diving', 'Bibliothèque', 'Sculpture', 'Patineur', 'Snowboarder', 'Saut en longueur',
        'Saut en hauteur', 'Plongée sous-marine', 'Jardinage', 'Rugby', 'Hockey', 'Volleyball', 'Plongeon', 'Apiculteur',
        'Lancer de javelot', 'Escrime', 'Jeu de quilles', 'Tennis de table', 'Saut en parachute', 'Danse du ventre', 'Ballet',
        'Marathon', 'Basketball', 'Boxe', 'Course de chevaux', 'Cirque', 'Golf', 'Lutte', "Wagon", "TGV", "Téléphone", "Langue", "Jeu", "Carte", "Terrain", "Vidéo"
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
