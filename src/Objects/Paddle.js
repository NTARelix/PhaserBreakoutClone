const Phaser = require('phaser');

const PADDLE_ANCHOR_X = 0.5;
const PADDLE_ANCHOR_Y = 1.0;

class Paddle extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'paddle');
        this.anchor.set(PADDLE_ANCHOR_X, PADDLE_ANCHOR_Y);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.bounce.set(1);
        this.body.immovable = true;
    }

    update() {
        this.x = this.game.input.x;
        const halfWidth = this.width / 2;
        this.position.clampX(halfWidth, this.game.width - halfWidth);
    }
}

module.exports = Paddle;
