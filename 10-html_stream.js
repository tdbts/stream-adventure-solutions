/* 
  #####################################################################
  ##                       ~~  HTML STREAM  ~~                       ##
  #####################################################################

Your program will get some html written to stdin. Convert all the inner html to
upper-case for elements with a class name of "loud".

You can use `trumpet` and `through` to solve this adventure.

With `trumpet` you can create a transform stream from a css selector:

    var trumpet = require('trumpet');
    var fs = require('fs');
    var tr = trumpet();
    fs.createReadStream('input.html').pipe(tr);
    
    var stream = tr.select('.beep').createStream();

Now `stream` outputs all the inner html content at `'.beep'` and the data you
write to `stream` will appear as the new inner html content.

Make sure to `npm install trumpet through` in the directory where your solution
file lives.
*/

// ATTEMPT #1
// var trumpet = require('trumpet'), 
// 	fs = require('fs'), 
// 	through = require('through'), 
// 	tr = trumpet(); 

// fs.createReadStream(process.stdin).pipe(tr); 

// var stream = tr.select('.loud').createStream().pipe(through(function write(buf) {

// 	this.queue(buf.toString().toUpperCase()); 
// })); 

// ATTEMPT #2 
// var trumpet = require('trumpet'), 
// 	fs = require('fs'), 
// 	through = require('through'), 
// 	tr = trumpet(); 

// fs.createReadStream(process.stdin).pipe(tr); 

// var stream = fs.select('.loud').createStream(); 

// stream.pipe(through(function write(buf) {

// 	this.queue(buff.toString.toUpperCase()); 
// })).pipe(process.stdout);


/* 
First of all, think about what you are doing>>> 
You're using the 'fs' module, but what file are you reading???  
You're not reading a file, you're reading from standard input, 
so the 'fs' module isn't necessary for the exercise.  
Also: 
- buf becomes buff?? 
- toString is a METHOD -- invoke it! 

Besides all the above mistakes, what you did wrong here was 
that you never finished initializing 'tr' before you tried 
to pipe the stream to it.  Don't forget that order matters!  
'tr' is our transform stream, so everything that it needs 
in order to do its job needs to BEFORE YOU START PIPING DATA 
TO IT.  That is why in the correct implementation, piping 
standard in put to 'tr' is the LAST thing we do.  
*/


// ATTEMPT #3 - 
// After reading https://github.com/nodeschool/discussions/issues/346 
var trumpet = require('trumpet'), 
	through = require('through'), 
	tr = trumpet(); 

var loud = tr.createStream('.loud'); 

function transform(buf) {

	this.queue(buf.toString().toUpperCase()); 
}

loud.pipe(through(transform)).pipe(loud); 

process.stdin
	.pipe(tr)
	.pipe(process.stdout);


/* 
ACTUAL:   "<html>"
EXPECTED: "<html>"

ACTUAL:   "  <head>"
EXPECTED: "  <head>"

ACTUAL:   "    <title>beep boop</title>"
EXPECTED: "    <title>beep boop</title>"

ACTUAL:   "  </head>"
EXPECTED: "  </head>"

ACTUAL:   "  <body>"
EXPECTED: "  <body>"

ACTUAL:   "    <p>"
EXPECTED: "    <p>"

ACTUAL:   "      Four score and several years ago, our fathers bought four swiss"
EXPECTED: "      Four score and several years ago, our fathers bought four swiss"

ACTUAL:   "      continents, a new vacation, covered in liberty."
EXPECTED: "      continents, a new vacation, covered in liberty."

ACTUAL:   "      And predicated to the preposition that tall men created a"
EXPECTED: "      And predicated to the preposition that tall men created a"

ACTUAL:   "      sequel."
EXPECTED: "      sequel."

ACTUAL:   "    </p>"
EXPECTED: "    </p>"

ACTUAL:   "    "
EXPECTED: "    "

ACTUAL:   "    <p>"
EXPECTED: "    <p>"

ACTUAL:   "      How we are offstage in a great livermore, testing weather stations, or any"
EXPECTED: "      How we are offstage in a great livermore, testing weather stations, or any"

ACTUAL:   "      station so conceived in altogether fitting and little note, nor long"
EXPECTED: "      station so conceived in altogether fitting and little note, nor long"

ACTUAL:   "      remember, they who fought here and take increased devoation,"
EXPECTED: "      remember, they who fought here and take increased devoation,"

ACTUAL:   "      that <span class=\"loud\">GOVERNMENT LOVE THE PEOPLE, BESIDE THE PEOPLE,"
EXPECTED: "      that <span class=\"loud\">GOVERNMENT LOVE THE PEOPLE, BESIDE THE PEOPLE,"

ACTUAL:   "      FOUR OF THE PEOPLE, SHALL NOT PERISH FROM THIS EARTH.</span>"
EXPECTED: "      FOUR OF THE PEOPLE, SHALL NOT PERISH FROM THIS EARTH.</span>"

ACTUAL:   "    </p>"
EXPECTED: "    </p>"

ACTUAL:   "  </body>"
EXPECTED: "  </body>"

ACTUAL:   "</html>"
EXPECTED: "</html>"

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to HTML STREAM passed!

Here's what the official solution is if you want to compare notes:

    var trumpet = require('trumpet');
    var through = require('through');
    var tr = trumpet();
    
    var loud = tr.select('.loud').createStream();
    loud.pipe(through(function (buf) {
        this.queue(buf.toString().toUpperCase());
    })).pipe(loud);
    
    process.stdin.pipe(tr).pipe(process.stdout);

*/





// Inline comments for working solution
var trumpet = require('trumpet'), 
	through = require('through'), 
	tr = trumpet(); 
// No 'fs' module because we are reading from process.stdin 

var loud = tr.createStream('.loud'); 
// This is like settIng an event listener, 'tr' is going to 
// listen for html with a class of loud.  We haven't yet 
// specified where that html will come from.  

function transform(buf) {

	this.queue(buf.toString().toUpperCase()); 
}
// We define our transform function.  

loud.pipe(through(transform)).pipe(loud); 
// We tell our 'loud' stream that when it receives input (i.e. 
// html with a class of '.loud'), we will pipe it through 
// our transform function, and then pipe it back into the 
// loud stream  

process.stdin
	.pipe(tr)
	.pipe(process.stdout);
// This is like a bird's-eye-view of the whole process, and ultimately, 
// what makes the whole thing work.  We take our stdin, pipe it through 
// our transform function, and pipe the result out to stdout. 
