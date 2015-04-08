(function(){

    $('#startBtn').click(startGame);

    var speed,
        food,
        snake,
        dir,
        score;

    function startGame(){

        speed = 150;
        food = '';
        snake = ['5_10', '5_11', '5_12'];
        dir = 'down';
        score = 0;

        // Reset score
        $('#score').html('Score: ' + score);

        // Hide the start button and create the board with 10x10 cells
        $('#startBtn').hide();
        for (var x = 0; x < 50; x++){
            for (var y = 0; y < 50; y++){
                $tempDiv = $('<div class=cell id=co' + x + '_' + y + '></div>')
                $('#gameContainer').append($tempDiv);
            }
        }

        // Initialize starting position for snake
        $('#co5_10').addClass('snakeCell');
        $('#co5_11').addClass('snakeCell');
        $('#co5_12').addClass('snakeCell');
        randomFood();
        setTimeout(function () {
            move()
        }, speed);
    }

    // Randomize food cells
    function randomFood(){
        var foodX = Math.floor(Math.random() * 49);
        var foodY = Math.floor(Math.random() * 49);
        $('#co' + foodX + '_' + foodY).addClass('foodCell');
        food = foodX + '_' + foodY;
    }

    // Movement
    function move(){
        var tail = snake.pop();
        $('#co' + tail).removeClass('snakeCell');

        var currHead = snake[0];
        var xy = currHead.split('_');
        var x = parseInt(xy[0]);
        var y = parseInt(xy[1]);

        switch(dir) {
            case 'left': y = y - 1 ; break;
            case 'up': x = x - 1; break;
            case 'right': y = y + 1; break;
            case 'down': x = x + 1; break;
        }

        var newHead = '' + x + '_' + y;
        snake.unshift(newHead);
        $('#co' + newHead).hasClass('snakeCell');

        // If snake gets food add to length and score, speed up, then generate more food
        if (newHead == food) {
            snake.push(tail);
            $('#co' + tail).addClass('snakeCell');
            $('#co' + food).removeClass('foodCell');
            speed -= 5;
            score++;
            $('#score').html('Score: ' + score);
            randomFood();
        }

        // If snake hits edge of board or itself, game over
        if (y > 49 || x > 49 || y < 0 || x < 0) {
            $('#gameContainer').html('');
            $('#startBtn').show();
            alert("Oops! It looks like you hit the edge! Game Over!");
            return;
        } else if ($('#co' + newHead).hasClass('snakeCell')) {
            $('#gameContainer').html('');
            $('#startBtn').show();
            alert("Oh no! You ran into yourself! Game Over!");
            return;
        }

        $('#co' + newHead).addClass('snakeCell');
        setTimeout(function () {
            move();
        }, speed);
    }

    // Key press events
    $(document).keydown(function(e){
       if (e.keyCode == 37 && dir != 'right') {
           dir = 'left';
       } else if (e.keyCode == 38 && dir != 'down') {
           dir = 'up';
       } else if (e.keyCode == 39 && dir != 'left') {
           dir = 'right';
       } else if (e.keyCode == 40 && dir != 'up') {
           dir = 'down';
       }
    });
})();
