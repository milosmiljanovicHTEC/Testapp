
#!/bin/bash
awk 'NR==3, NR==8 {if((V=(($2 * 100)/$4)) && V < 10) print "!"$0;
 else if ((V=(($2 * 100)/$4))&& V > 11 &&  V < 50)print "-"$0;
  else if ((V=(($2 * 100)/$4))&& V < 100 && Q > 51 )print "+"$0;
   else if ((V=(($2 * 100)/$4))&& V> 100){print "PREFIX"$0"SUFFIX"} else print "Numbers are equal" }' README.md > new2.md
