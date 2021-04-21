class Workstation extends Phaser.Physics.Arcade.Image{

    constructor(game, xPosition, yPosition, pictureName){
        super(game, xPosition, yPosition, pictureName);
        this.setOrigin(0,0);
        game.add.existing(this);
        game.physics.add.existing(this);
    }
}

class BlueWorkStation extends Workstation{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'blue_workzone');
    }
}

class RedWorkStation extends Workstation{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'red_workzone');
    }
}

class YellowWorkStation extends Workstation{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'yellow_workzone');
    }
}

class GreenWorkStation extends Workstation{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'green_workzone');
    }
}