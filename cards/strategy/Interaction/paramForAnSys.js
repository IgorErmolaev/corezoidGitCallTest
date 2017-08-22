data.ops = new Array();

data.ops = [
    {
        conv_id : data.conv_id,
        type: 'create',
        obj:'task',
        ref:data.ref,
        data:{
            STATE_ACTION:data.STATE_ACTION,
            insurance: data.insurance,
            PRECALC_LIMIT:data.PRECALC_LIMIT
        }
    }
];



/*
 [ { "conv_id" : "{{conv_id}}", "type": "modify", "obj":"task", "ref":"{{ref}}", "data":{ "limitFinal":"{{RES_LIMIT_P48}}", "stateBI": "{{RES_BI}}" } } ]
    */

