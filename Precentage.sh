
#!/bin/bash
awk ' {NF==2}{if((V=(($2 * 100)/$4)) && V < 10) print "!"$0;
 else if ((V=(($2 * 100)/$4))&& V > 11 &&  V < 50)print "-"$0;
  else if ((V=(($2 * 100)/$4))&& V < 100 && Q > 51 )print "+"$0;
   else if ((V=(($2 * 100)/$4))&& V > 100){print "@@"$0, "@@"$6} else print "Numbers are equal" }' new.md >> new1.md
