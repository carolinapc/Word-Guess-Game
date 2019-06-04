//** GLOBAL VARIABLES **/
const WINNER_MESSAGE = "YOU WON! CONGRATULATIONS!<br>Press any key to continue playing";
const DEFEAT_MESSAGE = "SORRY, NOT THIS TIME! TRY AGAIN!<br>Press any key to continue playing";
const FINISH_MESSAGE = "THE END<br>[info]<br>THANK YOU FOR PLAYING!<br>Refresh the page to restart!";
const NUMBER_GUESSES = 8;

var viewWins = document.getElementById("wins");
var viewDefeats = document.getElementById("defeats");
var viewLettersGuessed = document.getElementById("lettersGuessed");
var viewGuessesRemained = document.getElementById("guessesRemained");
var viewWord = document.getElementById("word");
var viewMessage = document.getElementById("message");

var imgDirectory = "assets/images/";
var soundDirectory = "assets/sounds/";


//** GAME OBJECT **/

var game = {
    popSingers: ["Shakira", 
                "Pink", 
                "Ed-Sheeran", 
                "Adele", 
                "Ava-Max", 
                "John-Legend", 
                "Katy-Perry",
                "Ariana-Grande",                
                "Michael-Jackson"],
    // popSingers: [
    //             "Lady-Gaga", 
    //             "Beyonce", 
    //             "Rihanna", 
    //             "Madonna", 
    //             "Ed-Sheeran", 
    //             "Bruno-Mars", 
    //             "Sia",
    //             "Justin-Bieber",
    //             "Shawn-Mendes",
    
    //             "Cristina-Aguilera",
    //             "Miley-Cyrus",
    //             "Luis-Fonsi"],    
    wins: 0,  
    defeats: 0, 
    lettersGuessed: "",
    guessesRemained: NUMBER_GUESSES,
    started: false,
    firstStart: true,
    totallettersGuessed: 0,
    word: "",


    isLetter: function(a){
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return (letters.indexOf(a) >= 0);
    },

    createSingerImg: function(singer){
        var img = document.createElement("img");
        
        img.setAttribute("class", "singer animated rollIn shadow bg-white border rounded-circle");
        img.setAttribute("src", "assets/images/"+singer+".jpg");
        img.setAttribute("alt",singer);
        img.id = singer;
        document.getElementById("singer").appendChild(img);    
    },
    

    reset: function(){
        viewWord.innerHTML = "";
        if(this.word != "")
            document.getElementById(this.word).style.display = "none";

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

        if(this.firstStart){
            //creates the singer pictures
            for(var i=0; i < this.popSingers.length; i++){
                var singer = this.popSingers[i].replace("-","").toUpperCase();
                if(document.getElementById(singer) == null)
                    this.createSingerImg(singer);
                
            }
            
            //play background sound and show the its controls
            document.getElementById("bgsound").style.display = "inline";
            document.getElementById("bgsound").load();
            document.getElementById("bgsound").play();

            this.firstStart = false;

        }

        //reset values
        this.reset();

        if(this.popSingers.length > 0)
        {
            var indexSinger = Math.floor(Math.random() * this.popSingers.length); //pick up one of the indexes of words randomly
            this.word = this.popSingers[indexSinger].toUpperCase(); //pick up the singer 
            this.popSingers.splice(indexSinger,1); //removes the singer from the list to avoid repetition
    
            //creates an element div with element span inside for each letter of the word
            var index=0;
            for(var i=0; i < this.word.length; i++){
                
                //the div tag will wrap the span tag which contains the letter in order to show the blank space
                var div = document.createElement("div"); 
                
    
                //check the dash of the word to ignore it 
                if (this.word[i] != "-"){
                    var span = document.createElement("span"); 
                    
                    span.id = index++; 
                    span.style.visibility = "hidden"; //the span tag will be setted to visible when the user guesses it                
                    span.textContent = this.word[i];         
                    
                    div.appendChild(span); //includes the span tag into the content of the div tag
                    div.classList.add("animated","rotateInUpLeft");
                }
                
                viewWord.appendChild(div); //includes the div tag into the aside tag
            }
            
            //removes dashes in the word to ignore it on the count
            this.word = this.word.replace("-","");
    
            this.started = true;
            document.getElementById("singerNone").style.display = "inline";
            document.getElementById("wrongAnswer").style.display = "none";
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
        for(var i=0; i < this.word.length; i++){
            if(guess == this.word[i])
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
        this.guessesRemained--;
        
    },

    end: function (msg) {
        viewMessage.innerHTML = msg;
        this.started = false;
    },

    winner: function(){
        this.wins++;

        document.getElementById(this.word).style.display = "inline";
        document.getElementById("audioWin").play();
        document.getElementById("audioSource").src = soundDirectory + this.word + ".mp3";
        console.log(soundDirectory + this.word + ".mp3");
        document.getElementById("bgsound").load();
        document.getElementById("bgsound").play();
        this.end(WINNER_MESSAGE);
    },

    loser: function(){
        this.defeats++;
        document.getElementById("audioLose").play();
        for(var i=0; i<this.word.length; i++){
            document.getElementById(i).style.visibility = "visible";
        }
        document.getElementById("wrongAnswer").style.display = "inline";
        this.end(DEFEAT_MESSAGE);
    },

    terminate: function(){
        document.getElementById("audioEnd").play();
        document.getElementById("hm9").style.display = "none";
        document.getElementById("singer").style.display = "none";
        document.getElementById("videoFrame").style.display = "inline";

        var info = "You won " + this.wins + " and lost " + this.defeats + " from " + (this.wins + this.defeats) + " words!";
        this.end(FINISH_MESSAGE.replace("[info]",info));

    },

    updateSummary: function(){
        viewGuessesRemained.textContent = this.guessesRemained;
        viewLettersGuessed.textContent = this.lettersGuessed;
        viewDefeats.textContent = this.defeats;
        viewWins.textContent = this.wins;
    },

    play: function (userGuess){

        if(this.started) {
        
            //check if the user type a letter
            if(userGuess.length > 1 || !this.isLetter(userGuess)){
                this.alert("You didn't type a letter!");
                return;
            }
    
            //check if the user already guessed this letter
            if(this.lettersGuessed.indexOf(userGuess) < 0)
            {
                this.lettersGuessed += userGuess + " ";
    
                //if user miss the guess decrease the amount of possible shots
                if(!this.userGuessHitted(userGuess)){
                    this.hangman();
                }
    
                //check if the user hits all the letters to finish the game or if there are no more shots
                if(this.totallettersGuessed == this.word.length){
                    this.winner();
                }
                else if(this.guessesRemained == 0)
                {
                    this.loser();
                }       
                else
                {
                    this.updateSummary();
                }     
    
            }
            else{
                this.alert("Ooops! You've already tried this one!");
            }
    
        }
        else {
        
            this.start();
        }
    
        this.updateSummary();
    }
    
};
//************ */

//***ON LOAD FUNCTION */
document.body.onload = function(){
    
    var keyboard = document.getElementById("keyboard");
    var kbletters = "QWERTYUIOP-ASDFGHJKL-ZXCVBNM";
    //creates the keyboard buttons
    for(i=0; i < kbletters.length; i++){
        var btn;

        if(kbletters[i] != "-")
        {
            btn = document.createElement("button");
            btn.id = kbletters[i];
            btn.value = btn.id;
            btn.textContent = btn.id;
             
            btn.setAttribute("onClick","game.play('"+kbletters[i]+"')");
        }
        else{
            btn = document.createElement("br");
        }

        keyboard.append(btn);
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
