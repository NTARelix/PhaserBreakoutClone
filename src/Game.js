const Phaser = require('phaser');

const State = require('./State');

const WIDTH = 320;
const HEIGHT = 360;

class Game {
    constructor(parent) {
        this.game = new Phaser.Game(
            WIDTH,
            HEIGHT,
            Phaser.AUTO,
            parent,
            null,
            false,
            false
        );
        this.game.state.add('boot', new State.Boot(), true);
        this.game.state.add('menu', new State.Menu());
        this.game.state.add('game', new State.Game());
    }
}

module.exports = Game;
