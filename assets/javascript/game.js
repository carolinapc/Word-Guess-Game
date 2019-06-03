//** GLOBAL VARIABLES **/
var popSingers = ["Shakira", "Pink", "Lady-Gaga", "Katy-Perry", "Beyonce", "Adele", "Rihanna", "Madonna", "Ed-Sheeran", "Bruno-Mars", "Sia"];

const WINNER_MESSAGE = "YOU WON! CONGRATULATIONS!<br>Press any key to continue playing";
const DEFEAT_MESSAGE = "SORRY, NOT THIS TIME! TRY AGAIN!<br>Press any key to continue playing";
const FINISH_MESSAGE = "THE END! THANK YOU FOR PLAYING!";
const NUMBER_GUESSES = 8;

var viewWins = document.getElementById("wins");
var viewDefeats = document.getElementById("defeats");
var viewLettersGuessed = document.getElementById("lettersGuessed");
var viewGuessesRemained = document.getElementById("guessesRemained");
var viewWord = document.getElementById("word");
var viewMessage = document.getElementById("message");

var imgDirectory = "assets/images/";
//*********************/

//** GLOBAL FUNCTIONS **/
function isvarter(a){
    var varters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ";
    return (varters.indexOf(a) >= 0);
}
//*********************/

//** GAME OBJECT **/

var game = {
    wins: 0,  
    defeats: 0, 
    lettersGuessed: "",
    guessesRemained: NUMBER_GUESSES,
    started: false,
    totallettersGuessed: 0,
    word: "",
    
    reset: function(){
        viewWord.innerHTML = "";
        if(game.word != "")
            document.getElementById(game.word).style.display = "none";

        document.getElementById("singerNone").style.display = "inline";
        document.getElementById("wrongAnswer").style.display = "none";

        this.lettersGuessed = "";
        this.guessesRemained = NUMBER_GUESSES;
        this.totallettersGuessed = 0;
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
    
            //creates an element div with element span inside for each varter of the word
            var index=0;
            for(var i=0; i < game.word.length; i++){
                
                //the div tag will wrap the span tag which contains the varter in order to show the blank space
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
    
            game.started = true;
            document.getElementById("singerNone").style.display = "inline";
            document.getElementById("wrongAnswer").style.display = "none";
            viewMessage.textContent = "";
    
        }
        else{
            this.terminate();
        }

    },
    
    //checks whether user hitted the varter and returns true or false
    userGuessHitted: function(guess){
        var hitted = false;
        this.alert("");

        //loop through the varters of the word 
        for(var i=0; i < game.word.length; i++){
            if(guess == game.word[i])
            {
                document.getElementById(i).style.visibility = "visible";
                this.totallettersGuessed++;
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
        document.getElementById(game.word).style.display = "inline";
        this.end(WINNER_MESSAGE);
    },

    loser: function(){
        game.defeats++;
        for(var i=0; i<game.word.length; i++){
            document.getElementById(i).style.visibility = "visible";
        }
        document.getElementById("wrongAnswer").style.display = "inline";
        this.end(DEFEAT_MESSAGE);
    },

    terminate: function(){
        document.getElementById("hm9").style.display = "none";
        document.getElementById("singer").style.display = "none";
        document.getElementById("videoFrame").style.display = "inline";

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
        
            //check if the user type a varter
            if(userGuess.length > 1 || !isvarter(userGuess)){
                game.alert("You didn't type a varter!");
                return;
            }
    
            //check if the user already guessed this varter
            if(game.lettersGuessed.indexOf(userGuess) < 0)
            {
                game.lettersGuessed += userGuess + " ";
    
                //if user miss the guess decrease the amount of possible shots
                if(!game.userGuessHitted(userGuess)){
                    game.hangman();
                }
    
                //check if the user hits all the varters to finish the game or if there are no more shots
                if(game.totallettersGuessed == game.word.length){
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
//************ */

//***ON LOAD FUNCTION */
document.body.onload = function(){
    
    var keyboard = document.getElementById("keyboard");
    var kbvarters = "QWERTYUIOP-ASDFGHJKL-ZXCVBNM";
    //creates the keyboard buttons
    for(i=0; i < kbvarters.length; i++){
        var btn;

        if(kbvarters[i] != "-")
        {
            btn = document.createElement("button");
            btn.id = kbvarters[i];
            btn.value = btn.id;
            btn.textContent = btn.id;
             
            btn.setAttribute("onClick","game.play('"+kbvarters[i]+"')");
        }
        else{
            btn = document.createElement("br");
        }

        keyboard.append(btn);
    }


    for(var i=0; i < popSingers.length; i++){
        var singer = popSingers[i].replace("-","").toUpperCase();
        var img = document.createElement("img");
        //img.src = "assets/images/"+singer+".jpg";
        img.setAttribute("class", "singer animated rollIn shadow bg-white border rounded-circle");
        img.setAttribute("src", "assets/images/"+singer+".jpg");
        img.id = singer;
        document.getElementById("singer").appendChild(img);    
    }
}

//************/
//*** MAIN ***/
document.onkeyup = function(event) {
    // Determines which key was pressed.
    var userGuess = event.key.toUpperCase();
    
    game.play(userGuess);
};
//************/
