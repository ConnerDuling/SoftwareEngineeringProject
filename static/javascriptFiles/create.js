function create ()
{
    //Carpet background of level
    this.carpet = this.add.image(0,0,'carpet').setOrigin(0,0);
    this.carpet.setScale(.6);

    
    //Wall group for all office walls that are not window boudries
    var walls = this.physics.add.staticGroup();

    walls.create(400,250, 'wall').setScale(.4).refreshBody();
    //walls.create(300,300, 'wall').setScale(.6).refreshBody();

    //Workzone objects
  
    workzones = [4]
    workzones[0] = this.physics.add.image(0,0, 'blue_workzone').setOrigin(0,0);
    workzones[1] = this.physics.add.image(this.cameras.main.width-108,0, 'red_workzone').setOrigin(0,0);
    workzones[2] = this.physics.add.image(0,this.cameras.main.height-108, 'green_workzone').setOrigin(0,0);
    workzones[3] = this.physics.add.image(this.cameras.main.width-108,this.cameras.main.height-108, 'yellow_workzone').setOrigin(0,0);
    //I've tried to make it so that the FC or the Monkey does not go inside work zones but it results in them both bouncing in a really strange way and getting stuck
    //Don't use this unless you plan to fix it or question your sanity.
    /* for(var i = 0; i < 4; i++){
        workzones[i].setCollideWorldBounds(true);
    } */

    //Circle objects that below to this (Game)
    this.circle = this.physics.add.image(100,100, 'green_circle');

    //Keeps circle from leaving the windows of the Game
    this.circle.setCollideWorldBounds(true);
    
    var inFlag = false;
    this.physics.add.overlap(workzones, this.circle, function isIn(){console.log("Is in")});

    var fc = this.physics.add.image(10,10,'fc');
    fc.setVelocity(100, 100);
    fc.setBounce(1,1);
    fc.setCollideWorldBounds(true);
    this.physics.add.overlap(fc, this.circle, function hurt(){console.log("player has been touched by creep")});


    //this.physics.add.collider(fc, workzones);


    var monkey = this.physics.add.image(40,40, 'monkey');
    monkey.setBounce(1,1);
    monkey.setVelocity(150,150);
    monkey.setCollideWorldBounds(true);
    this.physics.add.collider(walls, monkey);
    this.physics.add.collider(walls, this.circle);
    this.physics.add.overlap(monkey, this.circle, function hurt(){console.log("player has been touched by monkey")});


    //this.physics.add.collider(monkey, workzones);


    var bug = this.physics.add.image(50,50, 'bug');
    this.physics.add.collider(walls, bug);
    this.physics.add.collider(walls, this.circle);
    this.physics.add.overlap(monkey, this.circle, function hurt(){console.log("player has been touched by bug")});
    this.timeInSeconds = 60;
    //TODO: Find a way to make a bug move and stop at a set interval
  
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