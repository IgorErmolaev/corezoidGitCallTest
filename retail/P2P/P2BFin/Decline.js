// JavaScript Document

if (data.f_nclient != 'A101' ) {
    data.LIM_P2B = 0;
    data.FinalCode = 'D001'+'_'+data.f_nclient;
    data.Decision = 'Decline';
}

if (data.BlackCode == "66") {
    data.LIM_P2B = 0;
    data.FinalCode = 'D005';
    data.Decision = 'Decline';
}