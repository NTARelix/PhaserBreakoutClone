const Phaser = require('phaser');

const Objects = require('../Objects');

const BRICK_COLUMN_COUNT = 8;
const BRICK_ROW_COUNT = 16;
const BRICK_ROW_MARGIN = 5;
const HIT_BALL_SCALE = 10;
const BRICK_NAMES = ['blue_brick', 'orange_brick', 'pink_brick', 'green_brick'];

class Game {
    constructor() {}

    preload() {
        this.load.image('paddle', 'img/paddle.png');
        this.load.image('ball', 'img/ball.png');
        for (let i=0; i<BRICK_NAMES.length; i++) {
            let brickName = BRICK_NAMES[i];
            this.load.image(brickName, 'img/' + brickName + '.png');
        }
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.checkCollision.down = false;

        this.paddle = new Objects.Paddle(this.game, 0, this.game.height);
        this.game.add.existing(this.paddle);

        this.ball = new Objects.Ball(this.game, this.game.width / 2, this.game.height / 2);
        this.game.add.existing(this.ball);

        this.bricks = this.game.add.physicsGroup();
        const tempBrickImage = this.cache.getImage(BRICK_NAMES[0]);
        const totalBrickWidth = tempBrickImage.width * BRICK_COLUMN_COUNT;
        const brickMargin = (this.game.width - totalBrickWidth) / 2;
        let brick;
        for (let x = 0; x < BRICK_COLUMN_COUNT; x++) {
            for (let y = 0; y < BRICK_ROW_COUNT; y++) {
                brick = this.bricks.create(
                    brickMargin + x * tempBrickImage.width,
                    (BRICK_ROW_MARGIN * tempBrickImage.height) + y * tempBrickImage.height,
                    'pink_brick'
                );
                brick.body.bounce.set(1);
                brick.body.immovable = true;
            }
        }

        this.game.input.onDown.add(this.shootBall, this);
    }

    update() {
        this.game.physics.arcade.collide(this.ball, this.paddle, this._ballCollidesWithPaddle);
        this.game.physics.arcade.collide(this.ball, this.bricks, this._ballCollidesWithBrick, null, this);
    }

    shootBall() {
        if (this.ball.aiming) {
            const dx = this.ball.x - this.paddle.x;
            const dy = this.ball.y - this.paddle.y;
            this.ball.shoot(dx, dy);
        }
    }

    _ballCollidesWithPaddle(ball, paddle) {
        ball.body.velocity.x = (ball.x - paddle.x) * HIT_BALL_SCALE;
    }

    _ballCollidesWithBrick(ball, brick) {
        brick.kill();

        if (this.bricks.countLiving() === 0) {
            this.game.state.restart();
        }
    }

    static _processBallBrickCollision(ball, brick) {
        const brickCenterX = brick.x + brick.width / 2;
        const brickCenterY = brick.y + brick.height / 2;
        const dx = Math.max(Math.abs(ball.x, brickCenterX) - brick.width / 2, 0);
        const dy = Math.max(Math.abs(ball.x, brickCenterY) - brick.width / 2, 0);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = ball.width / 2;
        return distance < radius;
    }
}

module.exports = Game;
