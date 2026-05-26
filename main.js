/// HTML ELEMENTS ///
let p1ScoreDisplay = document.getElementById('p1score');
let p2ScoreDisplay = document.getElementById('p2score');
let p3ScoreDisplay = document.getElementById('p3score');
let p4ScoreDisplay = document.getElementById('p4score');

let p1RoleDisplay = document.getElementById('p1role');
let p2RoleDisplay = document.getElementById('p2role');
let p3RoleDisplay = document.getElementById('p3role');
let p4RoleDisplay = document.getElementById('p4role');

/// PLAYERS STATS ///
// Players Score
let p1Score = 0;
let p2Score = 0;
let p3Score = 0;
let p4Score = 0;
// Players Role
let p1Role = '-';
let p2Role = '-';
let p3Role = '-';
let p4Role = '-';
// Rounds
let round = 1;
let roles = ["MAGNATE", "RICO", "POBRE", "INDIG"];
let points = [30, 20, 10, 0];
let nextRole = 0;

/// SCRIPT ///

p1ScoreDisplay.addEventListener('click', () => {
    if (p1Role == '-') {
        p1Score += points[nextRole];
        p1Role = roles[nextRole];
        nextRole++;

        p1ScoreDisplay.innerHTML = p1Score;
        p1RoleDisplay.innerHTML = p1Role;
    }
});

p2ScoreDisplay.addEventListener('click', () => {
    if (p2Role == '-') {
        p2Score += points[nextRole];
        p2Role = roles[nextRole];
        nextRole++;

        p2ScoreDisplay.innerHTML = p2Score;
        p2RoleDisplay.innerHTML = p2Role;
    }
});

p3ScoreDisplay.addEventListener('click', () => {
    if (p3Role == '-') {
        p3Score += points[nextRole];
        p3Role = roles[nextRole];
        nextRole++;

        p3ScoreDisplay.innerHTML = p3Score;
        p3RoleDisplay.innerHTML = p3Role;
    }
});

p4ScoreDisplay.addEventListener('click', () => {
    if (p4Role == '-') {
        p4Score += points[nextRole];
        p4Role = roles[nextRole];
        nextRole++;

        p4ScoreDisplay.innerHTML = p4Score;
        p4RoleDisplay.innerHTML = p4Role;
    }
});