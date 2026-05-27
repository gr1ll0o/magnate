/// HTML ELEMENTS ///
let playersScoreDisplay = [
    document.getElementById('p1score'),
    document.getElementById('p2score'),
    document.getElementById('p3score'),
    document.getElementById('p4score')
];

let playersRoleDisplay = [
    document.getElementById('p1role'),
    document.getElementById('p2role'),
    document.getElementById('p3role'),
    document.getElementById('p4role')
];

let roundDisplay = document.getElementById('rounddisplay');
let nextRoundBtn = document.getElementById('nextroundbutton');

/// PLAYERS STATS ///
let playersScore = [0, 0, 0, 0];
let playersRole = ['-', '-', '-', '-']; 
let round = 1; // Rounds
let ruin = false; // Ruin control
let roles = ["MAGNATE", "RICO", "POBRE", "INDIG"];
let points = [30, 20, 10, 0];
let playedThisRound = [false, false, false, false];
let nextRole = 0; // Next role according to roles array

/// FUNCTIONS ///
function asignPointsAndRole(p) {
    let oldMagnate;
    switch(round) {
        case 1: /// RONDA 1 ///
            if (!playedThisRound[p]) {              
                playersScore[p] += points[nextRole];
                playersRole[p] = roles[nextRole];
                nextRole++;
                playersScoreDisplay[p].innerHTML = playersScore[p];
                playersRoleDisplay[p].innerHTML = playersRole[p];

                playedThisRound[p] = true;
            }
        break;

        case 2: case 3: /// RONDA 2 Y 3 ///
            oldMagnate = playersRole.indexOf("MAGNATE");
            if (!playedThisRound[p]) {              
                if (playersRole[p] != "MAGNATE" && nextRole == 0) {
                    // BANCARROTA
                    ruin = true;
                    playersRole[oldMagnate] = "INDIG";
                    playersRoleDisplay[oldMagnate].innerHTML = playersRole[oldMagnate];
                    playedThisRound[oldMagnate] = true;

                    // NEW MAGNATE
                    playersRole[p] = "MAGNATE";
                    playersScore[p] += 30;
                    playersRoleDisplay[p].innerHTML = playersRole[p];
                    playersScoreDisplay[p].innerHTML = playersScore[p];
                    playedThisRound[p] = true;
                    nextRole = 1;
                }else{
                    playersRole[p] = roles[nextRole];
                    playersScore[p] += points[nextRole];
                    playersRoleDisplay[p].innerHTML = playersRole[p];
                    playersScoreDisplay[p].innerHTML = playersScore[p];
                    nextRole++;
                }
                playedThisRound[p] = true;
            }
        break;
    }
}

function nextRound() {
    if (round < 3) {
        round++;
        nextRole = 0;
        ruin = false;
        playedThisRound = [false, false, false, false];
        roundDisplay.innerHTML = "RONDA " + round + "/3";
        nextRoundBtn.style.display = 'none';
    }else{
        roundDisplay.innerHTML = "PARTIDA TERMINADA!";
    }
}

/// SCRIPT ///
playersScoreDisplay.forEach((player, i) => {
    player.addEventListener('click', () => {
        asignPointsAndRole(i);
        if ((nextRole >= 3 && ruin) || (nextRole >= 4 && !ruin)) {
            nextRoundBtn.style.display = 'block';
        }
    });
});

nextRoundBtn.addEventListener('click', () => {
    nextRound();
});