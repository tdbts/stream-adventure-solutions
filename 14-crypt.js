/* 
   #####################################################################
  ##                          ~~  CRYPT  ~~                          ##
  #####################################################################

Your module will be given a passphrase on `process.argv[2]` and 'aes256'
encrypted data will be written to stdin.

Simply decrypt the data and stream the result to process.stdout.

You can use the `crypto.createDecipher()` api from node core to solve this
challenge. Here's an example:

    var crypto = require('crypto');
    var stream = crypto.createDecipher('RC4', 'robots');
    stream.pipe(process.stdout);
    stream.write(Buffer([ 135, 197, 164, 92, 129, 90, 215, 63, 92 ]));
    stream.end();

Instead of calling `.write()` yourself, just pipe stdin into your decrypter.

*/ 

var crypto = require('crypto'), 
	decrypter = crypto.createDecipher('aes256', process.argv[2]); 

process.stdin
	.pipe(decrypter)
	.pipe(process.stdout); 	

/* 
ACTUAL:   "riverrun, past Eve and Adam's, from swerve of shore to bend "
EXPECTED: "riverrun, past Eve and Adam's, from swerve of shore to bend "

ACTUAL:   "of bay, brings us by a commodius vicus of recirculation back to    "
EXPECTED: "of bay, brings us by a commodius vicus of recirculation back to    "

ACTUAL:   "Howth Castle and Environs. "
EXPECTED: "Howth Castle and Environs. "

ACTUAL:   ""
EXPECTED: ""

ACTUAL:   "Sir Tristram, violer d'amores, fr'over the short sea, had passen- "
EXPECTED: "Sir Tristram, violer d'amores, fr'over the short sea, had passen- "

ACTUAL:   "core rearrived from North Armorica on this side the scraggy"
EXPECTED: "core rearrived from North Armorica on this side the scraggy"

ACTUAL:   "isthmus of Europe Minor to wielderfight his penisolate war: nor    "
EXPECTED: "isthmus of Europe Minor to wielderfight his penisolate war: nor    "

ACTUAL:   "had topsawyer's rocks by the stream Oconee exaggerated themselse   "
EXPECTED: "had topsawyer's rocks by the stream Oconee exaggerated themselse   "

ACTUAL:   "to Laurens County's gorgios while they went doublin their mumper   "
EXPECTED: "to Laurens County's gorgios while they went doublin their mumper   "

ACTUAL:   "all the time: nor avoice from afire bellowsed mishe mishe to   "
EXPECTED: "all the time: nor avoice from afire bellowsed mishe mishe to   "

ACTUAL:   "tauftauf thuartpeatrick: not yet, though venissoon after, had a   "
EXPECTED: "tauftauf thuartpeatrick: not yet, though venissoon after, had a   "

ACTUAL:   "kidscad buttended a bland old isaac: not yet, though all's fair in    "
EXPECTED: "kidscad buttended a bland old isaac: not yet, though all's fair in    "

ACTUAL:   "vanessy, were sosie sesthers wroth with twone nathandjoe. Rot a   "
EXPECTED: "vanessy, were sosie sesthers wroth with twone nathandjoe. Rot a   "

ACTUAL:   "peck of pa's malt had Jhem or Shen brewed by arclight and rory    "
EXPECTED: "peck of pa's malt had Jhem or Shen brewed by arclight and rory    "

ACTUAL:   "end to the regginbrow was to be seen ringsome on the aquaface."
EXPECTED: "end to the regginbrow was to be seen ringsome on the aquaface."

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to CRYPT passed!

Here's what the official solution is if you want to compare notes:

    var crypto = require('crypto');
    process.stdin
        .pipe(crypto.createDecipher('aes256', process.argv[2]))
        .pipe(process.stdout)
    ;    

*/