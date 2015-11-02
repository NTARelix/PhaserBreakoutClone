const Phaser = require('phaser');

class Boot {
    preload() {
        this.game.stage.disableVisibilityChange = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
    }

    create() {
        this.game.state.start('game');
    }
}

module.exports = Boot;
