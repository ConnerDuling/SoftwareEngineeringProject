class Character extends Phaser.Physics.Arcade.Image {
    constructor(game, xPosition, yPosition, pictureName){
        super(game, xPosition, yPosition, pictureName);
    
        this.speed = 200;

        game.add.existing(this);
        game.physics.add.existing(this);

        //This makes the circular models have very nice collision along smooth edges
        this.setCircle(54);

        //Collide with outer bounds
        this.setCollideWorldBounds(true);

        //Colide with inner walls
        game.physics.add.collider(game.walls, this);

        //Overlap with workstation
        game.physics.add.overlap(game.workzones, this, function workzoneOverlap(){
            var eKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            if(Phaser.Input.Keyboard.JustDown(eKey)){
                    game.taskPts += 1;
            }
        });
    }
}

function Programmer(game, xPosition, yPosition, pictureName){

    Character.call(this, game, xPosition, yPosition, pictureName);
};