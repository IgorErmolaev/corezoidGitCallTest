data.DATA_TRELCLIENTS_LIM_60_GOOD_CL = 0;


if (data["doc"]["r"]["O"] != undefined )
{
    data.DATA_TRELCLIENTS_LIM_60_GOOD_CL = Number(data["doc"]["r"]["O"]["@LIMIT_60"]);
}
else {
    data.DATA_TRELCLIENTS_LIM_60_GOOD_CL = 0;
}