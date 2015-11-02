const Phaser = require('phaser');

// const SPEED = 100; // pixels per second
const ANCHOR_X = 0.5;
const ANCHOR_Y = 0.5;

class Ball extends Phaser.Sprite {
    constructor(game, initialX, initialY) {
        super(game, initialX, initialY, 'ball');
        this.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
        this.body.bounce.set(1);
        this.body.collideWorldBounds = true;
        this.anchor.set(ANCHOR_X, ANCHOR_Y);
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this._outOfBounds, this);

        this.aiming = true;
        this.initialX = initialX;
        this.initialY = initialY;
    }

    shoot(dx, dy) {
        this.aiming = false;
        this.body.velocity.set(dx, dy);
    }

    _outOfBounds() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.body.velocity.set(0);
        this.aiming = true;
    }
}

module.exports = Ball;
