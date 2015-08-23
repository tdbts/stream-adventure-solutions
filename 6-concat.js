/* 
  #####################################################################
  ##                         ~~  CONCAT  ~~                          ##
  #####################################################################

You will be given text on process.stdin. Buffer the text and reverse it using
the `concat-stream` module before writing it to stdout.

`concat-stream` is a write stream that you can pass a callback to to get the
complete contents of a stream as a single buffer. Here's an example that uses
concat to buffer POST content in order to JSON.parse() the submitted data:

    var concat = require('concat-stream');
    var http = require('http');
    
    var server = http.createServer(function (req, res) {
        if (req.method === 'POST') {
            req.pipe(concat(function (body) {
                var obj = JSON.parse(body);
                res.end(Object.keys(obj).join('\n'));
            }));
        }
        else res.end();
    });
    server.listen(5000);

In your adventure you'll only need to buffer input with `concat()` from
process.stdin.

Make sure to `npm install concat-stream` in the directory where your solution
file is located.

*/

var concat = require('concat-stream');

// var reverser = function (buf) {
// 	this.queue(buf.toString().split("").reverse().join("")); 
// }; 

// process.stdin.pipe(concat(through(reverser))).pipe(process.stdout);

process.stdin
	.pipe(concat(function (buf) {
		console.log(buf.toString().split("").reverse().join("")); 
	}));

/* 
ACTUAL                             EXPECTED
------                             --------
"Every dingo in the village"       "Every dingo in the village"  
"heard the unhelpful clamor"       "heard the unhelpful clamor"  
"from the town square. Looking"     "from the town square. Looking"
"verily into the distance,"        "verily into the distance,"   
"Constable Franklin twiddled"      "Constable Franklin twiddled" 
"his digital periscope to"         "his digital periscope to"    
"locate the untrustworthy"         "locate the untrustworthy"    
"source. Unwittingly, a nearby"     "source. Unwittingly, a nearby"
"cat yawnily steered"              "cat yawnily steered"         
"high-velocity piercing"           "high-velocity piercing"      
"particles."                       "particles."                  
""                                 ""                            
""                                 ""                            
# PASS

Your solution to CONCAT passed!

Here's what the official solution is if you want to compare notes:

    var concat = require('concat-stream');
    
    process.stdin.pipe(concat(function (src) {
        var s = src.toString().split('').reverse().join('');
        console.log(s);
    }));

*/