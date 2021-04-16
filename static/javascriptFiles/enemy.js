class Enemy extends Phaser.Physics.Arcade.Image {
    constructor(game, xPosition, yPosition, bounceBool, setCollideBool, pictureName){

        super(game, xPosition, yPosition, pictureName);
        
        

        game.add.existing(this);
        game.physics.add.existing(this);

        //this = game.physics.add.image(xPosition, yPosition, pictureName);
        this.setScale(.125);
        this.health = 3;

        //This enemy should bounce off the walls to move around
        if (bounceBool){
            this.setBounce(1,1);
            this.setVelocity(150,150);
        }
        //This enemy should "skitter" around and change direction after an interval.
        else{

            var scitterConfig = {
                loop: true,
                delay: 300,
                callback: skitter,
                args: [this]
            }

            game.time.addEvent(scitterConfig);

        }
        
        //Sets collission with outer walls.
        //ALL Enemies should have this trait, or else they will leave the scene
        this.setCollideWorldBounds(true);

        //Sets collission with inner walls
        if(setCollideBool){
            game.physics.add.collider(game.walls, this);
        }

        for(var i = 0; i < game.characters.length; i++){
            game.physics.add.overlap(this, game.characters[i], function takeDamage(enemy){
                var eKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
                if(Phaser.Input.Keyboard.JustDown(eKey)){
                        //Add check of Character type for extra damage from specialists
                        //if() Enemy Weakness == Player Role
                        //      Deal 2 damage
                        //else
                        //      We just deal one damage

                        enemy.health -= 1;

                        //If the enemy has been reduced to zero or less, destroy it
                        if(enemy.health <= 0){
                            enemy.destroy();
                        }
                        
                }
            });
        }
    }
}

function skitter(picture){
    var skitterSpeed = 250

    //Prevents Bug type from trying to move after
    //being removed from display list, and before
    //being removed from enemy array from Create
    if(picture.displayList != null){
        picture.setVelocityX(skitterSpeed * pickDirection());
        picture.setVelocityY(skitterSpeed * pickDirection());
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

class Monkey extends Enemy{

    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, true, true, 'monkey_enemy');
    }
};


class FeatureCreep extends Enemy{

    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, true, false, 'feature_creep_enemy');
    }
};

class Bug extends Enemy{
    constructor(game, xPosition, yPosition){

    super(game, xPosition, yPosition, false, true, 'bug_enemy');
    }
};