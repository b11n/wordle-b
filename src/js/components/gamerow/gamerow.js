class GameRow extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.boxes = [];

        this.createStyles();
        this.render();

    }

    static get observedAttributes() {
        return ['word', 'state'];
    }

    render() {
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');

        const length = this.getAttribute("length");
        for (let i = 0; i < length; i++) {
            const box = document.createElement('div');
            box.setAttribute('class', 'box');
            wrapper.appendChild(box);
            this.boxes.push(box);
        }
        this.shadowRoot.append(wrapper);

    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'word') {
            for (let i = 0; i < this.boxes.length; i++) {
                if (i < newVal.length) {
                    this.boxes[i].textContent = newVal[i];
                } else {
                    this.boxes[i].textContent = '';
                }
            }
        } else {
            const classMap = { 'P': 'present', 'A': 'absent', 'C': 'correct' };
            const statrArr = newVal.split(",");
            for (let i = 0; i < this.boxes.length; i++) {
                this.boxes[i].classList.add('complete');
                this.boxes[i].classList.add(classMap[statrArr[i]]);
            }
        }

    }

    createStyles() {
        const style = document.createElement('style');
        console.log(style.isConnected);

        style.textContent = `
        .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .box {
            height: 60px;
            width: 60px;
            border: 2px solid #cccccc;
            margin: 2px;
            text-transform: capitalize;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            box-sizing: border-box;
            font-weight: bold;
            border-radius: 16px;
        }

        .box.complete {
            color: white;
            background: grey;
            border: unset;
        }

        .box.present {
            background: #ffba33;
        }

        .box.correct {
            background: green;
        }

        .box.absent {
            
        }
      `;
        this.shadowRoot.appendChild(style);
    }
}

export default GameRow;