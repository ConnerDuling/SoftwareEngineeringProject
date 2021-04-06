function create ()
{
    //Carpet background of level
    this.carpet = this.add.image(0,0,'carpet').setOrigin(0,0);
    this.carpet.setScale(.6);

    
    //Wall group for all office walls that are not window boudries
    this.walls = this.physics.add.staticGroup();

    this.walls.add(this.add.rectangle(this.cameras.main.width/2,this.cameras.main.height/2,10,350, 0xffffff))
    this.walls.add(this.add.rectangle(this.cameras.main.width/2,this.cameras.main.height/2,450,10, 0xffffff))

    //Workzone objects
    this.workzones = [4]
    var workStationOffset = 108;
    this.workzones[0] = this.physics.add.image(0,0, 'blue_workzone').setOrigin(0,0);
    this.workzones[1] = this.physics.add.image(this.cameras.main.width-workStationOffset,0, 'red_workzone').setOrigin(0,0);
    this.workzones[2] = this.physics.add.image(0,this.cameras.main.height-workStationOffset, 'green_workzone').setOrigin(0,0);
    this.workzones[3] = this.physics.add.image(this.cameras.main.width-workStationOffset,this.cameras.main.height-108, 'yellow_workzone').setOrigin(0,0);


    //Circle objects that below to this (Game)
    this.circle = new Character(this);

    console.log(this.circle);

    //Keeps circle from leaving the windows of the Game



    //this.physics.add.collider(fc, workzones);

    enemies = [];

    enemies.push(new Monkey(this, this.cameras.main.width/2,
                            this.cameras.main.height/2));

    console.log(enemies);


    //TODO: Find a way to make a bug move and stop at a set interval
}