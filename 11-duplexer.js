/* 
  #####################################################################
  ##                        ~~  DUPLEXER  ~~                         ##
  #####################################################################

Write a program that exports a function that spawns a process from a `cmd`
string and an `args` array and returns a single duplex stream joining together
the stdin and stdout of the spawned process:

    var spawn = require('child_process').spawn;
    
    module.exports = function (cmd, args) {
        // spawn the process and return a single stream
        // joining together the stdin and stdout here
    };

There is a very handy module you can use here: duplexer. The duplexer module
exports a single function `duplexer(writable, readable)` that joins together a
writable stream and readable stream into a single, readable/writable duplex
stream.

If you use duplexer, make sure to `npm install duplexer` in the directory where
your solution file is located. 
*/

// ATTEMPT #1 
// var spawn = require('child_process').spawn, 
// 	duplexer = require('duplexer'); 

// module.exports = function (cmd, args) {
// 	return duplexer(process.stdout, spawn(cmd, args)); 	
// };

// ATTEMPT #2
// var spawn = require('child_process').spawn, 
// 	duplexer = require('duplexer'), 
// 	child; 

// module.exports = function (cmd, args) {
// 	child = spawn(cmd, args); 

// 	process.stdin
// 		.pipe(duplexer(child.stdout, child.stdin));  
// }; 

// ATTEMPT #3 
var spawn = require('child_process').spawn, 
	duplexer = require('duplexer'), 
	child; 

module.exports = function (cmd, args) {
	child = spawn(cmd, args); 

	return duplexer(child.stdin, child.stdout); 	
};

// I was close...very close.  

/* 
*** Several days later (08/23/2015) *** 
Think about process.stdin and process.stdout.  
You're spawning a new process, and so you want to create a duplex 
stream WITH THAT CHILD PROCESS's standard in/out.  
*/

/* 
ACTUAL                             EXPECTED
------                             --------
"jwbbtm"                           "jwbbtm"                      
"jmmbtm"                           "jmmbtm"                      
"jwf"                              "jwf"                         
"jism"                             "jism"                        
"jmycmibp"                         "jmycmibp"                    
"jmycmibp"                         "jmycmibp"                    
"jqakcqb"                          "jqakcqb"                     
"jcab"                             "jcab"                        
"jmmb"                             "jmmb"                        
"jghivbqvm"                        "jghivbqvm"                   
""                                 ""                            
""                                 ""                            
# PASS

Your solution to DUPLEXER passed!

Here's what the official solution is if you want to compare notes:

    var spawn = require('child_process').spawn;
    var duplexer = require('duplexer');
    
    module.exports = function (cmd, args) {
        var ps = spawn(cmd, args);
        return duplexer(ps.stdin, ps.stdout);
    };

*/ 
