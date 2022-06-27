#BEGIN { srand() }
#{
#    sub(/[0-9]+/,sprintf("%4d",rand()*1000))
#    print
#    
#}
BEGIN { srand(seed) }
{ print $0, r() }
function r() { return rand()  / 1000 }
