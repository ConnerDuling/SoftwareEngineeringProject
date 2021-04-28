class Enemy extends Phaser.Physics.Arcade.Image {
    constructor(game, xPosition, yPosition, bounceBool, setCollideBool, pictureName){

        super(game, xPosition, yPosition, pictureName);

        //Adds Enemies to the physics of the game
        game.add.existing(this);
        game.physics.add.existing(this);

        //Sets collission with outer walls.
        this.setCollideWorldBounds(true);

        this.setScale(.125);
        this.health = 3;

        //This enemy should bounce off the walls to move around
        if (bounceBool){
            this.setBounce(1,1);

            //Sets initial velocity in one of four directions by multiplying constant by plusOrMinusOne()
            this.setVelocity(150 * plusOrMinusOne(),150 * plusOrMinusOne());
        }        

        //Sets collission with inner walls
        if(setCollideBool){
            game.physics.add.collider(game.walls, this);
        }

        //Make listener for all 4 Characters to damage Enemy
        for(var i = 0; i < game.characters.length; i++){
            game.physics.add.overlap(this, game.characters[i], function takeDamage(enemy, character){
                var rKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
                if(Phaser.Input.Keyboard.JustDown(rKey)){
                    
                    //Check if the enemy type and character type match up for a weakness
                    //If so, deal an extra damage to this enemy
                    if(enemy.checkWeakness(character))
                        enemy.health -= 1;

                    //All Characters deal one damage
                    enemy.health -= 1;

                    //If the enemy has been reduced to zero or less, destroy it
                    console.log(enemy.health)
                    if(enemy.health <= 0){
                        //Update appropriate count upon enemy being destroyed
                        if(enemy instanceof Bug)
                            {game.bugCount--;
                                game.bugKills++;}
                        else if(enemy instanceof SpaghettiCode)
                            {game.spaghettiCodeCount--;
                                game.spaghettiCodeKills++;}
                        else if(enemy instanceof Monkey)
                            {game.monkeyCount--;
                                game.monkeyKills++;}
                        else if(enemy instanceof FeatureCreep)
                            {game.featureCreepCount--;
                                game.featureCreapKills++;}
                        enemy.destroy();
                    } 
                }
            });
        }
    
    //Checks to see if the character type matches the enemy type that called this function
    //If so, return true
        this.checkWeakness = function(character){
            
            if(this instanceof Bug && character instanceof QualityTester)
                return true
            else if(this instanceof FeatureCreep && character instanceof RequirementsEngineer)
                return true
            else if(this instanceof Monkey && character instanceof SoftwareDeveloper)
                return true
            else if(this instanceof SpaghettiCode && character instanceof SoftwareProgrammer)
                return true

            return false
        }
    }
}

function plusOrMinusOne() {
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

                game.time.addEvent(setUpInvulnerability(character));
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
  
            game.time.addEvent(setUpInvulnerability(character));
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

                game.time.addEvent(setUpInvulnerability(character));
            
            }
        });
    }
}

function setUpInvulnerability(character){
    character.invuln = 1;
    var invulnInterval = {loop: false,
        delay: 2 * 1000,
        callback: removeInvuln,
        args: [character]
    }   
    return (invulnInterval);
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

class SpaghettiCode extends Enemy{

    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, false, true, 'spaghetti_enemy');

        this.trackingEnemyId = pickRandomPlayer(game);

        var trackConfig = {loop: true,
        delay: 300,
        callback: characterTracking,
        args: [100, this, game.characters[this.trackingEnemyId]]
        }

        game.time.addEvent(trackConfig);
         //when a character touches a spagetti monster, they cannot move, the method to escape this isn't decided yet but it would either be by button mashing or by a timer.
         //if the former is implemented then they need invuln through out the time they are grappled so they cant be interfered by other monsters.
         //if there is an event in some way where an enemy is puppyguarded by a spagetti monster, we should probably implement safeguards for this.
         game.physics.add.overlap(this, game.characters, function grapple(enemy, character){
            if(!(character instanceof SoftwareProgrammer) && character.invuln == 0){
                //stops the character dead in their tracks
                character.setVelocityX(0);
                character.setVelocityY(0);
                //prevents any movement at all 
                character.speed = 0;
                
                //for now, the only way to remove stop is to destroy the SpaghettiCode
                var stopConfig = {loop: false,
                    delay: 2 * 1000,
                    callback: restoreSpeed,
                    args: [character]
                }
                game.time.addEvent(stopConfig);
                
                game.time.addEvent(setUpInvulnerability(character));
            }
         });
    }
}

/*Lets enemy track the trackingCharacter by moving the enemy's 
* velocity so as to have the x-y coordinates of the enemy try to align with the trackingCharacter
*/
function characterTracking(speed, enemy, trackingCharacter){

    if(enemy.displayList != null){
        //Track x coordinate
        if(enemy.x < trackingCharacter.x){
            enemy.setVelocityX(speed)
        }else{
            enemy.setVelocityX(-speed)
        }

        //Track y coordinate
        if(enemy.y < trackingCharacter.y){
            enemy.setVelocityY(speed)
        }else{
            enemy.setVelocityY(-speed)
        }
    }
}

//Returns a random index that is within the given game's Character array
function pickRandomPlayer(game){
    return Math.floor(Math.random() * game.characters.length)
}