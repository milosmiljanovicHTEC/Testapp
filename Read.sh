#!/bin/bash
awk  '{if(NR>1  && $2==$4) print "!"$0 ; else if ($2>$4) print "+"$0 ;  else if($2<$4) print "-"$0 ; else print "```diff"}' table.md >"$(date +"%Y_%m_%d_%I_%M_%p").md"

