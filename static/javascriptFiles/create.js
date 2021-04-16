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
    this.workzones[0] = this.physics.add.image(0,0, 'blue_workzone').setOrigin(0,0);
    this.workzones[1] = this.physics.add.image(this.cameras.main.width-workStationOffset,0, 'red_workzone').setOrigin(0,0);
    this.workzones[2] = this.physics.add.image(0,this.cameras.main.height-workStationOffset, 'green_workzone').setOrigin(0,0);
    this.workzones[3] = this.physics.add.image(this.cameras.main.width-workStationOffset,this.cameras.main.height-108, 'yellow_workzone').setOrigin(0,0);
    
    
    this.taskPts = 0;
    this.scoreTest = this.add.text(0, 0, '');
    this.scoreTest.setDepth(100);
    
    
    //Circle objects that belong to this (Game)
    this.characters = []
    this.characters.push(new SoftwareProgrammer(this, 100, 100));


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

function addNewEnemyToGame(enemies, game){

    /*Will need to track valid spawn points
    for different maps and have them change
    based on which level has been loaded*/
    var spawnX = game.cameras.main.width/2;
    var spawnY = game.cameras.main.height/2;

    switch(Math.floor(Math.random() * 3)){
        case 0:
            enemies.push(new Bug(game, spawnX,
                spawnY));
            break;
        case 1:
            enemies.push(new FeatureCreep(game, spawnX,
                spawnY));
            break;
        case 2:
            enemies.push(new Monkey(game, spawnX,
                spawnY));
            break;
    }
}