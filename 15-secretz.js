/* 
  #####################################################################
  ##                         ~~  SECRETZ  ~~                         ##
  #####################################################################

An encrypted, gzipped tar file will be piped in on process.stdin. To beat this
challenge, for each file in the tar input, print a hex-encoded md5 hash of the
file contents followed by a single space followed by the filename, then a
newline.

You will receive the cipher name as process.argv[2] and the cipher passphrase as
process.argv[3]. You can pass these arguments directly through to
`crypto.createDecipher()`.

The built-in zlib library you get when you `require('zlib')` has a
`zlib.createGunzip()` that returns a stream for gunzipping.

The `tar` module from npm has a `tar.Parse()` function that emits `'entry'`
events for each file in the tar input. Each `entry` object is a readable stream
of the file contents from the archive and:

`entry.type` is the kind of file ('File', 'Directory', etc)
`entry.path` is the file path

Using the tar module looks like:

    var tar = require('tar');
    var parser = tar.Parse();
    parser.on('entry', function (e) {
        console.dir(e);
    });
    var fs = require('fs');
    fs.createReadStream('file.tar').pipe(parser);

Use `crypto.createHash('md5', { encoding: 'hex' })` to generate a stream that
outputs a hex md5 hash for the content written to it.

Make sure to `npm install tar through` in the directory where your solution
file lives.

*/ 

var crypto = require('crypto'), 
	tar = require('tar'), 
	parser = tar.Parse(), 
	zlib = require('zlib'), 
	combiner = require('stream-combiner'), 
	through = require('through'), 
	secretsProcessor;  


function onEntry(entry) {
	if (entry.type !== "File") {
		return;
	}

	function write(data) {
		this.queue(data.toString() + " " + entry.path + "\n"); 
	}

	entry 
		.pipe(crypto.createHash('md5', {encoding: 'hex'}))
		.pipe(through(write))
		.pipe(process.stdout); 
}

parser.on('entry', onEntry); 

secretsProcessor = combiner(
	crypto.createDecipher(process.argv[2], process.argv[3]), 
	zlib.createGunzip(), 
	parser
);

process.stdin
	.pipe(crypto.createDecipher(process.argv[2], process.argv[3]))
	.pipe(zlib.createGunzip())
	.pipe(parser);


/* 
The verifier actually expects the wrong answer (seems to be a problem with newer versions of node), 
but I have found the solution had it did expect the correct output. 

ACTUAL:   "97911dcc607865d621029f6f927c7851 secretz/METADATA.TXT"
EXPECTED: "97911dcc607865d621029f6f927c78512cdcfa9f8bbefb82fb7a894964b5c199 secretz/METADATA.TXT"

ACTUAL:   "2cdcfa9f8bbefb82fb7a894964b5c199 secretz/SPYING.TXT"
EXPECTED: " secretz/SPYING.TXT"

ACTUAL:   ""
EXPECTED: ""

# FAIL

*/