
for (var i = 0; i < data.APP_PHONE.length; i++) {
    if (data.APP_PHONE[i].CALL_QA_DECODE!= undefined && (data.APP_PHONE[i].CALL_QA_DECODE.indexOf('Q066:CALL_RELIEVING')!= -1 || data.APP_PHONE[i].CALL_QA_DECODE.indexOf('Q066:CALL_NO_ANSWER')!= -1 || data.APP_PHONE[i].CALL_QA_DECODE.indexOf('Q066:CALL_NO_TELEFON_NUMBER')!= -1)){
        data.RES_DEC_AUTO = 'N';
    }
}