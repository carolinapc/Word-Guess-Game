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
                "Lady-Gaga",                                
                "Sia",                
                "Beyonce",                 
                "Rihanna", 
                "Madonna", 
                "Bruno-Mars", 
                "Justin-Bieber",
                "Shawn-Mendes",
                "Cristina-Aguilera",
                "Miley-Cyrus",
                "Luis-Fonsi",    
                "Demi-Lovato",
                "Michael-Jackson"],

    /**Constants */
    WINNER_MESSAGE: "YOU WON! CONGRATULATIONS!<br>Press any key to continue...",
    DEFEAT_MESSAGE: "SORRY, NOT THIS TIME! TRY AGAIN!<br>Press any key to continue...",
    FINISH_MESSAGE: "THE END<br>[info]<br>THANK YOU FOR PLAYING!<br>Refresh the page to restart!",
    NUMBER_GUESSES: 8,
    IMG_DIRECTORY: "assets/images/",
    SND_DIRECTORY: "assets/sounds/",

    /**Variables */
    wins: 0,  
    defeats: 0, 
    totallettersGuessed: 0,
    lettersGuessed: "",
    guessesRemained: 8,
    started: false,
    firstStart: true,
    word: "",

    /**DOM Elements */
    domWins: document.getElementById("wins"),
    domDefeats: document.getElementById("defeats"),
    domLettersGuessed: document.getElementById("lettersGuessed"),
    domGuessesRemained: document.getElementById("guessesRemained"),
    domWord: document.getElementById("word"),
    domMessage: document.getElementById("message"),  
    domWrapImgSinger: document.getElementById("singer"),  
    domWrapLettersGuessed: document.getElementById("wrapLettersGuessed"),
    domImgSingerNone: document.getElementById("singerNone"),
    domImgWrongAnswer: document.getElementById("wrongAnswer"),
    domBgSound: document.getElementById("bgsound"),
    domAudioWin: document.getElementById("audioWin"),
    domAudioLose: document.getElementById("audioLose"),
    domAudioEnd: document.getElementById("audioEnd"),
    domVideoFrame: document.getElementById("videoFrame"),
    domKeyboard: document.getElementById("keyboard"),
    domAudioSource: document.getElementById("audioSource"),

    /**General Functions */
    isLetter: function(a){
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return (letters.indexOf(a) >= 0);
    },

    createSingerImg: function(singer){
        var img = document.createElement("img");
        
        img.setAttribute("class", "singer animated rollIn shadow bg-white border rounded-circle");
        img.setAttribute("src", this.IMG_DIRECTORY + singer + ".jpg");
        img.setAttribute("alt",singer);
        img.id = singer;
        this.domWrapImgSinger.appendChild(img);    
    },
    
    /**Game Functions */
    reset: function(){
        this.domWord.innerHTML = "";
        if(this.word != "")
            document.getElementById(this.word).style.display = "none";

        this.domImgSingerNone.style.display = "inline";
        this.domImgWrongAnswer.style.display = "none";

        this.lettersGuessed = "";
        this.guessesRemained = this.NUMBER_GUESSES;
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
            this.domBgSound.style.display = "inline";
            //this.domBgSound.load();
            this.domBgSound.play();

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
                
                this.domWord.appendChild(div); //includes the div tag into the aside tag
            }
            
            //removes dashes in the word to ignore it on the count
            this.word = this.word.replace("-","");
    
            this.started = true;
            this.domImgSingerNone.style.display = "inline";
            this.domImgWrongAnswer.style.display = "none";
            this.domMessage.textContent = "";
    
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
        this.domMessage.innerHTML = msg;
    },

    //show hangman images when the user misses a letter
    hangman: function(){
        
        document.getElementById("hm"+this.guessesRemained).style.display = "block";
        this.guessesRemained--;
        
    },

    //common action when the user wins or loses each battle
    end: function (msg) {
        this.domMessage.innerHTML = msg;
        this.started = false;
    },

    //actions when the user wins a battle
    winner: function(){
        this.wins++;

        document.getElementById(this.word).style.display = "inline";
        this.domAudioWin.play();
        this.domAudioSource.src = this.SND_DIRECTORY + this.word + ".mp3";
        
        this.domBgSound.load();
        this.domBgSound.play();
        this.end(this.WINNER_MESSAGE);
    },

    //actions when the user loses a battle
    loser: function(){
        this.defeats++;
        this.domAudioLose.play();
        for(var i=0; i<this.word.length; i++){
            document.getElementById(i).style.visibility = "visible";
        }
        this.domImgWrongAnswer.style.display = "inline";
        this.end(this.DEFEAT_MESSAGE);
    },

    //actions when the game is over (no more battles/words to show)
    terminate: function(){
        this.domAudioEnd.play();
        document.getElementById("hm9").style.display = "none";
        this.domWrapImgSinger.style.display = "none";
        this.domVideoFrame.style.display = "inline";
        this.domKeyboard.style.display = "none";
        this.domWrapLettersGuessed.style.display = "none";
        this.domKeyboard.style.display = "none";

        var info = "You won " + this.wins + " and lost " + this.defeats + " from " + (this.wins + this.defeats) + " words!";
        this.end(this.FINISH_MESSAGE.replace("[info]",info));

    },

    //uptades the score
    updateSummary: function(){
        this.domGuessesRemained.textContent = this.guessesRemained;
        this.domLettersGuessed.textContent = this.lettersGuessed;
        this.domDefeats.textContent = this.defeats;
        this.domWins.textContent = this.wins;
    },

    //actions when the user play (press a key or click a button)
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
