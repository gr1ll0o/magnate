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

let nextRoundBtn = document.getElementById('nextroundbutton');

/// PLAYERS STATS ///
// Players Score
let playersScore = [0, 0, 0, 0];
// Players Role
let playersRole = ['-', '-', '-', '-'];
// Rounds
let round = 1;
let roles = ["MAGNATE", "RICO", "POBRE", "INDIG"];
let points = [30, 20, 10, 0];
let nextRole = 0;

/// FUNCTIONS ///
function asignPointsAndRole(p) {
    switch(round) {
        case 1: /// RONDA 1 /// Solo se comprueba si aún no se asignó el rol
            if (playersRole[p] == '-') {              
                playersScore[p] += points[nextRole];
                playersRole[p] = roles[nextRole];
                nextRole++;
                playersScoreDisplay[p].innerHTML = playersScore[p];
                playersRoleDisplay[p].innerHTML = playersRole[p];
            }
        break;
    }
}

function nextRound() {
    round++;
    nextRole = 0;
    nextRoundBtn.style.display = 'none';
}

/// SCRIPT ///

nextRoundBtn.style.display = 'none';

playersScoreDisplay[0].addEventListener('click', () => {
    asignPointsAndRole(0);
    if (nextRole >= 4) nextRoundBtn.style.display = 'block';
});

playersScoreDisplay[1].addEventListener('click', () => {
    asignPointsAndRole(1);
    if (nextRole >= 4) nextRoundBtn.style.display = 'block';

});

playersScoreDisplay[2].addEventListener('click', () => {
    asignPointsAndRole(2);
    if (nextRole >= 4) nextRoundBtn.style.display = 'block';

});

playersScoreDisplay[3].addEventListener('click', () => {
    asignPointsAndRole(3);
    if (nextRole >= 4) nextRoundBtn.style.display = 'block';
});

nextRoundBtn.addEventListener('click', () => {
    nextRound();
});