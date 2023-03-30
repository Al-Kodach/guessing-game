const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// number to predict
let secretNumber = 0;

// number of guess to make
let numAttempts = 5;

// check user guess number
function checkGuess(num) {
    if ( num > secretNumber ) {
        console.log('Too high');
        return askGuess();

    } else if ( num < secretNumber ) {
        console.log('Too low');
        return askGuess();

    }

    console.log('You win!');
    return rl.close();
}

// computer asked user question func
function askGuess() {
    if(numAttempts === 0) {
        console.log('You lost');
        console.log('Your secret number is ' + secretNumber);
        return rl.close();
    }

    rl.question('Guess a number: ', answer => {
        numAttempts--;
        checkGuess( Number(answer) );

    });

}

// generate random number
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// set min number and max number;
function askRange() {
    debugger
    let max = 0;
    let min = 0;

    const handleMinNum = answer => {
        // check for input range
        min = Number(answer);
        if (min >= max) {
            console.log('Invalid input range!, min is greater than max');
            return askRange();
        }

        console.log('min number = ' + min);

        console.log(`I'm thinking of a number between ${min} and ${max}...`);

        secretNumber = randomInRange(min, max);

        askGuess();
    }

    const handleMaxNum = answer => {
        max = Number(answer);
        console.log('max number = ' + max);
        rl.question('Enter min number: ', handleMinNum);
    }

    rl.question('Enter a max number: ', handleMaxNum);
}

function askLimit() {
    rl.question('Enter number of attempts: ', answer => {
        console.log('You have ' + answer + ' number of attempts to win');
        numAttempts = Number(answer);
        askRange();
        return;
    });
}

askLimit();
