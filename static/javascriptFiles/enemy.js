class Enemy extends Phaser.Physics.Arcade.Image {
    constructor(game, xPosition, yPosition, bounceBool, setCollideBool, pictureName){

        super(game, xPosition, yPosition, pictureName);

        //Adds Enemies to the physics of the game
        game.add.existing(this);
        game.physics.add.existing(this);

        //Sets collission with outer walls.
        this.setCollideWorldBounds(true);

        //this = game.physics.add.image(xPosition, yPosition, pictureName);
        this.setScale(.125);
        this.health = 3;

        //This enemy should bounce off the walls to move around
        if (bounceBool){
            this.setBounce(1,1);
            this.setVelocity(150*plusOrMinus(),150*plusOrMinus());
        }        

        //Sets collission with inner walls
        if(setCollideBool){
            game.physics.add.collider(game.walls, this);
        }


        //Make listener for all 4 Characters to damage Enemy
        for(var i = 0; i < game.characters.length; i++){
            game.physics.add.overlap(this, game.characters[i], function takeDamage(enemy, character){
                var eKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
                if(Phaser.Input.Keyboard.JustDown(eKey)){
                    
                    //Check if the enemy type and character type match up for a weakness
                    //If so, deal an extra damage to this enemy
                    if(enemy.checkWeakness(character))
                        enemy.health -= 1;

                    //All Characters deal one damage
                    enemy.health -= 1;

                    //If the enemy has been reduced to zero or less, destroy it
                    console.log(enemy.health)
                    if(enemy.health <= 0){
                        enemy.destroy();
                    } 
                }
            });
        }
    
    this.checkWeakness = function(character){
        
        if(this instanceof Bug && character instanceof QualityTester)
            return true
        else if(this instanceof FeatureCreep && character instanceof RequirementsEngineer)
            return true
        else if(this instanceof Monkey && character instanceof SoftwareDeveloper)
            return true

        return false
    }

    }
}



function plusOrMinus() {
    switch(Math.floor(Math.random() * 2)){
        case 0:
            return -1
        default:
            return 1 
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

class Monkey extends Enemy{

    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, true, true, 'monkey_enemy');
        game.physics.add.overlap(this, game.characters, function setUpDizzy(enemy, character){
            //when a code monkey touches a player, they become Dizzy/Confused, meaning their inputs are reversed for a set time
            if(!(character instanceof SoftwareDeveloper) && character.invuln == 0){
                character.speed = -character.speed;
                var dizzyConfig = {loop: false,
                    delay: 2 * 1000,
                    callback: restoreSpeed,
                    args: [character]
                }
                game.time.addEvent(dizzyConfig);

                //enables the invulnerability
                character.invuln = 1;
                var invulnInterval = {loop: false,
                    delay: 2 * 1000,
                    callback: removeInvuln,
                    args: [character]
                }   
                game.time.addEvent(invulnInterval);
            }
        });
    }
};

class FeatureCreep extends Enemy{

    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, true, false, 'feature_creep_enemy');
        game.physics.add.overlap(this, game.characters, function setUpSlow(enemy, character){

            //when a character is touched by feature creep they are slowed, meaning that they only go 1/4th the movement speed of a player
            if(!(character instanceof RequirementsEngineer) && character.invuln == 0){
            character.speed = 50;
            var slowConfig = {loop: false,
                delay: 2 * 1000,
                callback: restoreSpeed,
                args: [character]
            }
            game.time.addEvent(slowConfig);

            //enables the invunlerability
            character.invuln = 1;
            var invulnInterval = {loop: false,
                delay: 2 * 1000,
                callback: removeInvuln,
                args: [character]
            }   
            game.time.addEvent(invulnInterval);
            }

            

        });
    }

    
};
    
function restoreSpeed(character){
    character.speed = character.storeSpeed;
}

function removeInvuln(character){
    character.invuln = 0;
}

class Bug extends Enemy{
    constructor(game, xPosition, yPosition){

        super(game, xPosition, yPosition, false, true, 'bug_enemy');

        var scitterConfig = {loop: true,
            delay: 300,
            callback: skitter,
            args: [this, 250]
        }

        game.time.addEvent(scitterConfig);

        //when a bug touches a character they become afraid, when afraid, they are faster but out of the players control (they dont respond to player movement)
        game.physics.add.overlap(this, game.characters, function setUpFear(enemy, character){

            if(!(character instanceof QualityTester) && character.invuln == 0){
                character.speed = 350;
                character.fearFlag = 1;
                character.setVelocityX(0);
                character.setVelocityY(0);
                character.setVelocityX(character.speed * pickDirection());
                character.setVelocityY(character.speed * pickDirection());


                var fearConfig = {loop: false,
                    delay: 2 * 1000,
                    callback: undoFear,
                    args: [character]
                }
            game.time.addEvent(fearConfig);

            character.invuln = 1;
            var invulnInterval = {loop: false,
                delay: 2 * 1000,
                callback: removeInvuln,
                args: [character]
            }   
            game.time.addEvent(invulnInterval);
            }

            

        });
    }
}

function undoFear(character){
    character.fearFlag = 0;
    character.speed = character.storeSpeed;
}

function skitter(picture, skitterSpeed) {

    //Prevents Bug type from trying to move after
    //being removed from display list, and before
    //being removed from enemy array from Create
    if(picture.displayList != null){
        picture.setVelocityX(skitterSpeed * pickDirection());
        picture.setVelocityY(skitterSpeed * pickDirection());
    }
}