"use strict";
// Global variables
const canvasWidth = 800;
const canvasHeight = 600;
// Context of the Canvas
let ctx;
// A variable to store the game object
let game;
// Variable to store the time at the previous frame
let oldTime = 0;
// Global variables for the settings of the game
let initialSpeed = 0.5;
let ballSpeed = 0.25;
let paddleSpeed = 0.5;
let speedIncrease = 1.005;

// Class for the ball in the game
class Ball extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "ball", sheetCols);
        this.velocity = new Vector(0, 0);
    }
    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(ballSpeed).times(deltaTime));
        this.updateCollider();
    }
    // Move the ball to the center, and stop its motion
    reset() {
        this.position.x = canvasWidth / 2;
        this.position.y = canvasHeight / 2;
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    // Start the ball motion
    serve() {

        // Random angle mostly upward
        let angle = Math.random() * Math.PI / 3 + Math.PI / 3;
    
        this.velocity = new Vector(
            Math.cos(angle),
            -Math.sin(angle)
        );
    
        ballSpeed = initialSpeed;
    }
}

// Class for the main character in the game
class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(0, 0);

        // Structure with the directions the object can move
        this.motion = {
            left: {
                axis: "x",
                sign: -1,
            },
            right: {
                axis: "x",
                sign: 1,
            },
        }
        // Keys pressed to move the player
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }
        // normalizing the velocity to avoid too much speed on diagonals (it went way too fast)
        this.velocity = this.velocity.normalize().times(paddleSpeed);

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();

        this.updateCollider();
    }

    clampWithinCanvas() {

        //left border
        if (this.position.x - this.size.x /2 < 0) {
            this.position.x = this.size.x /2;
        }
    
        // right border
        if (this.position.x + this.size.x /2 > canvasWidth) {
            this.position.x = canvasWidth - this.size.x /2;
        }
    }
}

// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();

        this.ping2 = document.createElement("audio");
        this.ping2.src = "4387__noisecollector__pongblipe4.wav"
        this.ping = document.createElement("audio");
        this.ping.src = "breakbrick.mp3"
        this.ping3 = document.createElement("audio");
        this.ping3.src = "lost.mp3"

        // Boolean to detect if the game is already in play
        this.inPlay = false;
        this.endsounded = false;
    }

    // Create the objects in the game
    initObjects() {
        // The player controlled paddles
        this.paddle = new Paddle(
            new Vector(canvasWidth / 2, canvasHeight - 40),
            120,
            20,
            "black"
        );
        this.bricks = [];
        this.level = 1;
        this.destroyedBlocks = 0;
        this.lives = 3;

        this.create_bricks();
        // The ball
        this.ball = new Ball(new Vector(canvasWidth / 2, canvasHeight / 2), 20, 20, "black");
        // The walls at the top and bottom
        this.wallTop = new Paddle(new Vector(canvasWidth / 2, 0), canvasWidth, 1, "black");


        this.actors = [
            this.wallTop,
            this.paddle,
            this.ball
        ];
    }
    create_bricks() {
        let colors = [
            "red",
            "orange",
            "yellow",
            "green",
            "blue"
        ];
        this.bricks = [];
        let rows = this.level + 2;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < 6; col++) {
                let brick = new GameObject(
                    new Vector(120 + col * 110, 80 + row * 40),
                    100,
                    30,
                    colors[row],
                    "brick"
                );
                this.bricks.push(brick);
            }
        }
        let random_index = Math.floor(Math.random() * this.bricks.length); // selects a random index from the brick array so that that one can be special
        this.special = this.bricks[random_index];
        this.special.setSprite(
            "bomb.webp",
            new Rect(0, 0, 550, 400) //size of bomb image
        );
    }

    draw(ctx) {
        for (let brick of this.bricks) {
            brick.draw(ctx);
        }
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Blocks Destroyed: " + this.destroyedBlocks,20,40);
        ctx.fillText("Lives: " + this.lives,320,40);
        ctx.fillText("Level: " + this.level,550,40);

        if (this.gameOver) {
            if (!this.endsounded){ //making sure audio only plays once
            this.ping3.play();
            this.endsounded = true;
            }
            ctx.fillStyle = "red";
            ctx.font = "70px Arial";
            ctx.fillText(
                "GAME OVER",
                canvasWidth / 2 - 200,
                canvasHeight / 2
            );
        }
        if (this.win) {
            ctx.fillStyle = "green";
            ctx.font = "70px Arial";
            ctx.fillText(
                "YOU WIN",
                canvasWidth/2 - 170,
                canvasHeight/2
            );
        }
        for (let actor of this.actors) {
            actor.draw(ctx);
        }
    }

    update(deltaTime) {
        if (this.gameOver || this.win) {
            return;
        }
        if (this.ball.position.y - this.ball.size.y /2 <= 0) {

            //put ball back inside screen
            this.ball.position.y = this.ball.size.y /2;
        
            //downward bounce
            this.ball.velocity.y = Math.abs(this.ball.velocity.y);
        }
        // Move the paddles
        this.paddle.update(deltaTime);
        // Move the ball
        for (let actor of this.actors) {

            if (actor.type === "ball") {
                actor.update(deltaTime);
            }
        }
        // Left wall bounce
        if (this.ball.position.x - this.ball.size.x /2 <= 0) {
        this.ball.position.x = this.ball.size.x /2;
        this.ball.velocity.x = Math.abs(this.ball.velocity.x);
        }

        // Right wall bounce
        if (this.ball.position.x + this.ball.size.x / 2 >= canvasWidth) {
        this.ball.position.x = canvasWidth - this.ball.size.x /2;
        this.ball.velocity.x = -Math.abs(this.ball.velocity.x);
        }

        if (this.ball.position.y > canvasHeight) { //if ball hits bottom wall
            this.lives--;
            this.ball.reset();
            this.inPlay = false;
            if (this.lives <= 0) {
                this.gameOver = true;
            }
        }

        // Detect collisions with the paddles
        
        for (let actor of this.actors) {

            if (actor.type !== "ball") {
                continue;
            }
        
            if (boxOverlap(this.paddle, actor)) {

            // Put ball above paddle
            this.ball.position.y =
                this.paddle.position.y - this.paddle.size.y / 2 - this.ball.size.y / 2;
        
            // Distance from center of paddle so that the ball doesnt just keep the same angles
            let hitOffset =
                this.ball.position.x - this.paddle.position.x;
        
            hitOffset = hitOffset / (this.paddle.size.x / 2);
        
            //base bounce upward
            this.ball.velocity.y = -Math.abs(this.ball.velocity.y);
        
            //adding a angle depending on where it hit
            this.ball.velocity.x = hitOffset;
            //add paddle movement influence
            if (this.paddle.keys.includes("left")) { //now paddle movement affects where the ball goes
                this.ball.velocity.x -= 0.5;
            }
        
            if (this.paddle.keys.includes("right")) {
                this.ball.velocity.x += 0.5;
            }
        
            // normalize so speed stays consistent
            this.ball.velocity =
                this.ball.velocity.normalize();
            ballSpeed *= speedIncrease;
            this.ping2.play();
        }
    }
        for (let i = this.bricks.length - 1; i >= 0; i--) {

            if (boxOverlap(this.bricks[i], this.ball)) {

                this.ball.velocity.y *= -1;
            
                let hitBrick = this.bricks[i];
            
                //special brick bomb power
                if (hitBrick === this.special) {
                        for (let j = this.bricks.length - 1; j >= 0; j--) { //starting from the back of the array to avoid index issues
                            let distancex =
                                Math.abs(this.bricks[j].position.x - hitBrick.position.x);
                            let distancey =
                                Math.abs(this.bricks[j].position.y - hitBrick.position.y);
            
                            //nearby bricks (110 pixels horizontally 40 vertically)
                            if (distancex <= 110 && distancey <= 40) {
                                this.bricks.splice(j, 1);
                                this.destroyedBlocks++;
                            }
                        }
                    }
            
                //normal bricks
                else {
                    this.bricks.splice(i, 1);
                    this.destroyedBlocks++;
                }
                this.ping.play(); //brick being destroyed sound
                break;
            }
        }
        if (this.bricks.length == 0) { //new level condition
            this.level++;
            if (this.level > 3) {
                this.win = true;
                return;
            }
            this.create_bricks();
            this.ball.reset();
            this.inPlay = false;
        }
}
    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'ArrowLeft') {
                this.addKey('left', this.paddle);
            } if (event.key == 'ArrowRight') {
                this.addKey('right', this.paddle);
            }

            // Get the ball in play
            if (event.key == ' ') {
                // Only if it is not alreay moving
                if (!this.inPlay) {
                    this.ball.serve();
                    this.inPlay = true;
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'ArrowLeft') {
                this.delKey('left', this.paddle);
            } if (event.key == 'ArrowRight') {
                this.delKey('right', this.paddle);
            }
        });
    }

    // Add the key pressed to the 'keys' array of the object sent
    addKey(direction, object) {
        if (!object.keys.includes(direction)) {
            object.keys.push(direction);
        }
    }

    // Remove the key pressed from the 'keys' array of the object sent
    delKey(direction, object) {
        if (object.keys.includes(direction)) {
            object.keys.splice(object.keys.indexOf(direction), 1);
        }
    }
}

//main
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
