function Enemy(game, xPosition, yPosition, bounceBool, setCollideBool, pictureName){

    this.picture = game.physics.add.image(xPosition, yPosition, pictureName);
    this.picture.setScale(.125)
    this.health = 3;

    //This enemy should bounce off the walls to move around
    if (bounceBool){
        this.picture.setBounce(1,1);
        this.picture.setVelocity(150,150);
    }
    //This enemy should "skitter" around and change direction after an interval.
    else{

        var scitterConfig = {
            loop: true,
            delay: 300,
            callback: skitter,
            args: [this.picture]
        }

        game.time.addEvent(scitterConfig);

    }
    
    //Sets collission with outer walls.
    //ALL Enemies should have this trait, or else they will leave the scene
    this.picture.setCollideWorldBounds(true);

    //Sets collission with inner walls
    if(setCollideBool){
    game.physics.add.collider(game.walls, this.picture);
    }

    game.physics.add.overlap(this.picture, game.circle.picture, function takeDamage(enemy){
        // console.log(enemy.displayList)
        enemy.destroy();
    });

};

function skitter(picture){
    var speed = 250
    
    console.log(picture);

    //Prevents Bug type from trying to move after
    //being removed from display list, and before
    //being removed from enemy array from Create
    if(picture.displayList != null){
        picture.setVelocityX(speed * pickDirection());
        picture.setVelocityY(speed * pickDirection());
    }
}

function pickDirection(){
    switch(Math.floor(Math.random() * 3)){
        case 0:
            return 1
        case 1:
            return 0
        case 2:
            return -1
    }
}

//Sample of collision detection that will be used for enemies later.
//this.physics.add.collider(this.circle, walls, function func(){console.log("I'm sad")}, null, this);

function Monkey(game, xPosition, yPosition){

    Enemy.call(this, game, xPosition, yPosition, true, true, 'monkey_enemy');
};

function FeatureCreep(game, xPosition, yPosition){

    Enemy.call(this, game, xPosition, yPosition, true, false, 'feature_creep_enemy');
};

function Bug(game, xPosition, yPosition){

    Enemy.call(this, game, xPosition, yPosition, false, true, 'bug_enemy');
};