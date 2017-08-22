data.AUTO_DEC = 'N';
if (data.RES_DEC_AUTO != 'N' && data.RES_CUST_ISID == 'Y' && data.FRAUD_FRAUD_SUSPICTION != 'Y' && data.RES_CUST_ISID_FRAUD != 'Y'
&& (
        ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && (data.RES_LIMIT_ITOG >= 0 || data.RES_LIMIT_ITOG_TYPE == 'ZP' || data.RES_LIMIT_ITOG_TYPE == 'PENS'))
    )
){
    data.AUTO_DEC = 'Y';
}