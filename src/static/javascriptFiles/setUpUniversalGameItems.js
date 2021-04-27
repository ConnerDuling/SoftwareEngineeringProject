function preloadGameImages(game){
    game.load.text('generic', 'static/assets/text/genericTasks.txt');
    game.load.image('carpet', 'static/assets/images/CarpetBackground.png');
    
    game.load.image('green_circle', 'static/assets/images/CircleGreenTransperantBackground.png');
    game.load.image('red_circle', 'static/assets/images/CircleRedTransperantBackground.png');
    game.load.image('yellow_circle', 'static/assets/images/CircleYellowTransperantBackground.png');
    game.load.image('blue_circle', 'static/assets/images/CircleBlueTransperantBackground.png');

    game.load.image('soft_Dev', 'static/assets/images/Player3.png');
    game.load.image('soft_Prog', 'static/assets/images/Player2.png');
    game.load.image('qa_Test', 'static/assets/images/Player4.png');
    game.load.image('req_Eng', 'static/assets/images/Player1.png');

    game.load.image('bug_enemy', 'static/assets/images/EnemyBug.png')
    game.load.image('feature_creep_enemy', 'static/assets/images/EnemyFeatureCreep.png')
    game.load.image('monkey_enemy', 'static/assets/images/EnemyMonkey.png')
    game.load.image('spaghetti_enemy', 'static/assets/images/EnemySpaghetti.png')

    game.load.image('blue_workzone', 'static/assets/images/SquareBlueTransperantBackground.png')
    game.load.image('red_workzone', 'static/assets/images/SquareRedTransperantBackground.png')
    game.load.image('green_workzone', 'static/assets/images/SquareGreenTransperantBackground.png')
    game.load.image('yellow_workzone', 'static/assets/images/SquareYellowTransperantBackground.png')
}



function addNewEnemyToGame(enemies, game){

    /*Will need to track valid spawn points
    for different maps and have them change
    based on which level has been loaded*/
    var spawnX = game.cameras.main.width/2;
    var spawnY = game.cameras.main.height/2;

    switch(Math.floor(Math.random() * 4)){
        case 0:
            if(game.bugCount<1){
                enemies.push(new Bug(game, spawnX,
                    spawnY));
                game.bugCount++}
            break;
        case 1:
            if(game.featureCreepCount<1){
                enemies.push(new FeatureCreep(game, spawnX,
                    spawnY));
                game.featureCreepCount++}
            break;
        case 2:
            if(game.monkeyCount<1){
                enemies.push(new Monkey(game, spawnX,
                    spawnY));
                game.monkeyCount++}
            break;
        default:
            if(game.spaghettiCodeCount<1){
                enemies.push(new SpaghettiCode(game, spawnX,
                    spawnY));
                game.spaghettiCodeCount++}
            break;
    }
}

function setUpEnemySpawnSystem(game){

    game.enemies = [];

    //Limiters on enemy count for each enemy type
    game.monkeyCount = 0;
    game.bugCount = 0;
    game.featureCreepCount = 0;
    game.spaghettiCodeCount = 0;

    //Set up enemy spawner for the Game
    var spawnDelaySeconds = 5
    var spawnConfig = {
        loop: true,
        delay: (1000 * spawnDelaySeconds),
        callback: addNewEnemyToGame,
        args: [game.enemies, game]
    }
    game.time.addEvent(spawnConfig);
}

function makeWall(game, xCord, yCord, height, width){
    return game.add.rectangle(xCord,yCord,height,width, 0xffffff)
}

function makeCarpet(game){
    //Carpet background of levels
    game.carpet = game.add.image(0,0,'carpet').setOrigin(0,0);
    game.carpet.setScale(.6);
}