class Level3 extends Phaser.Scene {
    constructor(){
        super('PlayLevel3')
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
        this.walls.add(makeWall(this, this.cameras.main.width/4,this.cameras.main.height/3,15,500, 0xffffff))
        this.walls.add(makeWall(this, (this.cameras.main.width/3)+150,(this.cameras.main.height/4)+300,450,15, 0xffffff))
        this.walls.add(makeWall(this, (this.cameras.main.width/3)+370, this.cameras.main.height/2,15,300, 0xffffff))
        this.walls.add(makeWall(this, (this.cameras.main.width/3)+225, (this.cameras.main.height/2)-150,300, 15, 0xffffff))
        

        //Workzone objects
        this.workzones = [4]
        var workStationOffset = 108;
        this.workzones[0] = new BlueWorkStation(this,522,158);
        this.workzones[1] = new RedWorkStation(this,(this.cameras.main.width-workStationOffset-485),335);
        this.workzones[2] = new GreenWorkStation(this, 522,(this.cameras.main.height-workStationOffset)-157);
        this.workzones[3] = new YellowWorkStation(this, (this.cameras.main.width-workStationOffset)-485,(this.cameras.main.height-workStationOffset)-335)
        
        //Character objects that belong to this (Scene)
        this.characters = []
        this.characters.push(new RequirementsEngineer(this, 700, 700));
        this.characters.push(new SoftwareProgrammer(this, 100, 700));
        this.characters.push(new SoftwareDeveloper(this, 700, 100));
        this.characters.push(new QualityTester(this, 100, 100));

        //Make Character objects collide with each other
        this.physics.add.collider(this.characters);

        setUpEnemySpawnSystem(this);

        setUpTaskTrack(this);

        setUpTimer(this);

    }
    update(){

        characterMovement(this);
        updateGameGoal(this);
    
    }
}