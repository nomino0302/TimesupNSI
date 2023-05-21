<!DOCTYPE html>
<html lang="fr-fr">
<head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="assets/img/fav.png" type="image/png">
    <link rel="stylesheet" href="css/index-style.css">
    <title>Time's Up!</title>
</head>
<body>
    <div class="container">
        <header>
            <div id="left-rank" class="rank-box">
                <div class="rank-title">
                    <h2>Global</h2>
                </div>
                <div id="global" class="rank">
                    <?php
                        // Include the database connection file
                        include_once("php/config.php");

                        // Fetch scores (in descending order)
                        $scores = mysqli_query($mysqli, "SELECT * FROM scores ORDER BY pts DESC limit 50");
                        
                        $rank = 1;
                        foreach($scores as $row) {
                            echo '<div class="leader">
                            <div class="number"><p>'.$rank.'.</p></div>
                            <div class="avatar"><img src="'.$row["avatar"].'"></div>
                            <div class="player-name-rank"><p>'.$row["name"].'</p></div>
                            <div class="max-pts"><p>'.$row["pts"].' pts</p></div>
                            </div>';

                            $rank += 1;
                        }
                    ?>
                </div>
            </div>

            <div class="header-text">
                <div class="logo">
                    <img src="assets/img/fav.png" alt="Time's Up!">
                </div>
                <div class="credits">
                    <h3>Par Arnaud, Nathan, Youssef et Kamil</h3>
                </div>
            </div>

            <div id="right-rank" class="rank-box">
                <div class="rank-title">
                    <h2>Session</h2>
                </div>

                <div id="session" class="rank">

                </div>
            </div>
        </header>

        <div class="input-zone">
            <div class="input-form">
                <?php
                    $files = glob("assets/img/avatars/*.png");
                    $file = array_rand($files);
                    echo '<img id="avatar-player" src="'.$files[$file].'">';
                ?>
                <input type="text" id="player-name" placeholder="Nom du joueur" maxlength="20">
            </div>
        </div>
        <div class="button-zone">
            <button type="button" id="play">Jouer</button>
        </div>
    </div>

    <script src="js/index.js"></script>
</body>
</html>