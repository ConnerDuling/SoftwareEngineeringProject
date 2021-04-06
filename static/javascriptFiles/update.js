function update(){

    movement(this);

}

function movement(gameObject){
    
    var cursorKeys = gameObject.input.keyboard.createCursorKeys();

    var speed = 200;
    
    //Calculates the real speed if moving diagonally
    //and updates speed to the derived number for that frame.
    if((cursorKeys.right.isDown || cursorKeys.left.isDown) &&
    (cursorKeys.down.isDown || cursorKeys.up.isDown)){
        speed = Math.sqrt((speed * speed) / 2.0)
    }
    //Checks if user input of direction
    //keys are pressed for that frame
    if(cursorKeys.right.isDown){
       gameObject.circle.picture.setVelocityX(speed)
    }else if(cursorKeys.left.isDown){
        gameObject.circle.picture.setVelocityX((-speed))
    }else{
        gameObject.circle.picture.setVelocityX(0);
    }

    if(cursorKeys.up.isDown){
       gameObject.circle.picture.setVelocityY((-speed))
    }else if(cursorKeys.down.isDown){
        gameObject.circle.picture.setVelocityY(speed)
     }else{
        gameObject.circle.picture.setVelocityY(0);
    }
}