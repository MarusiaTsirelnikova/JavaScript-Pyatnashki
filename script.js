let buttons = [document.getElementById('row1').querySelectorAll('.btn'),
                document.getElementById('row2').querySelectorAll('.btn'),
                document.getElementById('row3').querySelectorAll('.btn')];

function mixGameBoard () {
    let numbers = [];
    let x = 0;
    let z = 0;
    let counter = 0;
    let nullstr = 0;
    while (numbers.length != 8) {
        x = Math.floor(Math.random() * 8) + 1;
        if (!numbers.includes(x)) {
            numbers.push(x);
        }
    }

    for (i = 0; i <= 6; i++) {
        for (a = i; a <= 7; a++) {
            if (numbers[i] > numbers[a]) {
                counter += 1;
            }
        }
    }

    z = Math.floor(Math.random() * 8);
    numbers.splice(z, 0, 0);

    if (z >= 0 && z <= 2) {
        nullstr = 1;
    }
    else if (z >= 3 && z <= 5) {
        nullstr = 2;
    }
    else {
        nullstr = 3;
    }

    if (counter % 2 == 0) {
        drawGameBoard(numbers);
    }
    else {
        mixGameBoard ();
    }
}

function drawGameBoard (numbers) {
    let index = 0;
    for (i = 0; i <= 2; i++) {
        for (a = 0; a <= 2; a++) {
            buttons[i][a].value = numbers[index];
            if (numbers[index] == 0) {
                buttons[i][a].innerText = '';
                buttons[i][a].id = 'empty';
                buttons[i][a].disabled = true;
            }
            else {
                buttons[i][a].innerText = numbers[index];
                buttons[i][a].id = '';
                buttons[i][a].disabled = false;
            }
            index += 1;
        }
    }
}

function whereIsNull () {
    for (i = 0; i <= 2; i++) {
        for (a = 0; a <= 2; a++) {
            if (buttons[i][a].value == 0) {
                return [i, a];               
            }
        }
    }
}

function getCoordinates(number) {
    let nullcood = whereIsNull();
    let moving = false;
    for (i = 0; i <= 2; i++) {
        for (a = 0; a <= 2; a++) {
            if (number == buttons[i][a].value) {
                if (nullcood[0] == i && nullcood[1] - 1 == a) {
                    moving = true;
                }
                else if (nullcood[0] == i && nullcood[1] + 1 == a) {
                    moving = true;
                }
                else if (nullcood[1] == a && nullcood[0] + 1 == i) {
                    moving = true;
                }
                else if (nullcood[1] == a && nullcood[0] - 1 == i) {
                    moving = true;
                }
                return [moving, i, a];
            }
        }
    }
}

function move() {
    let number = this.value;
    let nullcood = whereIsNull();
    let coods = getCoordinates(number);
    var value = '';
    var idbtn = '';
    if (coods[0]) {
        value = buttons[coods[1]][coods[2]].value;
        buttons[coods[1]][coods[2]].value = buttons[nullcood[0]][nullcood[1]].value;
        buttons[nullcood[0]][nullcood[1]].value = value;

        buttons[nullcood[0]][nullcood[1]].innerText = number;
        buttons[coods[1]][coods[2]].innerText = '';

        buttons[nullcood[0]][nullcood[1]].disabled = false;
        buttons[coods[1]][coods[2]].disabled = true;

        idbtn = buttons[coods[1]][coods[2]].id;
        buttons[coods[1]][coods[2]].id = buttons[nullcood[0]][nullcood[1]].id;
        buttons[nullcood[0]][nullcood[1]].id = idbtn;
    }
    areYouWin ();
}

function areYouWin () {
    let board = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
    let check = 0;
    for (i = 0; i <= 2; i++) {
        for (a = 0; a <= 2; a++) {
            if (buttons[i][a].value == board[i][a]) {
                check += 1;
            }
        }
    }
    if (check == 9) {
        alert("Ты победил! Молодец! ^-^");
    }
}

for (i = 0; i <= 2; i++) {
    for (a = 0; a <= 2; a++) {
        buttons[i][a].addEventListener('click', move);
    }
}

const mixButton = document.getElementById('mixbtn');
mixButton.addEventListener('click', mixGameBoard);