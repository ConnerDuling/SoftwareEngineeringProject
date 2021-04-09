function Character(game){
    
    this.picture = game.physics.add.image(100,100, 'green_circle');

    //Collide with outer bounds
    this.picture.setCollideWorldBounds(true);

    //Colide with inner walls
    game.physics.add.collider(game.walls, this.picture);

    //Overlap with workstation
    game.physics.add.overlap(game.workzones, this.picture, function isIn(){
        overlap = true
        console.log("You are touching the workstation");
        //an interactive way to get points, 
        //a problem is still happening where if you are outside of the workstation, 
        //you can still click it for points
        game.workzones[0].setInteractive().on('pointerup', function pointGain(){
            //if(this.picture.getBounds() == game.workzone[0].getBounds())
                game.taskPts += 1;
        });
    });
}