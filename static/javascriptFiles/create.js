function create ()
    {
        carpet = this.add.image(0,0,'carpet').setOrigin(0,0);

        carpet.setScale(.6);

        wall = this.physics.add.image(200,200, 'wall');

        circle = this.physics.add.image(100,100, 'circle');
        circle.setCollideWorldBounds(true);
        
        //circle.setCollideWorldBounds(true);

        // var circles = []
        // for(var i = 0; i < 30; i++){
        //     circles[i] = this.physics.add.image(i*30, 100+i*20, 'logo');

        //     circles[i].setVelocity(100, 200);
        //     circles[i].setBounce(1, 1);
        //     circles[i].setCollideWorldBounds(true);

        // }
    }