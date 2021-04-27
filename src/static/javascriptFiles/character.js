class Character extends Phaser.Physics.Arcade.Image {
    constructor(game, xPosition, yPosition, pictureName){
        super(game, xPosition, yPosition, pictureName);
        this.invuln = 0;
        this.fearFlag = 0;
        this.speed = 200;
        //True speed of the character that should remain constant
        //to act as a reset if an effect would change this.
        this.storeSpeed = 200;

        /*Adds this Character to the game's physics.
        *Vital for intearacting with collisions and overlaps.
        */
        game.add.existing(this);
        game.physics.add.existing(this);

        //This makes the circular models have very nice collision along smooth edges
        this.setCircle(54);

        //Collide with outer bounds
        this.setCollideWorldBounds(true);

        //Colide with inner walls
        game.physics.add.collider(game.walls, this);
    }
}

function makeOverlap(game, workzone, character){
    return game.physics.add.overlap(workzone, character, function workzoneOverlap(){
        game.taskTrackFlag++;
    });
}

class SoftwareProgrammer extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'red_circle');
    }
}

class SoftwareDeveloper extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'green_circle');
    }
}

class QualityTester extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'yellow_circle');
    }
}

class RequirementsEngineer extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'blue_circle');
    }
}