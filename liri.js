require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var spotify = require('node-spotify-api');
var spotify = new spotify(keys.spotify);
var request = require("request");
var command_arg = process.argv[2];

switch(command_arg) {

    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        saysThis();
        break;
}


function spotifyThis(songName) {

    var songName = process.argv[3];

    if(!songName){
        songName = "the sign";
    }
    
    var songQuery = songName;

    spotify.search({ type: "track", query: songQuery }, function(err, data) {
        if(!err){
            var songInfo = data.tracks.items;
            for (var i = 0; i < 1; i++) {
                if (songInfo[i] != undefined) {
                    
                    console.log("Artist: " + songInfo[i].artists[0].name + "\r\n" +
                    "Song: " + songInfo[i].name + "\r\n" +
                    "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                    "Preview Url: " + songInfo[i].preview_url + "\r\n");
                }
            }
        }	else {
            console.log("Error :"+ err);
            return;
        }
    });
};


function movieThis(){

    var movie = process.argv[3];

    if(!movie){
        movie = "mr nobody";
    }

    movieQuery = movie;

    request("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&r=json&tomatoes=true&apikey=dc779b6", function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var movieObject = JSON.parse(body);
            
            console.log("Title: " + movieObject.Title+"\r\n"+
            "Year: " + movieObject.Year+"\r\n"+
            "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
            "Country: " + movieObject.Country+"\r\n"+
            "Language: " + movieObject.Language+"\r\n"+
            "Plot: " + movieObject.Plot+"\r\n"+
            "Actors: " + movieObject.Actors+"\r\n"+
            "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
            "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n");
            
        } else {
            console.log("Error :"+ error);
            return;
        }
    });
};

function saysThis() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (!error) {
            var saysThisResults = data.split(",");
            // saysThisResults[0] = process.argv[2];
            // saysThisResults[1] = process.argv[3];

            console.log(saysThisResults);
            
            
        } else {
            console.log("Error occurred" + error);
        }
    });
};

