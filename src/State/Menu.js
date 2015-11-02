class Menu {
    preload() {
        this.load.image('play', 'img/play.png');
    }

    create() {
        this.start = this.add.button(0, 0, 'play', this.play, this);
    }

    play() {
        this.state.start('game');
    }
}

module.exports = Menu;
