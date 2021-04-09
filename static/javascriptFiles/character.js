function Character(game, pictureName){
    
    this.picture = game.physics.add.image(100,100, pictureName);

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