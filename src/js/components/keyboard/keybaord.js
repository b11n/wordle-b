class Keyboard extends HTMLElement {
    constructor() {
        super();
        this.letters = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
        ];
        this.attachShadow({ mode: 'open' });
        this.createStyles();
        this.render();
    }

    clickListener(event) {
        const newEv = new CustomEvent('keyPress', { detail: { key: event.target.dataset.key } });
        this.dispatchEvent(newEv);
    }

    render() {
        this.letters.forEach((row) => {
            const keyrow = document.createElement('div');
            keyrow.setAttribute('class', 'keyrow');
            row.forEach((letter) => {
                let letterPrint = letter;
                let letterClass = 'normal';
                if (letter == 'Backspace') {
                    letterPrint = '⌫';
                    letterClass = 'long';
                } else if (letter == 'Enter') {
                    letterPrint = '⏎';
                    letterClass = 'long';
                }
                const key = document.createElement('div');
                key.classList.add('key');
                key.classList.add(letterClass);
                key.setAttribute('data-key', letter);
                key.textContent = letterPrint;
                key.onclick = this.clickListener.bind(this);
                keyrow.appendChild(key);
            });
            this.shadowRoot.appendChild(keyrow);
        });
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .keyrow {
                display: flex;
                font-family: sans-serif;
                justify-content: center;
            }

            .key {
                height: 56px;
                width: 40px;
                background: #eeeeee;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px;
                margin: 2px;
                cursor: pointer;
                font-size: 24px;
            }

            .long {
                min-width: 56px;
            }
      `;
        this.shadowRoot.appendChild(style);
    }
}


export default Keyboard;