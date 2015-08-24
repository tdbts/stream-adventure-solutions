/* 
  #####################################################################
  ##                          ~~  LINES  ~~                          ##
  #####################################################################

Instead of transforming every line as in the previous "INPUT OUTPUT" example,
for this challenge, convert even-numbered lines to upper-case and odd-numbered
lines to lower-case. Consider the first line to be odd-numbered. For example
given this input:

    One
    Two
    Three
    Four

Your program should output:

    one
    TWO
    three
    FOUR

You can use the `split` module to split input by newlines. For example:

    var split = require('split');
    process.stdin
        .pipe(split())
        .pipe(through(function (line) {
            console.dir(line.toString());
        }))
    ;

Will buffer and split chunks on newlines before you get them. For example, for
the `split.js` we just wrote we will get separate events for each line even
though the data probably all arrives on the same chunk:

    $ echo -e 'one\ntwo\nthree' | node split.js
    'one'
    'two'
    'three'

Your own program should use `split` in this way, but you should transform the
input and pipe the output through to `process.stdout`.

Make sure to `npm install split through` in the directory where your solution
file lives.

*/ 

var split = require('split'), 
    through = require('through'); 

// var lineClosure = function (action) {
//     var lineNumber = 1; 

//     return function (line) {
//         this.queue(action(line, lineNumber)); 
//         lineNumber++; 
//     };
// }; 

// var upperOrLowercase = function (line, lineNumber) {

//     return lineNumber % 2 === 0 ? line.toString().toUpperCase()
//         : line.toString().toLowerCase(); 
// }

// var caseFunc = lineClosure(upperOrLowercase); 

// process.stdin
//     .pipe(split())
//     .pipe(through(caseFunc))
//     .pipe(process.stdout); 
/* 
ONLY REASON THE ABOVE SOLUTION DOES NOT WORK IS BECAUSE THERE IS NO 
NEWLINE CHARACTER ADDED TO THE END OF THE TRANSFORMED LINES.  

BELOW IS MY SIMPLER SOLUTION WITH THE NEWLINES ADDED. 
*/

    
var lineCount = 1; 

var tr = through(function (buf) {
    this.queue(buf.toString()[lineCount % 2 === 0 ? 'toUpperCase' : 'toLowerCase']() + '\n'); 
    lineCount++; 
}); 

process.stdin
    .pipe(split())
    .pipe(tr)
    .pipe(process.stdout); 

/* 
ACTUAL:   "riverrun, past eve and adam's, from swerve of shore to bend "
EXPECTED: "riverrun, past eve and adam's, from swerve of shore to bend "

ACTUAL:   "OF BAY, BRINGS US BY A COMMODIUS VICUS OF RECIRCULATION BACK TO    "
EXPECTED: "OF BAY, BRINGS US BY A COMMODIUS VICUS OF RECIRCULATION BACK TO    "

ACTUAL:   "howth castle and environs. "
EXPECTED: "howth castle and environs. "

ACTUAL:   ""
EXPECTED: ""

ACTUAL:   "sir tristram, violer d'amores, fr'over the short sea, had passen- "
EXPECTED: "sir tristram, violer d'amores, fr'over the short sea, had passen- "

ACTUAL:   "CORE REARRIVED FROM NORTH ARMORICA ON THIS SIDE THE SCRAGGY"
EXPECTED: "CORE REARRIVED FROM NORTH ARMORICA ON THIS SIDE THE SCRAGGY"

ACTUAL:   "isthmus of europe minor to wielderfight his penisolate war: nor    "
EXPECTED: "isthmus of europe minor to wielderfight his penisolate war: nor    "

ACTUAL:   "HAD TOPSAWYER'S ROCKS BY THE STREAM OCONEE EXAGGERATED THEMSELSE   "
EXPECTED: "HAD TOPSAWYER'S ROCKS BY THE STREAM OCONEE EXAGGERATED THEMSELSE   "

ACTUAL:   "to laurens county's gorgios while they went doublin their mumper   "
EXPECTED: "to laurens county's gorgios while they went doublin their mumper   "

ACTUAL:   "ALL THE TIME: NOR AVOICE FROM AFIRE BELLOWSED MISHE MISHE TO   "
EXPECTED: "ALL THE TIME: NOR AVOICE FROM AFIRE BELLOWSED MISHE MISHE TO   "

ACTUAL:   "tauftauf thuartpeatrick: not yet, though venissoon after, had a   "
EXPECTED: "tauftauf thuartpeatrick: not yet, though venissoon after, had a   "

ACTUAL:   "KIDSCAD BUTTENDED A BLAND OLD ISAAC: NOT YET, THOUGH ALL'S FAIR IN    "
EXPECTED: "KIDSCAD BUTTENDED A BLAND OLD ISAAC: NOT YET, THOUGH ALL'S FAIR IN    "

ACTUAL:   "vanessy, were sosie sesthers wroth with twone nathandjoe. rot a   "
EXPECTED: "vanessy, were sosie sesthers wroth with twone nathandjoe. rot a   "

ACTUAL:   "PECK OF PA'S MALT HAD JHEM OR SHEN BREWED BY ARCLIGHT AND RORY    "
EXPECTED: "PECK OF PA'S MALT HAD JHEM OR SHEN BREWED BY ARCLIGHT AND RORY    "

ACTUAL:   "end to the regginbrow was to be seen ringsome on the aquaface."
EXPECTED: "end to the regginbrow was to be seen ringsome on the aquaface."

ACTUAL:   ""
EXPECTED: ""

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to LINES passed!

Here's what the official solution is if you want to compare notes:

    var through = require('through');
    var split = require('split');
    
    var lineCount = 0;
    var tr = through(function (buf) {
        var line = buf.toString();
        this.queue(lineCount % 2 === 0
            ? line.toLowerCase() + '\n'
            : line.toUpperCase() + '\n'
        );
        lineCount ++;
    });
    process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);
    

*/
