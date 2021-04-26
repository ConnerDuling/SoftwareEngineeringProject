class LevelSelect extends Phaser.Scene {
    constructor(){
        super()
    }
    preload(){
        this.load.image('level1_button','static/assets/images/Level_Icon_1.png');
        this.load.image('level2_button','static/assets/images/Level_Icon_2.png');
        this.load.image('level3_button','static/assets/images/Level_Icon_3.png');
    }
    create(){
        var buttonOffset = 200;
        this.levelOneStartButton = this.createButton(this.cameras.main.width/2-buttonOffset,this.cameras.main.height/2, 'level1_button');
        this.levelOneStartButton.on('pointerdown', this.startGame, this);

        this.levelTwoStartButton = this.createButton(this.cameras.main.width/2,this.cameras.main.height/2, 'level2_button');
        this.levelTwoStartButton.on('pointerdown', this.startGame, this);

        this.levelThreeStartButton = this.createButton(this.cameras.main.width/2+buttonOffset,this.cameras.main.height/2, 'level3_button');
        this.levelThreeStartButton.on('pointerdown', this.startGame, this);
    }

    createButton(xCord, yCord, imageName){
        var buttonImage = this.add.image(xCord, yCord, imageName);
        buttonImage.setScale(.4);
        buttonImage.setInteractive();
        return buttonImage
    }

    startGame(){
        this.scene.start('PlayLevel1');
    }
}