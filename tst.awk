BEGIN { srand() }
{
    sub(/[0-9]+/,sprintf("%04d",rand()*1000000000))
    print
}
