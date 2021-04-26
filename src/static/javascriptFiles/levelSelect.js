class LevelSelect extends Phaser.Scene {
    constructor(){
        super()
    }
    preload(){
        this.load.image('button','static/assets/images/CircleGreenTransperantBackground.png');
    }
    create(){
        this.startButton = this.add.image(300,300, 'button')
        this.startButton.setInteractive();
        this.startButton.on('pointerdown', this.startGame, this)
    }

    startGame(){
        this.scene.start('Play');
    }
}