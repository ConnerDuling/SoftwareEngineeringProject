class Level2 extends Phaser.Scene {
    constructor(){
        super('PlayLevel2')
    }
    preload ()
    {
        preloadGameImages(this)
    }
    create ()
    {
        makeCarpet(this);

        //Wall group for all office walls that are not window boudries
        this.walls = this.physics.add.staticGroup();

        this.walls.add(makeWall(this, this.cameras.main.width/2,this.cameras.main.height/2,10,350, 0xffffff))
        this.walls.add(makeWall(this, this.cameras.main.width/2,this.cameras.main.height/2,450,10, 0xffffff))

        //Workzone objects
        this.workzones = [4]
        var workStationOffset = 108;
        this.workzones[0] = new BlueWorkStation(this,0,0);
        this.workzones[1] = new RedWorkStation(this,this.cameras.main.width-workStationOffset,0);
        this.workzones[2] = new GreenWorkStation(this, 0,this.cameras.main.height-workStationOffset);
        this.workzones[3] = new YellowWorkStation(this, this.cameras.main.width-workStationOffset,this.cameras.main.height-workStationOffset)
        
        this.taskPts = 0;
        this.scoreTest = this.add.text(0, 0, '');
        this.scoreTest.setDepth(100);
        
        //Character objects that belong to this (Scene)
        this.characters = []
        this.characters.push(new RequirementsEngineer(this, 100, 100));
        this.characters.push(new QualityTester(this, 700, 700));
        this.characters.push(new SoftwareProgrammer(this, 700, 100));
        this.characters.push(new SoftwareDeveloper(this, 100, 700));

        //Make Character objects collide with each other
        this.physics.add.collider(this.characters);

        setUpEnemySpawnSystem(this);

    }
    update(){

        characterMovement(this);
        this.scoreTest.setText('Points: ' + this.taskPts);
    
    }
}