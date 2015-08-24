/* 
  #####################################################################
  ##                        ~~  COMBINER  ~~                         ##
  #####################################################################

Write a module that returns a readable/writable stream using the
`stream-combiner` module. You can use this code to start with:

    var combine = require('stream-combiner')
    
    module.exports = function () {
        return combine(
            // read newline-separated json,
            // group books into genres,
            // then gzip the output
        )
    }
 
Your stream will be written a newline-separated JSON list of science fiction
genres and books. All the books after a `"type":"genre"` row belong in that
genre until the next `"type":"genre"` comes along in the output.

    {"type":"genre","name":"cyberpunk"}
    {"type":"book","name":"Neuromancer"}
    {"type":"book","name":"Snow Crash"}
    {"type":"genre","name":"space opera"}
    {"type":"book","name":"A Deepness in the Sky"}
    {"type":"book","name":"Void"}
    
Your program should generate a newline-separated list of JSON lines of genres,
each with a `"books"` array containing all the books in that genre. The input
above would yield the output:

    {"name":"cyberpunk","books":["Neuromancer","Snow Crash"]}
    {"name":"space opera","books":["A Deepness in the SKy","Void"]}

Your stream should take this list of JSON lines and gzip it with
`zlib.createGzip()`.

* HINTS *

The `stream-combiner` module creates a pipeline from a list of streams,
returning a single stream that exposes the first stream as the writable side and
the last stream as the readable side like the `duplexer` module, but with an
arbitrary number of streams in between. Unlike the `duplexer` module, each
stream is piped to the next. For example:

    var combine = require('stream-combiner');
    var stream = combine(a, b, c, d);
    
will internally do `a.pipe(b).pipe(c).pipe(d)` but the `stream` returned by
`combine()` has its writable side hooked into `a` and its readable side hooked
into `d`.

As in the previous LINES adventure, the `split` module is very handy here. You
can put a split stream directly into the stream-combiner pipeline.

If you end up using `split` and `stream-combiner`, make sure to install them
into the directory where your solution file resides by doing:

    npm install stream-combiner split

*/


/* 
Let's think about what we want to do with each line of JSON.  
If the JSON object's type property is equal to "genre", then 
we want to set our genre object's name property to the name 
of the genre given in the line of json.  
We then assume that all of the next few objects will be part 
of that genre until a new genre comes along.  So we take each 
line of JSON that comes after the genre, and push it to an 
array which we store under the 'books' property of our genre 
object.  

I think we can use closures and recursion to accomplish this 
with ease. 
*/

// ATTEMPT #1
// var combine = require('stream-combiner'), 
// 	zlib = require('zlib'), 
// 	through = require('through'), 
// 	split = require('split'), 
// 	gzip = zlib.createGzip();

// module.exports = function () {


// 	return combine(
// 		split(), 
// 		through(groupGenre()), 
// 		gzip
// 	);
// }

// function groupGenre(genreObj) {

// 	return function handleBuffer(lineBuffer) {
// 		var jsonLine; 
// 		jsonLine = JSON.parse(lineBuffer.toString());
	
// 		if (jsonLine.type === "genre") {
// 			if (typeof genreObj === "object" && Object.keys(genreObj).length) {
// 				this.queue(JSON.stringify(genreObj) + "\n"); 
// 			}
// 			genreObj = {name: jsonLine.name, books: []}; 
// 			return groupGenre(genreObj); 
// 		} 

// 		if (jsonLine.type === "book") {
// 			genreObj.books.push(jsonLine.name); 
// 			return groupGenre(genreObj); 
// 		} 

// 		if (!jsonLine) {
// 			return false; 
// 		} 
// 	}
// } 

// The above is getting too complex.  A preferred solution would 
// probably be much simpler.  

// ATTEMPT #2
// Let's break all the various operations down into discrete functions.   
var combine = require('stream-combiner'), 
	through = require('through'), 
	split = require('split'), 
	zlib = require('zlib'); 

function stringifyObj(obj) {

	return JSON.stringify(obj); 
}

function stringifyGenres(arr) {

	return arr
		.map(stringifyObj)
		.join("\n"); 
}

function handleGenreJson(genres) {
	return function (obj) {
		genres.push({
			name: obj.name, 
			books: []
		});
	};
}

function handleBookJson(genres) {
	return function (obj) {
		genres[genres.length -1].books.push(obj.name);
	};
}

function handleJsonLine(genres) {
	return function (lineBuffer) {
		var json;

		try {
			json = JSON.parse(lineBuffer.toString())
		} catch (e) {}

		if (json && json.type === "genre") {
			handleGenreJson(genres)(json); 
		} 

		if (json && json.type === "book") {
			handleBookJson(genres)(json); 
		}		
	}
}

function handleEndOfInput(genres) {

	return function () {
		this.queue(stringifyGenres(genres), "\n", null); 
	}
}

module.exports = function () {
	var genreArray = []; 

	return combine(
		split(), 
		through(
			handleJsonLine(genreArray), 
			handleEndOfInput(genreArray)), 
		zlib.createGzip()
	);	
}; 

/* 
ACTUAL:   "{\"name\":\"time travel\",\"books\":[\"The Time Machine\",\"A Connecticut Yankee in King Arthur's Court\"]}"
EXPECTED: "{\"name\":\"time travel\",\"books\":[\"The Time Machine\",\"A Connecticut Yankee in King Arthur's Court\"]}"

ACTUAL:   "{\"name\":\"new wave\",\"books\":[\"Dangerous Visions\",\"Bug Jack Barron\",\"The Heat Death of the Universe\"]}"
EXPECTED: "{\"name\":\"new wave\",\"books\":[\"Dangerous Visions\",\"Bug Jack Barron\",\"The Heat Death of the Universe\"]}"

ACTUAL:   "{\"name\":\"cyberpunk\",\"books\":[\"Neuromancer\",\"Snow Crash\",\"Heavy Weather\",\"Accelerando\",\"The Diamond Age\"]}"
EXPECTED: "{\"name\":\"cyberpunk\",\"books\":[\"Neuromancer\",\"Snow Crash\",\"Heavy Weather\",\"Accelerando\",\"The Diamond Age\"]}"

ACTUAL:   "{\"name\":\"space opera\",\"books\":[\"A Deepness in the Sky\",\"Void\",\"Skylark\"]}"
EXPECTED: "{\"name\":\"space opera\",\"books\":[\"A Deepness in the Sky\",\"Void\",\"Skylark\"]}"

ACTUAL:   "{\"name\":\"alternate history\",\"books\":[\"Bring the Jubilee\",\"The Man in the High Castle\"]}"
EXPECTED: "{\"name\":\"alternate history\",\"books\":[\"Bring the Jubilee\",\"The Man in the High Castle\"]}"

ACTUAL:   "{\"name\":\"apocalypse\",\"books\":[\"Earth Abides\",\"Riddley Walker\",\"Alas, Babylon\"]}"
EXPECTED: "{\"name\":\"apocalypse\",\"books\":[\"Earth Abides\",\"Riddley Walker\",\"Alas, Babylon\"]}"

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to COMBINER passed!

Here's what the official solution is if you want to compare notes:

    var combine = require('stream-combiner');
    var through = require('through');
    var split = require('split');
    var zlib = require('zlib');
    
    module.exports = function () {
        var grouper = through(write, end);
        var current;
        
        function write (line) {
            if (line.length === 0) return;
            var row = JSON.parse(line);
            
            if (row.type === 'genre') {
                if (current) {
                    this.queue(JSON.stringify(current) + '\n');
                }
                current = { name: row.name, books: [] };
            }
            else if (row.type === 'book') {
                current.books.push(row.name);
            }
        }
        function end () {
            if (current) {
                this.queue(JSON.stringify(current) + '\n');
            }
            this.queue(null);
        }
        
        return combine(split(), grouper, zlib.createGzip());
    };

*/
