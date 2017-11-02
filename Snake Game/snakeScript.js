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
var food;

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
    
    
    //SNAKE STRUCTURE = Now create the structure of the snake. Our snake is an empty array in which we will push every element of the chain which will be the snake’s body.
    var drawSnake = function () {
        //INITIALLY SNAKE BODY WILL BE 3 BLOCKS
        var length = 2;
        snake = [];
        
        // USING A FOR LOOP WE PUSH THE 3 ELEMENTS INSIDE THE ARRAY (SQUARES)
        // EVERY ELEMENT WILL HAVE X=0 AND THE Y WILL TAKE THE VALUE OF THE INDEX
        for (var i = length; i >= 0; i--) {
            snake.push({x:i, y:0});                  
            
        }  
    };
    
    
    //CANT LET FOOD BE IN THE SAME PLACE THE SNAKE BODY IS
    var createFood = function() {
        food = {
            //GENERATING RANDOM NUMBERS FOR FOOD POSITION
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        };
        
        //LOOK AT POSITION OF SNAKES BODY
        for (var i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;
            
            if (food.x === snakeX || food.y === snakeY || food.y === snakeY && food.x === snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    };
    
    
    //SNAKE HEAD COLLISION WITH SNAKE BODY
    var collision = function(x, y, array) {
        for(var i = 0; i < array.length; i++) {
            
            if(array[i].x === x && array[i].y === y)
                return true;
            
        }
            return false;
        
    }; 
    
    
    
    //IMPORTANT FUNCTION
    var paint = function() {
        //SPACE SNAKE WILL MOVE
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);
        
        //SPACE BORDER 
        ctx.strokeStyle = '#39FF14';
        ctx.strokeRect(0, 0, w-1, h-1);
        
        //DISABLE BUTTON WHILE PLAYING
        btn.setAttribute('disabled', true);
        
        
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

            gameloop = clearInterval(gameloop);
            return;
        }
        
        
        //IF SNAKE EATS THEN IT GETS BIGGER, SO SHOULDNT POP OUT LAST ELEMENT  OF THE ARRAY
        if (snakeX == food.x && snakeY == food.y) {
            //CREATE NEW SQUARE INSTEAD OF MOVING THE TAIL
            var tail = {
                x: snakeX,
                y: snakeY
            };
            score++;
            
            //CREATE NEW FOOD
            createFood();
        } else {
            //POP OUT LAST CELL
            var tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }
        
        //PUTS THE TAIL AS THE FIRST CELL
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
    
    //RETURN ONLY INIT FUNCTION
    return {
        
        init: init
    };
  
    
}());

/*-------------------------------------------------------------
                          KEY FUNCTION
-------------------------------------------------------------*/

(function (window, document, draw, undefined) {

    //Connect the button in the html with the _init_ function.
    var btn = document.getElementById('btn');
    btn.addEventListener("click", function () {
        draw.init();
    });

    document.onkeydown = function (event) {

        keyCode = window.event.keyCode;
        keyCode = event.keyCode;

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










