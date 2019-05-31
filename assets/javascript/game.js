let popSingers = ["Shakira", "Pink", "Lady-Gaga", "Katy-Perry", "Beyonce", "Adele", "Rihanna", "Ariana-Grande"];

const WINNER_MESSAGE = "CONGRATULATIONS!! YOU WON!<br>Press any key to start the next one!";
const DEFEAT_MESSAGE = "SORRY, NOT THIS TIME! TRY AGAIN!<br>Press any key to start the next one!";
const FINISH_MESSAGE = "THE END! THANK YOU!";
const NUMBER_GUESSES = 8;

let viewWins = document.getElementById("wins");
let viewDefeats = document.getElementById("defeats");
let viewLettersGuessed = document.getElementById("lettersGuessed");
let viewGuessesRemained = document.getElementById("guessesRemained");
let viewWord = document.getElementById("word");
let viewMessage = document.getElementById("message");

function isLetter(a){
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ";
    return (letters.indexOf(a) >= 0);
}

let game = {
    wins: 0,  
    defeats: 0, 
    lettersGuessed: "",
    guessesRemained: NUMBER_GUESSES,
    started: false,
    totalLettersGuessed: 0,
    word: "",
    
    reset: function(){
        viewWord.innerHTML = "";
        this.lettersGuessed = "";
        this.guessesRemained = NUMBER_GUESSES;
        this.totalLettersGuessed = 0;
        for(var i=1; i <= this.guessesRemained; i++){
            document.getElementById("hm"+i).style.display = "none";
        }

        this.updateSummary();

    },

    //starts the game/picks new word
    start: function(){

        //reset values
        this.reset();

        if(popSingers.length > 0)
        {
            var indexSinger = Math.floor(Math.random() * popSingers.length); //pick up one of the indexes of words randomly
            game.word = popSingers[indexSinger].toUpperCase(); //pick up the singer 
            popSingers.splice(indexSinger,1); //removes the singer from the list to avoid repetition
    
            //creates an element div with element span inside for each letter of the word
            var index=0;
            for(var i=0; i < game.word.length; i++){
                
                //the div tag will wrap the span tag which contains the letter in order to show the blank space
                var div = document.createElement("div"); 
                
    
                //check the dash of the word to ignore it 
                if (game.word[i] != "-"){
                    var span = document.createElement("span"); 
                    
                    span.id = index++; 
                    span.style.visibility = "hidden"; //the span tag will be setted to visible when the user guesses it                
                    span.textContent = game.word[i];         
                    
                    div.appendChild(span); //includes the span tag into the content of the div tag
                    div.classList.add("animated","rotateInUpLeft");
                }
                
                viewWord.appendChild(div); //includes the div tag into the aside tag
            }
            
            //removes dashes in the word to ignore it on the count
            game.word = game.word.replace("-","");
            console.log(game.word);
    
            game.started = true;
            viewMessage.textContent = "";
    
        }
        else{
            this.terminate();
        }

    },
    
    //checks whether user hitted the letter and returns true or false
    userGuessHitted: function(guess){
        var hitted = false;
        this.alert("");

        //loop through the letters of the word 
        for(var i=0; i < game.word.length; i++){
            if(guess == game.word[i])
            {
                document.getElementById(i).style.visibility = "visible";
                this.totalLettersGuessed++;
                hitted = true;
            }
        }
        
        return hitted;
    },

    alert: function(msg){
        viewMessage.innerHTML = msg;
    },

    hangman: function(){
        
        document.getElementById("hm"+this.guessesRemained).style.display = "block";
        game.guessesRemained--;
        
    },

    end: function (msg) {
        viewMessage.innerHTML = msg;
        this.started = false;
    },

    winner: function(){
        game.wins++;

        this.end(WINNER_MESSAGE);
    },

    loser: function(){
        game.defeats++;

        this.end(DEFEAT_MESSAGE);
    },

    terminate: function(){
        this.end(FINISH_MESSAGE);

    },

    updateSummary: function(){
        viewGuessesRemained.textContent = game.guessesRemained;
        viewLettersGuessed.textContent = game.lettersGuessed;
        viewDefeats.textContent = game.defeats;
        viewWins.textContent = game.wins;
    },

    play: function (userGuess){

        if(game.started) {
        
            //check if the user type a letter
            if(userGuess.length > 1 || !isLetter(userGuess)){
                game.alert("You didn't type a letter!");
                return;
            }
    
            //check if the user already guessed this letter
            if(game.lettersGuessed.indexOf(userGuess) < 0)
            {
                game.lettersGuessed += userGuess + " ";
    
                //if user miss the guess decrease the amount of possible shots
                if(!game.userGuessHitted(userGuess)){
                    game.hangman();
                }
    
                //check if the user hits all the letters to finish the game or if there are no more shots
                if(game.totalLettersGuessed == game.word.length){
                    game.winner();
                }
                else if(game.guessesRemained == 0)
                {
                    game.loser();
                }       
                else
                {
                    game.updateSummary();
                }     
    
            }
            else{
                game.alert("Ooops! You've already tried this one!");
            }
    
        }
        else {
            game.start();
        }
    
        game.updateSummary();
    }
    
};



document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key.toUpperCase();
    
    game.play(userGuess);
};
