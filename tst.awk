BEGIN { srand() }
{
    sub(/[0-9]+/,sprintf("%010d",rand()*1000000))
    print
}
