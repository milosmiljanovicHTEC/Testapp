#!/bin/bash
awk  '{if(NR>1  && $2==$4) print "!"$0 ; else if ($2>$4) print "+"$0 ;  else if($2<$4) print "-"$0 ; else print "```diff"}' new.md > new1.md

