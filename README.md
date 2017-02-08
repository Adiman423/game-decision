# GameJudgement

Hello and welcome to GameJudgement.

## What is GameJudgement?

GameJudgement is a new web app that allows gamers to find out if they should buy a game.

## How does it work?

There are a few different parts to this web app.  We also have the backend which is powered by NodeJS and ExpressJS. We also have the frontend which has the search feature and a feature that called Recent Releases. Let's start by taking a look at the backend.

## The Backend (ExpressJS and NodeJS)

On the backend we are starting up a web server that runs on port 8080 which was written with both [NodeJS](https://nodejs.org/en/) and [Express JS](http://expressjs.com/).

At the same time on that server, there is a request being made to the [Steam Web API](https://steamcommunity.com/dev). This request fetches the full list of every single title currently on the Steam Store (an online store for PC games and applications). This is captured into an array of Javascript objects stored in the JSON format. To decrease the amount of data that the client will request, items like trailers, soundtracks were deleted from the list before the array is then saved to a JSON file ready for the client to request.

Of course, new games and applications are released onto the steam store on a regular basis. By using the Node Schedule plugin for NodeJS, a new list of titles on steam is requested every hour.

Last but not least, GZIP compression is being used in order to reduce the amount of data being sent to the client, therefore increasing the speed of the site.

## The Frontend (AngularJS, CSS, HTML and Bootstrap)
### The Search Feature
Let's now take a look at the front end starting with the search feature. When the user comes to the site, they will see a form. At the same time the list of items on the Steam store is also requested.

In the form they can enter the name of the game that they would like to search for. If they wish they can set a threshold which is the target score out of 100 that will be used to determine if a game is worth buying (or not). If the user does not set a threshold then it is set to 75 by default.

The user can then hit the "Search" button which will send a request using Angular JS to the [IGDB(The Internet Game Database)](http://www.igdb.com) API. IGDB is a website which contains information on various video games (including reviews, trailers, release dates etc.).

The request comes back with JSON object. This JSON object contains the following information:
* The name of a game
* An aggregrate score of all reviews from various publications
* An average score of all reviews from IGDB users.
* The cover/box art for a game (this is typically the picture that you seee on the front of a box when you buy a game)
* The URL which is a link to the game's reviews page on IGDB.

This will then generate a list of 10 results for different games shown in a table (generated with an angular component and HTML's div tags). The information that is displayed is as follows:
* The name of a game
* An aggregrate score of all reviews from various publications (known as the press rating). Below the press rating you will also see a link to see the reviews for that game.

* An average score of all reviews from IGDB users (known as the players' rating).

* The verdict for a game. If a game's press rating is above the target score set by the user, then we display a verdict of "BUY!!". If not then the verdict for that game is "DON'T BUY"!. If the press rating is not available then the players rating is used as a fallback to determine the verdict.
If neither is available then no verdict is given.

* The cover/box art for the game. This part of the table will show "No image available" If the cover/box art is not available.

* If a game is worth buying then a link to buy the game on the Steam store is generated.

At this point Angular will go through the list of games on the steam store. If a game's name matches the name for that game on the steam store then a link to the Steam store is generated. It will also check if the alternative name (as shown on IGDB) matches the name for a game on steam.

Furthermore, there are some game names that don't quite match up. For example, take a game called Watch Dogs. On the Steam Store it's displayed as Watch_Dogs. This game is stored on IGDB as Watch Dogs. Therefore, I have a function called GameNameCleaner. When the game name from IGDB is run through the function, remove the underscore and if it matches with the game name stored in IGDB then we assign the name from Steam to the IGDB entry.

### Recent Releases

Recent Releases is a feature where the user can see a list of 10 games that were released anywhere in the last three months. In the aforementioned form the user leaves the game name field blank and types in the threshold (out of 100). They can then click on the recent releases button.

At this point the functionality is similar to the search feature in as far it makes a request to the IGDB API. However, the request filters games that have been released between the current date and time and three months ago (measured in number of milliseconds since the 1st of January 1970). This also filters the results from the request to games that have been released on PC.

Similarly to the search feature it will display the following:
* The game name
* The press rating along with a link to view the games
* The players' rating
* A verdict - If both the press rating and players' rating are not available then "No verdict" will be displayed
* Cover/box art for a game
* A link to the steam store if a game is worth buying.

One thing I should also mention is that if a game is not been released on PC it will tell you that this is the case.

Again, as with the search feature, it will also match alternative names for a game (as shown on IGDB)

## CSS and Bootstrap

I used Twitter's [Bootstrap](http://getbootstrap.com/) framework in order to enable my site to be mobile friendly/mobile responsive.

One of the challenges of putting this site together was to do with Angular's components. With HTML's legacy <table> tag, the data from the IGDB API would display but would up outside of the table. To overcome this, I took advantage of HTML's div tags and the display property to have a browser think that it's looking at a div tag as a table cell, table row or table header.

Additionally I also used a Font from [Google Fonts](https://fonts.google.com). As well as putting a link tag in the index.html file which requests the font from the Google Fonts API, the font must also be added to the CSS for the site. In this case I added it into bootstrap.min.css.

To ensure that the adverts being served up via Google Adsense were also responsive, the code had to be modified as well.

## Optimisations

As well as using GZIP compression there were some other things done in order to optimise the performance of the web app.

All code for the controllers and components for the search and recent releases features has been minified.

This code was combined with the AngularJS framework, JQuery and the Bootstrap framework into one .js file holding all the frontend code, and reducing the number of requests being made by the browser.

This was done using [Gulp](http://gulpjs.com/). One Gulp task was created to minify the code for the controllers and components and another Gulp task was created to combine the components and controllers with the .js files for Angular JS, Bootstrap and jQuery.

Similarly the CSS files have been minified and combined as well to further reduce the number of requests being made by the browser.

## Which Browsers do you support?

Right now in terms of desktop and laptop computers, this web app supports:
* Microsoft Edge
* Internet Explorer 10 and 11
* Google Chrome
* Opera
* Mozilla Firefox
* Safari

If you are on Linux, then that's OK because I can confirm that this web app will also work on Ubuntu Linux going all the way back to 11.04.

You might ask at this point, what about mobile browsers? Well here's the list that browsers that are supported:
* iOS : Safari on iOS 7.1 or higher
* Android : Google Chrome, Firefox and other browsers on Android 4.2 or higher.

That about wraps it up for the behind the scenes look at this project. Thanks for reading and I hope that you will also check the web app out.
