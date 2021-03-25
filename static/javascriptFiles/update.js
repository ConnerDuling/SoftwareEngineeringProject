function update(){

    movement(this);

}

function movement(gameObject){
    
    var cursorKeys = gameObject.input.keyboard.createCursorKeys();

    var speed = 100;
    
    //Calculates the real speed if moving diagonally
    //and updates speed to the derived number for that frame.
    if((cursorKeys.right.isDown || cursorKeys.left.isDown) &&
    (cursorKeys.down.isDown || cursorKeys.up.isDown)){
        speed = Math.sqrt((speed * speed) / 2.0)
    }
    //Checks if user input of direction
    //keys are pressed for that frame
    if(cursorKeys.right.isDown){
       gameObject.circle.setVelocityX(speed)
    }
    if(cursorKeys.left.isDown){
       gameObject.circle.setVelocityX((-speed))
    }
    if(cursorKeys.up.isDown){
       gameObject.circle.setVelocityY((-speed))
    }
    if(cursorKeys.down.isDown){
       gameObject.circle.setVelocityY(speed)
    }
}