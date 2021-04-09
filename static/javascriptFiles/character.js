function Character(game){
    
    this.picture = game.physics.add.image(100,100, 'green_circle');

    //Collide with outer bounds
    this.picture.setCollideWorldBounds(true);

    //Colide with inner walls
    game.physics.add.collider(game.walls, this.picture);

    //Overlap with workstation
    game.physics.add.overlap(game.workzones, this.picture, function isIn(){
        console.log("You are touching the workstation");
        
        var eKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        if(eKey.isDown){
            game.taskPts += 1;
        }

        // game.workzones[0].setInteractive().on('pointerup', function pointGain(){
        //     //if(this.picture.getBounds() == game.workzone[0].getBounds())
        //         
        // });
    });
}