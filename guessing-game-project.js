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
    // we close read-line when user has exhausted thier attempts.
    if(numAttempts === 0) {
        console.log('You lost');
        console.log('Your secret number is ' + secretNumber);
        return rl.close();
    }

    // if there's attempts left, we call read-line
    rl.question('Guess a number: ', answer => {
        // pass user's answer to checkGuess func.
        checkGuess( Number(answer) );

        //then we decrement attempts by 1 for every guess made.
        numAttempts--;
    });

}

// generate random number
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// set min number and max number;
function askRange() {
    let max = 0;
    let min = 0;

    const handleMinNum = answer => {
        min = Number(answer);

        // check for input range
        if (min >= max) {
            console.log('Invalid input range!, min is greater than max');
            return askRange();
        }

        console.log('min number = ' + min);

        console.log(`I'm thinking of a number between ${min} and ${max}...`);

        // assign secret number to the value return from random number generator func.
        secretNumber = randomInRange(min, max);

        // call guess function after generating a random number
        askGuess();
    }

    // callback func for max number
    const handleMaxNum = answer => {
        // assign number to max
        max = Number(answer);
        console.log('max number = ' + max);

        // continue with min num and pass answer to handleMinNum callback func.
        rl.question('Enter min number: ', handleMinNum);
    }

    // ask user for maximum number and passing answer to callback func.
    rl.question('Enter a max number: ', handleMaxNum);
}

// let user choose number of attempts they prefer
function askLimit() {
    rl.question('Enter number of attempts: ', answer => {

        // if no answer from user, we provide 5 attempts.
        if (Number(answer) === 0 ) {
            numAttempts = 5;
            console.log(`By default you have ${numAttempts} attempts`);
            askRange();
            return;
        }

        console.log('You have ' + answer + ' number of attempts to win');

        // assign user anser to numAttemps variable;

        numAttempts = Number(answer);
        //we call range func for min and max numbers
        askRange();
        return;
    });
}

askLimit();
