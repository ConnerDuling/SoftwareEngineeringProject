function characterMovement(gameObject){
    
    for(var i = 0; i < gameObject.characters.length; i++){

        //Grab speed of character, in case their speed is modified.
        var appliedSpeed = gameObject.characters[i].speed;
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

        gameObject.characters[i].setVelocity(0);

        //Checks to see if character has Fear effect.
        //IF so, do not allow them to 
        if(gameObject.characters[i].fearFlag == 0){
            //Checks if user input of direction
            //keys are pressed for that frame
            if(cursorKeys.right.isDown){
            gameObject.characters[i].setVelocityX(appliedSpeed)
            }else if(cursorKeys.left.isDown){
                gameObject.characters[i].setVelocityX((-appliedSpeed))
            }

            if(cursorKeys.up.isDown){
            gameObject.characters[i].setVelocityY((-appliedSpeed))
            }else if(cursorKeys.down.isDown){
                gameObject.characters[i].setVelocityY(appliedSpeed)
            }
        }    
    }
}