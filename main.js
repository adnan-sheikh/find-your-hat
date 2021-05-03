const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        // Set the "home" position before the game starts
        this.field[0][0] = pathCharacter;

    }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }

    playGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.askInput();
            if (!this.isInBounds()) {
                console.log('Stay within your limits. Try again next time.');
                playing = false;
                break;
            } else if (this.isUserOnHole()) {
                console.log('Yo, you fell down bruh. Try again next time.');
                playing = false;
                break;
            } else if (this.isUserOnHat()) {
                console.log("Finally, you found your hat!");
                playing = false;
                break;
            }
            // update current location on map
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    askInput() {
        let userInput = prompt('Which direction? ').toUpperCase();
        switch (userInput) {
            case 'W':
                this.locationY -= 1;
                break;
            case 'S':
                this.locationY += 1;
                break;
            case 'A':
                this.locationX -= 1;
                break;
            case 'D':
                this.locationX += 1;
                break;
            default:
                console.log("Please enter 'w' to move up, 'a' to move left, 's' to move down, 'd' to move right.");
                this.askInput();
                break;
        }
    }

    isUserOnHat() {
        return this.field[this.locationY][this.locationX] === hat;
    }

    isUserOnHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }

    isInBounds() {
        return (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        )
    }

    static generateField(width, height, percentage = 0.1) {
        const fieldArray = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const prob = Math.random();
                fieldArray[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }

        // generating hat location and placing hat
        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        }

        // ensuring that hat isn't placed at home location
        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height)
        }

        fieldArray[hatLocation.y][hatLocation.x] = hat;
        return fieldArray;
    } 

}

const myfield = new Field(Field.generateField(10, 10, 0.3));
myfield.playGame();