BEGIN { srand() }
{
    sub(/[0-9]+/,sprintf("%010d",rand()*10000000000))
    print
}
