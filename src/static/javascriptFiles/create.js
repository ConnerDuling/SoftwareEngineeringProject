function create ()
{
    //Carpet background of level
    this.carpet = this.add.image(0,0,'carpet').setOrigin(0,0);
    this.carpet.setScale(.6);

    this.enemies = [];

    //Wall group for all office walls that are not window boudries
    this.walls = this.physics.add.staticGroup();

    this.walls.add(this.add.rectangle(this.cameras.main.width/2,this.cameras.main.height/2,10,350, 0xffffff))
    this.walls.add(this.add.rectangle(this.cameras.main.width/2,this.cameras.main.height/2,450,10, 0xffffff))

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
    
    
    //Circle objects that belong to this (Game)
    this.characters = []
    this.characters.push(new RequirementsEngineer(this, 100, 100));
    this.characters.push(new QualityTester(this, 700, 700));
    this.characters.push(new SoftwareProgrammer(this, 700, 100));
    this.characters.push(new SoftwareDeveloper(this, 100, 700));


    //Set up enemy spawner for the Game
    var spawnDelaySeconds = 5
    var spawnConfig = {
        loop: true,
        delay: (1000 * spawnDelaySeconds),
        callback: addNewEnemyToGame,
        args: [this.enemies, this]
    }
    this.time.addEvent(spawnConfig);

}

//Limiters on enemy count for each enemy type
var monkeyCount = 0;
var bugCount = 0;
var featureCreepCount = 0;

function addNewEnemyToGame(enemies, game){

    /*Will need to track valid spawn points
    for different maps and have them change
    based on which level has been loaded*/
    var spawnX = game.cameras.main.width/2;
    var spawnY = game.cameras.main.height/2;

    switch(Math.floor(Math.random() * 3)){
        case 0:
            if(bugCount!=3){
            enemies.push(new Bug(game, spawnX,
                spawnY));
            bugCount++}
            break;
        case 1:
            if(featureCreepCount!=3){
            enemies.push(new FeatureCreep(game, spawnX,
                spawnY));
            featureCreepCount++}
            break;
        case 2:
            if(monkeyCount!=3){
            enemies.push(new Monkey(game, spawnX,
                spawnY));
            monkeyCount++}
            break;
    }
}