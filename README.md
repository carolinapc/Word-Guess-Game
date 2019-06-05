# Word-Guess-Game

This is a hangman game with pop singers theme!

The goal of the game is to guess the name of the pop singer letter by letter.

The game starts when the user presses any key or clicks on the keyboard (shown in the small devices only).

Once it starts the blank spaces shows up for the user type any key to begin guessing the word.

If the user types the correct word, the singer's song starts to play (with a short victory sound effect) in the background as well as the singer's picture.

If the user loses, the background sound remains the same a defeated sound effect is played as well.

There is a score that counts the number of wins and the loses for each word. In addition for every play there is a score for incorrect guessed letter that matches the build of the hangman.

Once the game is over (all the singers guessing attempts are completed) a video from youtube is shown containing a sequence of the best pop songs.

[Play the Game!](https://carolinapc.github.io/Word-Guess-Game)

## Support

### Adding new singers

* On the **game.js** file add the singer into the **popSinger** list. For singers with more then one word use **dash sign** (-) instead of spaces.
* Add a *.jpg* file of the singer's picture (dimensions: 225px x 225px) into the **assets/images/** folder. The name of the sound **MUST** be **CAPITALIZED** and matched with the name of the singer without dashes or spaces.
* Add a *.mp3* file of the singer's song into the **assets/sounds/** folder. The name of the sound **MUST** be **CAPITALIZED** and matched with the name of the singer without dashes or spaces.

