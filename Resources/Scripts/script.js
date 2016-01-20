// Canvas dimentions: 800px by 500px
// Well dimentions: 200px by 400px
// Standard tetrix grid dimentions: 10 x 20 boxes
// A figure element (box) will 20px by 20px

// ==================== DEFINITION OF COMMON VARIABLES ====================

var canvas;
var context;
var width;
var height;
var mouseX;
var mouseY;

var redrawingIsNeeded = true;
var redrawInterval = 20;
var redrawIntervalHandle = setInterval(null, redrawInterval);

var timer = new Timer();

var difficultyOptions = { easy: 'easy', normal: 'normal', hard: 'hard' };
var chosenDifficulty = difficultyOptions.normal;

var score = 0;

function getMousePosition(eventObject) {
    mouseX = eventObject.pageX - canvas.offsetLeft;
    mouseY = eventObject.pageY - canvas.offsetTop;
}

function getEnvironment() {
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    canvas.onselectstart = function() { return false; };  // Preventing double clicking from selecting outside text

    width = canvas.width;
    height = canvas.height;
}

// ==================== DEFINITION OF BUTTONS AND THEIR BEHAVIOUR ====================

function Button(x,y,w,h,color,name) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.name = name;
    this.draw = function() {
        context.fillStyle = this.color;
        context.fillRect(this.x,this.y,this.w,this.h);
    }
}

var buttonName = { 
    play: "play", 
    options: "options", 
    help: "help", 
    exit: "exit", 
    easy: "easy", 
    normal: "normal", 
    hard: "hard" 
};

var buttons = [];
buttons.push(new Button(250,200,300,50,"gray", buttonName.play));
buttons.push(new Button(250,300,300,50,"gray", buttonName.options));
buttons.push(new Button(250,400,300,50,"gray", buttonName.help));

function highlightButton(eventObject) {
    getMousePosition(eventObject);

    // Looping through the buttons to find if the mouse is over one
    for (var i = 0; i < buttons.length; i++) {
        var currentButton = buttons[i];            
        var mouseOverlapsButtonOnX = mouseX > currentButton.x && mouseX < currentButton.x + currentButton.w;
        var mouseOverlapsButtonOnY = mouseY > currentButton.y && mouseY < currentButton.y + currentButton.h;

        if (mouseOverlapsButtonOnX && mouseOverlapsButtonOnY) {
            if (buttons[i].color == "gray") {
                buttons[i].color = "orange";
                redrawingIsNeeded = true;
                console.log("redrawing");
            }
        } else if (buttons[i].color == "orange") {
            buttons[i].color = "gray";
            redrawingIsNeeded = true;
            console.log("redrawing");
        }
    }
}

function pressButton(eventObject) {

    getMousePosition(eventObject);

    // Looping through the buttons to find if the mouse is over one
    for (var i = 0; i < buttons.length; i++) {
        var currentButton = buttons[i];            
        var mouseOverlapsButtonOnX = mouseX > currentButton.x && mouseX < currentButton.x + currentButton.w;
        var mouseOverlapsButtonOnY = mouseY > currentButton.y && mouseY < currentButton.y + currentButton.h;

        if (mouseOverlapsButtonOnX && mouseOverlapsButtonOnY) {
            buttons[i].color = "yellow";
            redrawingIsNeeded = true;
        }
    }
}

function releaseButton(eventObject) {

    getMousePosition(eventObject);

    // Looping through the buttons to find if the mouse is over one
    for (var i = 0; i < buttons.length; i++) {
        var currentButton = buttons[i];            
        var mouseOverlapsButtonOnX = mouseX > currentButton.x && mouseX < currentButton.x + currentButton.w;
        var mouseOverlapsButtonOnY = mouseY > currentButton.y && mouseY < currentButton.y + currentButton.h;

        if (mouseOverlapsButtonOnX && mouseOverlapsButtonOnY) {

            buttons[i].color = "orange"; // may be removed after all options are implemented
            redrawingIsNeeded = true; // may be removed after all options are implemented

            // BUTTON SPECIFIC CODE HERE
            
            switch(buttons[i].name) {
                    
                case buttonName.play:
                    beginGame();
                    timer.startPause();
                    break;
                    
                case buttonName.options:
                    showGameOptions();
                    break;
                    
                case buttonName.help:
                    showGameHelp();
                    break;
                
                case buttonName.exit:
                    initialize();
                    break;
                    
                case buttonName.easy:
                    chosenDifficulty = difficultyOptions.easy;
                    break;
                    
                case buttonName.normal:
                    chosenDifficulty = difficultyOptions.normal;
                    break;
                    
                case buttonName.hard:
                    chosenDifficulty = difficultyOptions.hard;
                    break;
                    
                default:
            }
            
        } 
    }
}

// ==================== DEFINITION OF THE SEPARATE STAGES OF THE GAME ====================

function initialize() {
    getEnvironment();
    
    // Initial drawing
    initializeStartScreenElements();
    drawStartScreen();

    // Drawing loop
    clearInterval(redrawIntervalHandle);
    redrawIntervalHandle = setInterval(drawStartScreen, redrawInterval);
    
        
    // Defining mouse events
    canvas.onmousemove = highlightButton;
    canvas.onmousedown = pressButton;
    canvas.onmouseup = releaseButton;
}

function showGameOptions() {
    
    // Initial drawing
    initializeOptionsScreenElements();
    drawOptionsScreen();

    // Drawing loop
    clearInterval(redrawIntervalHandle);
    redrawIntervalHandle = setInterval(drawOptionsScreen, redrawInterval);
}

function showGameHelp() {
    
    // Initial drawing
    initializeHelpScreenElements();
    drawHelpScreen();

    // Drawing loop
    clearInterval(redrawIntervalHandle);
    redrawIntervalHandle = setInterval(drawHelpScreen, redrawInterval);
}


function beginGame() {
    
    // Initial drawing
    initializeGameplayElements();
    drawGamePlay();

    // Drawing loop
    clearInterval(redrawIntervalHandle);
    redrawIntervalHandle = setInterval(drawGamePlay, redrawInterval);
    
    // Defining events
        // TODO: Keypress events to be defined
}

// ==================== PERFORMING INITIALIZATION ====================

window.onload = function() {
    initialize();
}
