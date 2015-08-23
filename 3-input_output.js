/* 
  #####################################################################
  ##                      ~~  INPUT OUTPUT  ~~                       ##
  #####################################################################

Take data from `process.stdin` and pipe it to `process.stdout`.

With `.pipe()`. `process.stdin.pipe()` to be exact.

Don't overthink this.

*/

process.stdin.pipe(process.stdout);

/* 
ACTUAL                             EXPECTED
------                             --------
"Animus"                           "Animus"                      
"Aggedor"                          "Aggedor"                     
"The Wire"                         "The Wire"                    
"Krafayis"                         "Krafayis"                    
"Nostrovite"                       "Nostrovite"                  
"Validium"                         "Validium"                    
"Ood"                              "Ood"                         
"Zanak humanoid"                   "Zanak humanoid"              
"War Lord"                         "War Lord"                    
""                                 ""                            
# PASS

Your solution to INPUT OUTPUT passed!

Here's what the official solution is if you want to compare notes:

    process.stdin.pipe(process.stdout);

*/