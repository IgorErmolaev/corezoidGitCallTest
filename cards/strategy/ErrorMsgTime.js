/*--------------set MsgID----------------*/

if (data.prelim_df != undefined) {
    if (Math.round(data.prelim_df) <= 9) {
        data.MsgId = 'RTDM_CARDSTIME.TPREL' + Math.round(data.prelim_df);
    }
    else {
        data.MsgId = 'RTDM_CARDSTIME.TPREL' + '10';
    }
}


//------------------------------------

if (data.purse_df != undefined) {
    if (Math.round(data.purse_df) <= 4) {
        data.MsgId = 'RTDM_CARDSTIME.TPUR' + Math.round(data.purse_df);
    }
    else {
        data.MsgId = 'RTDM_CARDSTIME.TPUR' + '5';
    }
}

//------------------------------------

if (data.ekb_df != undefined) {
    if (Math.round(data.ekb_df) <= 4) {
        data.MsgId = 'RTDM_CARDSTIME.TEKB' + Math.round(data.ekb_df);
    }
    else {
        data.MsgId = 'RTDM_CARDSTIME.TEKB' + '5';
    }
}

//------------------------------------

if (data.bki_df != undefined) {
    if (Math.round(data.bki_df) <= 3) {
        data.MsgId = 'RTDM_CARDSTIME.TBKI' + '1';
    }
    else {
        if (Math.round(data.bki_df) <= 6) {
            data.MsgId = 'RTDM_CARDSTIME.TBKI' + '2';
        }
        else {
            if (Math.round(data.bki_df) <= 7) {
                data.MsgId = 'RTDM_CARDSTIME.TBKI' + '3';
            }
            else{
                data.MsgId = 'RTDM_CARDSTIME.TBKI' + '4';
            }
        }

    }
}






