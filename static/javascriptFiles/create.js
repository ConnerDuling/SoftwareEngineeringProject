function create ()
{
    //Carpet background of level
    this.carpet = this.add.image(0,0,'carpet').setOrigin(0,0);
    this.carpet.setScale(.6);

    
    //Wall group for all office walls that are not window boudries
    var walls = this.physics.add.staticGroup();

    // walls.create(400,400, 'wall').setScale(.6).refreshBody();
    // walls.create(300,300, 'wall').setScale(.6).refreshBody();

    //Workzone objects
    workzones = [4]
    workzones[0] = this.physics.add.image(0,0, 'blue_workzone').setOrigin(0,0);
    workzones[1] = this.physics.add.image(this.cameras.main.width-108,0, 'red_workzone').setOrigin(0,0);
    workzones[2] = this.physics.add.image(0,this.cameras.main.height-108, 'green_workzone').setOrigin(0,0);
    workzones[3] = this.physics.add.image(this.cameras.main.width-108,this.cameras.main.height-108, 'yellow_workzone').setOrigin(0,0);

    //Circle objects that below to this (Game)
    this.circle = this.physics.add.image(100,100, 'circle');

    //Keeps circle from leaving the windows of the Game
    this.circle.setCollideWorldBounds(true);
    
    var inFlag = false;
    this.physics.add.overlap(workzones, this.circle, function isIn(){console.log("Is in")});


    //Sample of collision detection that will be used for enemies later.
    //this.physics.add.collider(this.circle, walls, function func(){console.log("I'm sad")}, null, this);

    //Establishes collision between all objects in the walls staticGroup and this.circle
    //NOTE: Will only work if the object is moved via velocity, and NOT xy cordinates. Learnt this the long and painful way.
    //this.physics.add.collider(walls, this.circle);


    // var circles = []
    // for(var i = 0; i < 100; i++){
    //     circles[i] = this.physics.add.image(i*30, 100+i*20, '');

    //     circles[i].setVelocity(100, 200);
    //     circles[i].setBounce(1, 1);
    //     circles[i].setCollideWorldBounds(true);
    //     this.physics.add.collider(circles[i], this.circle);
    // }
}