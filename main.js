/// HTML ELEMENTS ///
let playersBoxDisplay = [
    document.getElementById('p1box'),
    document.getElementById('p2box'),
    document.getElementById('p3box'),
    document.getElementById('p4box')
];

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

/// SOUNDS ///
let effectAudio = document.getElementById('effect');
let selectAudio = document.getElementById('select');

/// PLAYERS STATS ///
let playersScore = [0, 0, 0, 0];
let playersRole = ['-', '-', '-', '-']; 
let round = 1; // Rounds
let ruin = false; // Ruin control
let roles = ["MAGNATE", "RICO", "POBRE", "INDIG"];
let points = [30, 20, 10, 0];
let playedThisRound = [false, false, false, false];
let ruinedPlayer = -1;
let oldMagnate;
let oldIndig;
let nextRole = 0; // Next role according to roles array

/// FUNCTIONS ///
function updatePlayerColor(p) {
    // Reset default
    playersScoreDisplay[p].style.color = '#fff';
    playersRoleDisplay[p].style.color = '#fff';
    // Magnate
    if (playersRole[p] == "MAGNATE") {
        playersScoreDisplay[p].style.color = '#ff0';
        playersRoleDisplay[p].style.color = '#ff0';
    }
    if (p == ruinedPlayer) {
        playersScoreDisplay[p].style.color = '#707070';
        playersRoleDisplay[p].style.color = '#707070';
    }
}

function asignPointsAndRole(p) {
    if (nextRole == 0) {
        effectAudio.play();
    }
    switch(round) {
        case 1: /// RONDA 1 ///
            if (!playedThisRound[p]) {              
                playersScore[p] += points[nextRole];
                playersRole[p] = roles[nextRole];
                nextRole++;
                playersScoreDisplay[p].innerHTML = playersScore[p];
                playersRoleDisplay[p].innerHTML = playersRole[p];

                playedThisRound[p] = true;
                playersBoxDisplay[p].style.transform = 'scale(0.8)';
                updatePlayerColor(p);
            }
        break;

        case 2: case 3: /// RONDA 2 Y 3 ///
            oldMagnate = playersRole.indexOf("MAGNATE");
            oldIndig = playersRole.indexOf("INDIG");
            if (!playedThisRound[p]) {              
                if (playersRole[p] != "MAGNATE" && nextRole == 0) {
                    // BANCARROTA
                    ruin = true;
                    ruinedPlayer = oldMagnate;
                    playersRoleDisplay[oldIndig].innerHTML = "-";
                    playersRole[oldMagnate] = "INDIG";
                    playersBoxDisplay[oldMagnate].style.transform = 'scale(0.8)';
                    playersRoleDisplay[oldMagnate].innerHTML = playersRole[oldMagnate];
                    playersScoreDisplay[oldMagnate].style.color = '#707070';
                    playersRoleDisplay[oldMagnate].style.color = '#707070';
                    playedThisRound[oldMagnate] = true;

                    // NEW MAGNATE
                    playersRole[p] = "MAGNATE";
                    playersScore[p] += 30;
                    playersRoleDisplay[p].innerHTML = playersRole[p];
                    playersScoreDisplay[p].innerHTML = playersScore[p];
                    playedThisRound[p] = true;
                    nextRole = 1;
                    updatePlayerColor(p);
                }else{
                    playersRole[p] = roles[nextRole];
                    playersScore[p] += points[nextRole];
                    playersRoleDisplay[p].innerHTML = playersRole[p];
                    playersScoreDisplay[p].innerHTML = playersScore[p];
                    nextRole++;
                    updatePlayerColor(p);
                }
                playedThisRound[p] = true;
                playersBoxDisplay[p].style.transform = 'scale(0.8)';
            }
        break;
    }
}

function nextRound() {
    if (round < 3) {
        round++;
        nextRole = 0;
        ruin = false;
        ruinedPlayer = -1;
        playedThisRound = [false, false, false, false];
        roundDisplay.innerHTML = "RONDA " + round + "/3";
        nextRoundBtn.style.display = 'none';
        playersScoreDisplay.forEach((player, i) => {
            updatePlayerColor(i);
        });

        playersBoxDisplay.forEach(player => {
            player.style.transform = 'scale(1.0)';
        });
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
        selectAudio.play();
    });
});

nextRoundBtn.addEventListener('click', () => {
    nextRound();
    selectAudio.play();
});