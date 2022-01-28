import GameRow from './components/gamerow/gamerow';
import Keyboard from './components/keyboard/keybaord';
import { Fireworks } from 'fireworks-js'

customElements.define('game-row', GameRow);
customElements.define('app-keyboard', Keyboard);

const BACKSPACE = 'Backspace';
const ENTER = 'Enter';
const WORD_LENGTH = 5;
const SUCCESS_MESSAGE = '✨ Congrats, you got it! ✨';
const FAILURE_MESSAGE = 'Better luck tomorrow 🤞';
const ALPHABETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const NO_OF_TRIES = 5;

const GameStateEnum = {
    WON: 'WON',
    LOST: 'LOST'
};

const LetterStateEnum = {
    CORRECT: 'C',
    PRESENT: 'P',
    ABSENT: 'A'
}

const testWord = "BROWN"

class Game {
    constructor() {
        this.gameOver = false;
        this.wordArray = [];
        this.word = "";
        this.selectedRow = 0;
        this.endGameDom = document.querySelector(".game-state");
        this.gameRows = document.querySelectorAll('game-row');
        this.alphabetStateArray = ','.repeat(25).split(',');

        this.keyboard = document.querySelector('app-keyboard');

        this.keyboard.addEventListener('keyPress', (ev) => {
            this.handleKeyPress(ev.detail.key);
        })
        document.addEventListener('keydown', (event) => {
            this.handleKeyPress(event.key);
        })
    }

    handleKeyPress(key) {
        if (this.gameOver) return;
        switch (key) {
            case BACKSPACE:
                this.handleBackspace();
                break
            case ENTER:
                this.handleEnter();
                break;
            default:
                this.handleAlphabet(key)
        }
        this.updateGameRow(this.selectedRow, this.word);
    }

    handleAlphabet(key) {
        if (this.word.length < WORD_LENGTH) {
            const letter = key.toUpperCase();
            if (ALPHABETS.indexOf(letter) > -1) {
                this.word += letter;
            }
        }
    }

    handleEnter() {
        if (this.word.length < WORD_LENGTH) {
            console.log("Not enough chars")
        } else {
            const guessArr = [];
            for (let i = 0; i < this.word.length; i++) {
                const indexOfLetter = ALPHABETS.indexOf(this.word[i]);
                if (this.word[i] === testWord[i]) {
                    guessArr.push(LetterStateEnum.CORRECT);
                    this.alphabetStateArray[indexOfLetter] = LetterStateEnum.CORRECT;
                } else if (testWord.indexOf(this.word[i]) !== -1) {
                    guessArr.push(LetterStateEnum.PRESENT);
                    this.alphabetStateArray[indexOfLetter] = LetterStateEnum.PRESENT;
                } else {
                    guessArr.push(LetterStateEnum.ABSENT);
                    this.alphabetStateArray[indexOfLetter] = LetterStateEnum.ABSENT;
                }
            }
            this.gameRows[this.selectedRow].setAttribute("state", guessArr.join(','));
            this.selectedRow++;
            this.wordArray.push(this.word);
            this.keyboard.setAttribute('keyState', this.alphabetStateArray.join(","));
            this.word = '';
            if (guessArr.join("") === LetterStateEnum.CORRECT.repeat(NO_OF_TRIES)) {
                this.endGame(GameStateEnum.WON);
                return;
            }

            if (this.selectedRow === NO_OF_TRIES + 1) {
                this.endGame(GameStateEnum.LOST);
            }
        }
    }

    endGame(gameState) {
        this.gameOver = true;
        this.gameState = gameState;

        if(gameState === GameStateEnum.WON){
            
        }

        if (gameState === GameStateEnum.WON) {
            document.body.classList.add("fireworks");
            const fireworks = new Fireworks(document.body, {
                sound: {
                    enabled: true,
                    files: [
                        "https://fireworks.js.org/sounds/explosion0.mp3",
                        "https://fireworks.js.org/sounds/explosion1.mp3",
                        "https://fireworks.js.org/sounds/explosion2.mp3"
                    ],
                }
            });
            fireworks.start();
            setTimeout(() => {
                fireworks.stop();
            }, 10000);

        }
        this.endGameDom.textContent = this.gameState === GameStateEnum.WON ? SUCCESS_MESSAGE : FAILURE_MESSAGE;;
    }

    handleBackspace() {
        if (this.word.length > 0) {
            this.word = this.word.substr(0, this.word.length - 1);
        }
    }

    updateGameRow(row, word) {
        if (this.gameOver) return;
        document.querySelectorAll('game-row')[row].setAttribute("word", word);
    }
}


new Game();