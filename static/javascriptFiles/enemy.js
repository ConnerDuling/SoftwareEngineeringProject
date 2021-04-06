function Enemy(game, xPosition, yPosition, bounceBool, setCollideBool, pictureName){

    this.picture = game.physics.add.image(xPosition, yPosition, pictureName);

    if (bounceBool){
        this.picture.setBounce(1,1);
        this.picture.setVelocity(150,150);
    }
    
    //Sets collission with outer walls.
    //ALL Enemies should have this trait, or else they will leave the scene
    this.picture.setCollideWorldBounds(true);

    //Sets collission with inner walls
    if(setCollideBool){
    game.physics.add.collider(game.walls, this.picture);
    }
};

//Sample of collision detection that will be used for enemies later.
//this.physics.add.collider(this.circle, walls, function func(){console.log("I'm sad")}, null, this);

function Monkey(game, xPosition, yPosition){

    Enemy.call(this, game, xPosition, yPosition, true, true, 'monkey');
};

function FeatureCreep(game, xPosition, yPosition){

    Enemy.call(this, game, xPosition, yPosition, true, false, 'feature_creep');
};

function Bug(game, xPosition, yPosition){

    Enemy.call(this, game, xPosition, yPosition, false, false, 'bug');
};