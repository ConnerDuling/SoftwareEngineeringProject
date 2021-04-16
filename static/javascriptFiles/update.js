function update(){

    characterMovement(this);
    this.scoreTest.setText('Points: ' + this.taskPts);

}

function characterMovement(gameObject){
    

    for(var i = 0; i < gameObject.characters.length; i++){

        //Grab speed of character, in case their speed is modified.
        var appliedSpeed = gameObject.characters[i].speed;

        var cursorKeys = gameObject.input.keyboard.createCursorKeys();

        //Calculates the real speed if moving diagonally
        //and updates speed to the derived number for that frame.
        if((cursorKeys.right.isDown || cursorKeys.left.isDown) &&
        (cursorKeys.down.isDown || cursorKeys.up.isDown)){
            appliedSpeed = Math.sqrt((appliedSpeed * appliedSpeed) / 2.0)
        }
        //Checks if user input of direction
        //keys are pressed for that frame
        if(cursorKeys.right.isDown){
        gameObject.characters[i].picture.setVelocityX(appliedSpeed)
        }else if(cursorKeys.left.isDown){
            gameObject.characters[i].picture.setVelocityX((-appliedSpeed))
        }else{
            gameObject.characters[i].picture.setVelocityX(0);
        }

        if(cursorKeys.up.isDown){
        gameObject.characters[i].picture.setVelocityY((-appliedSpeed))
        }else if(cursorKeys.down.isDown){
            gameObject.characters[i].picture.setVelocityY(appliedSpeed)
        }else{
            gameObject.characters[i].picture.setVelocityY(0);
        }
    }

    
}