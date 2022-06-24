#!/bin/bash
awk -f ./tst.awk README.md > README.md
awk  '{if(NR>1  && $2==$4) print "!"$0 ; else if ($2>$4) print "+"$0 ;  else if($2<$4) print "-"$0 ; else print "```diff"}' README.md > output.md

