BEGIN { srand() }
{
    sub(/[0-9]+/,sprintf("%10d",$4 = ($4 in r ? r[$4] : r[$4]=int(rand()*1000))))
    sub(/[0-9]+/,sprintf("%4d",$2 = ($2 in r ? r[$2] : r[$2]=int(rand()*1000))))
    print
