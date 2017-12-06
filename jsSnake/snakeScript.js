/*-------------------------------------------------------------
                          VARIABLES
-------------------------------------------------------------*/

var mycanvas = document.getElementById('canvas');
var ctx = mycanvas.getContext('2d');
var snakeSize = 10;
var w = 400;
var h = 350;
var score = 0;
var snake;

/*-------------------------------------------------------------
                          DRAW FUNCTION
-------------------------------------------------------------*/

var draw = (function () {
    var bodySnake = function (x, y) {
        //SINGLE SQUARE FOR SNAKE
        ctx.fillStyle = "#39FF14";
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize); 
        //BORDER OF SINGLE SQUARE SNAKE
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    };
    
    
    var pinkFood = function (x, y) {
        //SINGLE BALL SNAKE EATS
        ctx.fillStyle = "#000";
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        //BORDER OF SINGLE BALL SNAKE EATS
        ctx.strokeStyle = "#39FF14";
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    };
    
    
    var scoreShow = function () {
        //SCORE HOW MANY BALLS SNAKE ATE
        var scoreShow = "Score: " + score;
        ctx.fillStyle = "#39FF14";
        ctx.fillText(scoreShow, 170, h-335);
    };
    
    
    //SNAKE STRUCTURE
    var drawSnake = function () {
        //INITIALLY SNAKE BODY WILL BE 3 BLOCKS
        var length = 2;
        //SNAKE ACTS LIKE AN ARRAY
        snake = [];
        
        // USING A FOR LOOP 
        for (var i = length; i >= 0; i--) { //STARTING POINT i=length=2, IF  i>=0, WE ARE DECREMENTING EACH TIME BY 1
            snake.push({x:i, y:0});         //EVERY TIME THE ABOVE HAPPENS WE ARE PUSHING ANOTHER BLOCK INTO THE ARRAY         
            
        }  
    };
    
    
    var createFood = function() {
        food = {
            //GENERATING RANDOM NUMBERS FOR FOOD POSITION
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        };
    };
    
    
    //SNAKE HEAD COLLISION WITH SNAKE BODY (THIS WILL BE USED FURTHER IN THE CODE)
    var collision = function(x, y, array) {
        for(var i = 0; i < array.length; i++) {
            
            if(array[i].x === x && array[i].y === y){
               
                return true;
                
            } 
        }
        
        return false;
    }; 
    
    
    
    //IMPORTANT FUNCTION
    var paint = function() {
        //SPACE SNAKE WILL MOVE AROUND IN
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);
        
        //SPACE BORDER 
        ctx.strokeStyle = '#39FF14';
        ctx.strokeRect(0, 0, w-1, h-1);
        
        //DISABLE BUTTON WHILE PLAYING
        btn.setAttribute('disabled', true);
        
        //VARIABLES = FIRST BOX IN THE ARRAY X AND Y COORDINATE
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;
        
        //MAKING SNAKE MOVE
        //USING VARIABLE 'DIRECTION' TO CONTROL MOVEMENT
        if (direction == 'right') {
            snakeX++;
        } else if (direction == 'left') {
            snakeX--;
        } else if (direction == 'up') {
            snakeY--;
        } else if (direction == 'down') {
            snakeY++;
        }
        
        
        //IF SNAKE TOUCHES CANVAS BORDER OR ITSELF IT WILL DIE
        if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || collision(snakeX, snakeY, snake)) {
            //STOP THE GAME
            
            //MAKE START BUTTON ENABLE AGAIN
            btn.removeAttribute('disabled', true);
            
            //CLEAN UP THE CANVAS
            ctx.clearRect(0, 0, w, h);
            
            //RESETTING SCORE
            if( score >= 1){
                
                score = 0;
            }

            //RESETING GAMELOOP
            gameloop = clearInterval(gameloop);
            return;
        }
        
        
        //SNAKE EATS THEN IT GETS BIGGER
        if (snakeX == food.x && snakeY == food.y) {
            //CREATE NEW SQUARE INSTEAD OF MOVING THE TAIL
            var tail = {
                x: snakeX,
                y: snakeY
            };
            //ADD POINT TO SCORE
            score++;
            
            //CREATE NEW FOOD
            createFood();
        } else {
            //POP OUT LAST CELL
            var tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }
        
        //PUTS THE TAIL (BLOCK ADDED AFTER EATEN FOOD) AS THE FIRST CELL
        snake.unshift(tail); 
            
        //FOR EACH ELEMENT OF ARRAY CREATE A SQUARE USING BODYSNAKE FUNCTION
        for (var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
            
        }
        
        //CREATE FOOD USING THE PINKFOOD FUNCTION
        pinkFood(food.x, food.y);
        
        //PUT THE SCORE TEXT
        scoreShow();
            
            
        }

    
    
    //INITIALIZES GAME
    var init = function() {
        direction = 'down';
        drawSnake();
        createFood();
        
        gameloop = setInterval(paint, 80);
    };
    
    //EXPOSING THE PRIVATE FUNCTION
    return {
        
        init: init
    };
  
    
}());

/*-------------------------------------------------------------
                          KEY FUNCTION
-------------------------------------------------------------*/

(function (window, document, draw) {

    //Connect the button in the html with the _init_ function.
    var btn = document.getElementById('btn');
    btn.addEventListener("click", function () { draw.init(); }, false);

    // document.onkeydown SPECIFIES WHAT SHOULD HAPPEN WHEN ANY KEY IS PRESSED
    document.onkeydown = function (event) {

        //SAME VARIABLE BUT FOR DIFFERENT BROWSERS
        var keyCode = window.event.keyCode;
        var keyCode = event.keyCode;

        switch (keyCode) {

        case 37:
            if (direction != 'right') {
                direction = 'left';
            }
            console.log('left');
            break;

        case 39:
            if (direction != 'left') {
                direction = 'right';
                console.log('right');
            }
            break;

        case 38:
            if (direction != 'down') {
                direction = 'up';
                console.log('up');
            }
            break;

        case 40:
            if (direction != 'up') {
                direction = 'down';
                console.log('down');
            }
            break;
        }
    }
})(window, document, draw);










