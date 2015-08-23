/* 
  #####################################################################
  ##                       ~~  HTTP CLIENT  ~~                       ##
  #####################################################################

Send an HTTP POST request to http://localhost:8000 and pipe process.stdin into
it. Pipe the response stream to process.stdout.

Here's an example of how to use the `request` module to send a GET request,
piping the result to stdout:

    var request = require('request');
    request('http://beep.boop:80/').pipe(process.stdout);

To make a POST request, just call `request.post()` instead of `request()`:

    var request = require('request');
    var r = request.post('http://beep.boop:80/');
    
The `r` object that you get back from `request.post()` is a readable+writable
stream so you can pipe a readable stream into it (`src.pipe(r)`) and you can
pipe it to a writable stream (`r.pipe(dst)`).

You can even chain both steps together: src.pipe(r).pipe(dst);

Hint: for your code, src will be process.stdin and dst will be process.stdout.

Make sure to `npm install request` in the directory where your solution file
lives.

*/

var request = require('request'); 

var r = request.post('http://localhost:8000'); 

process.stdin.pipe(r).pipe(process.stdout); 

// FIRST TRY!!!! 

/* 
ACTUAL                             EXPECTED
------                             --------
"a"                                "a"                           
"heghuuyuuv"                       "heghuuyuuv"                  
"ouggkneoasc"                      "ouggkneoasc"                 
"unzm"                             "unzm"                        
"gcand"                            "gcand"                       
"ed'w"                             "ed'w"                        
"yc"                               "yc"                          
"ikeos."                           "ikeos."                      
"wu"                               "wu"                          
""                                 ""                            
# PASS

Your solution to HTTP CLIENT passed!

Here's what the official solution is if you want to compare notes:

    var request = require('request');
    var r = request.post('http://localhost:8000');
    process.stdin.pipe(r).pipe(process.stdout);

*/
