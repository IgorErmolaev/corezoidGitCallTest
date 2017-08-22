if ( data.okpo.length==0 || data.okpo=='' || data.okpo==' ')
{
    if ( data.INN=='' || data.INN==' '|| data.INN.length==0 )
    {
        data.okpo = "null" ;
    }
    else
    {
        data.okpo = data.INN;
    }
}
  