/* 
  #####################################################################
  ##                       ~~  WEBSOCKETS  ~~                        ##
  #####################################################################

In this adventure, write some browser code that uses the websocket-stream module
to print the string "hello\n".

Your solution file will be compiled with browserify and the verify script will
prompt you to open `http://localhost:8000` in a browser to verify your solution.

To open a stream with websocket-stream on localhost:8000, just write:

    var ws = require('websocket-stream');
    var stream = ws('ws://localhost:8000');
   
Then write the string "hello\n" to the stream and end the stream.

The readme for websocket-stream has more info if you're curious about how to
write the server side code: https://github.com/maxogden/websocket-stream

Make sure to `npm install websocket-stream` in the directory where your solution
file lives.

*/

var ws = require('websocket-stream'), 
	stream = ws('http://localhost:8000'); 

stream.write("hello\n").end(); 
// ==> The last line of code is redundant.  Don't forget that 
// you can pass a string to end() that will get written to the 
// body of the response.  

// OFFICIAL SOLUTION BETTER. 

/* 
ACTUAL                             EXPECTED
------                             --------
""                                 ""                            
# PASS

Your solution to WEBSOCKETS passed!

Here's what the official solution is if you want to compare notes:

    var ws = require('websocket-stream');
    var stream = ws('ws://localhost:8000');
    stream.end('hello\n');

*/