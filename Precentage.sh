
#!/bin/bash
awk 'BEGIN { print "```diff" } {if((V=(($2 * 100)/$4)) && V < 10) print "!"$0;
 else if ((V=(($2 * 100)/$4))&& V > 11 &&  V < 50)print "-"$0;
  else if ((V=(($2 * 100)/$4))&& V < 100 && Q > 51 )print "+"$0;
   else if ((V=(($2 * 100)/$4))&& V> 100){print "@@"$0, "@@"$5} else print "Numbers are equal" }' new.md > new2.md