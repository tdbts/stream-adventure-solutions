/* 
  #####################################################################
  ##                     ~~  DUPLEXER REDUX  ~~                      ##
  #####################################################################

In this example, you will be given a readable stream, `counter`, as the first
argument to your program:

    module.exports = function (counter) {
        // return a duplex stream to capture countries on the writable side
        // and pass through `counter` on the readable side
    };

Return a duplex stream with the `counter` as the readable side. You will be
written objects with a 2-character `country` field as input, such as these:
 
    {"short":"OH","name":"Ohio","country":"US"}
    {"name":"West Lothian","country":"GB","region":"Scotland"}
    {"short":"NSW","name":"New South Wales","country":"AU"}

Create an object to keep a count of all the countries in the input. Once the
input ends, call `counter.setCounts()` with your country counts.

The `duplexer` module will again be very handy in this example.
*/ 

// ATTEMPT #1 
// var duplexer = require('duplexer'), 
// 	through = require('through'); 

// function countryCounter(buf) {
// 	var count = 0; 

// 	if (buf.toString().country) {
// 		count++; 
// 	}

// 	return count; 
// }

// module.exports = function (counter) {
	
// 	return duplexer(counter, through(countryCounter))	
// };

/* 
You were getting there!  Just a little longer and you may have had it! 
You figured out that you needed to use the 'through' module, and you also 
started to write the functions that the input would need to be piped to.  
*/ 

// ATTEMPT #3 USING CLOSURES
// var duplexer = require('duplexer'), 
// 	through = require('through'), 
// 	countryCounts; 

// module.exports = function (counter) {
// 	countryCounts = {}; 

// 	function recordCount(record) {
	
// 		return function (obj) {
// 			var country = obj.country; 
// 			record[country] = record[country] || 0; 
// 			record[country]++; 
// 		};
// 	}

// 	function setCount(givenCounter, record) {
	
// 		return function () {
// 			givenCounter.setCount(record); 
// 		};
// 	}

// 	return duplexer(through(recordCount(countryCounts), setCount(counter, countryCounts)), counter); 
// }; 


// ATTEMPT #4 - WORKING IMPLEMENTATION USING CLOSURES 
var duplexer = require('duplexer'), 
	through = require('through'), 
	countryCounts; 

module.exports = function (counter) {
	countryCounts = {}; 

	function recordCount(record) {
	
		return function (obj) {
			var country = obj.country; 
			record[country] = record[country] || 0; 
			record[country]++; 
		};
	}

	function setCount(givenCounter, record) {
	
		return function () {
			givenCounter.setCounts(record); 
		};
	}

	return duplexer(through(recordCount(countryCounts), setCount(counter, countryCounts)), counter); 
}; 

// You're attempt above would have worked.  The problem was that you were calling 
// setCount() not setCounts()!! 

/* 
I like the use of closures here.  The functional-programming style really helps with 
readability -- as long as you understand what the code is doing.  
Remember, our function returns a duplex stream.  We do this by using the duplexer npm 
module which takes a writable and readable stream and joins them together into one 
duplex stream.  Here, our READABLE stream is counter.  We pipe the data from counter 
into a stream we create with the through npm module.  The through module returns a 
readable/writable stream by taking a write function which we use to handle the buffered 
data, and an end function which gets called when there is no more data to be read.  
In our implementation, we write to our record count function, and when we are done 
counting countries, we call the setCounts() method of counter.  We use closures to create 
these write and end functions.  I do this because I don't want my write and end functions 
to depend on any PARTICULAR record-keeping object or counter readable stream.  In other 
words, I didn't want to create a counting function like this: 

function myCounter(obj) {
	var country = obj.country; 
	countryCounts[country] = countryCounts[country] || 0; 
	countryCounts[country]++; 
}

Above, the myCounter function which handles the buffered data DEPENDS ON the countryCounts 
object.  Using the closures, however, I can call recordCount on ANY object, and manipulate it 
as needed.  
*/ 

/* 
ACTUAL                             EXPECTED
------                             --------
"AU => 3"                          "AU => 3"                     
"CA => 6"                          "CA => 6"                     
"CN => 11"                         "CN => 11"                    
"DE => 5"                          "DE => 5"                     
"GB => 24"                         "GB => 24"                    
"MX => 5"                          "MX => 5"                     
"US => 14"                         "US => 14"                    
""                                 ""                            
# PASS

Your solution to DUPLEXER REDUX passed!

Here's what the official solution is if you want to compare notes:

    var duplexer = require('duplexer');
    var through = require('through');
    
    module.exports = function (counter) {
        var counts = {};
        var input = through(write, end);
        return duplexer(input, counter);
        
        function write (row) {
            counts[row.country] = (counts[row.country] || 0) + 1;
        }
        function end () { counter.setCounts(counts) }
    };

*/

