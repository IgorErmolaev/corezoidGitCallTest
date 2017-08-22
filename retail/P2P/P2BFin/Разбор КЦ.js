if (data.code_comment_kc == 'A102') {
    data.Decision = 'Accept';
}
else {
    data.Decision = 'Decline';
}

data.FinalCode = data.code_comment_kc;
data.LIM_P2B = data.limit_final_kc;