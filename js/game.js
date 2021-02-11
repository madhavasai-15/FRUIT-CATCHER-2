class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200, 500, 50, 90);
        player1.addImage("player1",player_img);
    
        player2 = createSprite(800, 500, 150, 90);
        player2.addImage("player2", player_img);
        players=[player1,player2];
    }
    
    play(){
        form.hide();

        Player.getPlayerInfo();
        image(back_img, width/2, height/2, width, height);
        var x =100;
        var y = 200;
        var index =0;
        drawSprites();
        for(var plr in allPlayers){
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
                     
            players[index -1].x = x;
            players[index - 1].y = y;
                       
            if(index === player.index){
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25);
            }

            if(allPlayers !== undefined){   //Game Starts here
                var text_position = 60;
                for(var i in allPlayers){
                    //Identfying currently active player
                    if(i === "player" + player.index){
                        fill(255, 0, 0);
                    }
                    else{
                        fill(255);
                    }
                    text_position += 30;
                    textSize(28);
                    text(allPlayers[i].name + " : "+ allPlayers[i].score, 40, text_position);  
               }    
            }
        }             
 
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
            
        if (frameCount % 20 === 0) {
            fruits.push(new Fruit());
        }

        if (player.index !== null) {
            if(fruits.length > 0){
                for(var i = 0; i < fruits.length; i++){
                    fruits[i].show();
                    fruits[i].update();
                    fruits[i].touch(players[0]);
                    fruits[i].touch(players[1]);
                }
            }

            if(fruits.length > 7 && frameCount % 60 === 0){
                fruits.splice(0, 7);
            }
        }
    }

    end(){
       console.log("Game Ended");
    }
}