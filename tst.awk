BEGIN { srand() }
{
    sub(/[0-9]+/,sprintf("%4d",rand()*1000))
    print
}
