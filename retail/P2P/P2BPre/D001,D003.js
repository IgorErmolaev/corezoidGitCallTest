if (data.f_nclient == 'A101' && data.LimTek<500 && data.LimNew<500) {
    data.FinalCode = 'D003';
    data.Decision = 'Decline';
    data.comment = 'Шановний клієнте, ця послуга Вам недоступна';
} 