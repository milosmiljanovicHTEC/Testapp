
#!/bin/bash
awk 'NR==4, NR==9 {if((V=(($2 * 100)/$4)) && V < 10) print "!"$0;
 else if ((V=(($2 * 100)/$4))&& V > 11 &&  V < 50)print "-"$0;
  else if ((V=(($2 * 100)/$4))&& V < 100 && Q > 51 )print "+"$0;
   else if ((V=(($2 * 100)/$4))&& V> 100){print "@@"$0"@@"} else print "Numbers are equal" }' README.md > new1.md