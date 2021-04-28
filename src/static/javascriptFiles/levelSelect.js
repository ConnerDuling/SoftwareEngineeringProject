class LevelSelect extends Phaser.Scene {
    constructor(){
        super('LevelSelect')
    }
    preload(){
        this.load.image('level1_button','static/assets/images/Level_Icon_1.png');
        this.load.image('level2_button','static/assets/images/Level_Icon_2.png');
        this.load.image('level3_button','static/assets/images/Level_Icon_3.png');
    }
    create(){
        var buttonOffset = 200;
        this.levelOneStartButton = this.createButton(this.cameras.main.width/2-buttonOffset,this.cameras.main.height/2, 'level1_button');
        this.levelOneStartButton.on('pointerdown', this.startLV1, this);

        this.levelTwoStartButton = this.createButton(this.cameras.main.width/2,this.cameras.main.height/2, 'level2_button');
        this.levelTwoStartButton.on('pointerdown', this.startLV2, this);

        this.levelThreeStartButton = this.createButton(this.cameras.main.width/2+buttonOffset,this.cameras.main.height/2, 'level3_button');
        this.levelThreeStartButton.on('pointerdown', this.startLV3, this);
    }

    createButton(xCord, yCord, imageName){
        var buttonImage = this.add.image(xCord, yCord, imageName);
        buttonImage.setScale(.4);
        buttonImage.setInteractive();
        return buttonImage
    }

    startLV1(){
        this.scene.start('PlayLevel1');
    }

    startLV2(){
        this.scene.start('PlayLevel2');
    }
    
    startLV3(){
        this.scene.start('PlayLevel3');
    }
}