class PlayGame extends Phaser.Scene {
    constructor(){
        super('Play')
    }
    preload ()
    {
        this.load.text('generic', 'static/assets/text/genericTasks.txt');
        this.load.image('carpet', 'static/assets/images/CarpetBackground.png');
        
        this.load.image('green_circle', 'static/assets/images/CircleGreenTransperantBackground.png');
        this.load.image('red_circle', 'static/assets/images/CircleRedTransperantBackground.png');
        this.load.image('yellow_circle', 'static/assets/images/CircleYellowTransperantBackground.png');
        this.load.image('blue_circle', 'static/assets/images/CircleBlueTransperantBackground.png');
        this.load.image('soft_Dev', 'static/assets/images/Player3.png');
        this.load.image('soft_Prog', 'static/assets/images/Player2.png');
        this.load.image('qa_Test', 'static/assets/images/Player4.png');
        this.load.image('req_Eng', 'static/assets/images/Player1.png');

        this.load.image('wall', 'static/assets/images/protoWall.png')

        this.load.image('bug_enemy', 'static/assets/images/EnemyBug.png')
        this.load.image('feature_creep_enemy', 'static/assets/images/EnemyFeatureCreep.png')
        this.load.image('monkey_enemy', 'static/assets/images/EnemyMonkey.png')
        this.load.image('spaghetti_enemy', 'static/assets/images/EnemySpaghetti.png')

        this.load.image('blue_workzone', 'static/assets/images/SquareBlueTransperantBackground.png')
        this.load.image('red_workzone', 'static/assets/images/SquareRedTransperantBackground.png')
        this.load.image('green_workzone', 'static/assets/images/SquareGreenTransperantBackground.png')
        this.load.image('yellow_workzone', 'static/assets/images/SquareYellowTransperantBackground.png')
    }
    create ()
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
    update(){

        characterMovement(this);
        this.scoreTest.setText('Points: ' + this.taskPts);
    
    }
}

function characterMovement(gameObject){
    

    for(var i = 0; i < gameObject.characters.length; i++){

        //Grab speed of character, in case their speed is modified.
        var appliedSpeed = gameObject.characters[i].speed;
        var fFlag = gameObject.characters[i].fearFlag;
        var cursorKeys = gameObject.input.keyboard.createCursorKeys();

        //Calculates the real speed if moving diagonally
        //and updates speed to the derived number for that frame.
        if((cursorKeys.right.isDown || cursorKeys.left.isDown) &&
        (cursorKeys.down.isDown || cursorKeys.up.isDown)){
            //If appliedSpeed is < 0, that means Character is dizzy, and should have the negative preserved despite squaring appliedSpeed
            if(appliedSpeed < 0){
                appliedSpeed = -(Math.sqrt((appliedSpeed * appliedSpeed) / 2.0))
            }else{
                appliedSpeed = Math.sqrt((appliedSpeed * appliedSpeed) / 2.0)
            }
        }
        //Checks if user input of direction
        //keys are pressed for that frame
        if(cursorKeys.right.isDown && fFlag == 0){
        gameObject.characters[i].setVelocityX(appliedSpeed)
        }else if(cursorKeys.left.isDown && fFlag == 0){
            gameObject.characters[i].setVelocityX((-appliedSpeed))
        }else if(fFlag == 0){
            gameObject.characters[i].setVelocityX(0);
        }

        if(cursorKeys.up.isDown && fFlag == 0){
        gameObject.characters[i].setVelocityY((-appliedSpeed))
        }else if(cursorKeys.down.isDown  && fFlag == 0){
            gameObject.characters[i].setVelocityY(appliedSpeed) 
        }else if(fFlag == 0){
            gameObject.characters[i].setVelocityY(0);
        }
    }

    
}

//Limiters on enemy count for each enemy type
var monkeyCount = 0;
var bugCount = 0;
var featureCreepCount = 0;
var spaghettiCodeCount = 0;

function addNewEnemyToGame(enemies, game){

    /*Will need to track valid spawn points
    for different maps and have them change
    based on which level has been loaded*/
    var spawnX = game.cameras.main.width/2;
    var spawnY = game.cameras.main.height/2;

    switch(Math.floor(Math.random() * 4)){
        case 0:
            if(bugCount<3){
                enemies.push(new Bug(game, spawnX,
                    spawnY));
                bugCount++}
            break;
        case 1:
            if(featureCreepCount<3){
                enemies.push(new FeatureCreep(game, spawnX,
                    spawnY));
                featureCreepCount++}
            break;
        case 2:
            if(monkeyCount<3){
                enemies.push(new Monkey(game, spawnX,
                    spawnY));
                monkeyCount++}
            break;
        default:
            if(spaghettiCodeCount<3){
                enemies.push(new SpaghettiCode(game, spawnX,
                    spawnY));
                spaghettiCodeCount++}
            break;
    }
}