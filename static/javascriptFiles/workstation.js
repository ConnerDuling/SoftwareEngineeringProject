class Workstation extends Phaser.Physics.Arcade.Image{

    constructor(game, xPosition, yPosition, pictureName){
        super(game, xPosition, yPosition, pictureName);

        game.add.existing(this);
        game.physics.add.existing(this);
    }
}