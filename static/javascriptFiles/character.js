function Character(game, xPosition, yPosition, pictureName){
    
    this.picture = game.physics.add.image(xPosition,yPosition, pictureName);
    this.speed = 200;

    //Collide with outer bounds
    this.picture.setCollideWorldBounds(true);

    //Colide with inner walls
    game.physics.add.collider(game.walls, this.picture);

    //Overlap with workstation
    game.physics.add.overlap(game.workzones, this.picture, function workzoneOverlap(){
        var eKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        if(Phaser.Input.Keyboard.JustDown(eKey)){
                game.taskPts += 1;
        }
    });
}

function Programmer(game, xPosition, yPosition, pictureName){

    Character.call(this, game, xPosition, yPosition, pictureName);
};