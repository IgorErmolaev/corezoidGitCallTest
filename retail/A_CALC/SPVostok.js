var fs = require('fs');
var json = fs.readFileSync('c:\\Users\\user\\PhpstormProjects\\retailjs\\BROKER\\test\\internalClient.json').toString();
var data = JSON.parse(json).data;

//**************************************************************************************




var VostokRegion = new Array('UA6806', 'UA6828', 'UA6829', 'UA6833', 'UA6849', 'UA6852', 'UA6871', 'UA7595', 'UA6879', 'UA6807', 'UA6881', 'UA6889', 'UA6919', 'UA6932', 'UA8382','UA6922','UA18022', 'UA7229','UA18055','UA18423',
    'UA6933', 'UA6934', 'UA6948', 'UA6951', 'UA6956', 'UA6995', 'UA6996', 'UA7004', 'UA7007', 'UA7021', 'UA7025', 'UA7042', 'UA7057', 'UA7136', 'UA6869', 'UA6876', 'UA7428', 'UA7002', 'UA8134', 'UA7902', 'UA7899', 'UA6817', 'UA6884', 'UA7973', 'UA6950', 'UA6851',
    'UA7006', 'UA7228', 'UA6831', 'UA7003', 'UA6832', 'UA6916', 'UA17411', 'UA17448', 'UA17422', 'UA17436', 'UA17442', 'UA17464', 'UA17449', 'UA17487', 'UA17412', 'UA17490', 'UA17495', 'UA17521', 'UA17522','UA7321','UA7841',
    'UA17537', 'UA17548', 'UA17549', 'UA18084', 'UA17493', 'UA18280', 'UA17494', 'UA18085', 'UA17536', 'UA17785', 'UA17840', 'UA17488', 'UA18083', 'UA18174', 'UA18127', 'UA17489', 'UA18166', 'UA18411', 'UA17463', 'UA17420');


var ATOVostokRegion = new Array('UA17412', 'UA17422', 'UA17436', 'UA17442', 'UA17448', 'UA17449', 'UA17464', 'UA17490', 'UA17495', 'UA17522', 'UA17548', 'UA17556', 'UA17617',
    'UA17840', 'UA17842', 'UA17852', 'UA18083', 'UA18084', 'UA18085', 'UA18091', 'UA18101', 'UA18104', 'UA18107', 'UA18280', 'UA18281', 'UA18290', 'UA6807', 'UA6828', 'UA6833', 'UA6849',
    'UA6879', 'UA6889', 'UA6919', 'UA6932', 'UA6956', 'UA7007', 'UA7021', 'UA7025', 'UA7042', 'UA7057', 'UA7136', 'UA7437', 'UA7901', 'UA7973', 'UA7974', 'UA7975', 'UA7976', 'UA8134',
    'UA8135', 'UA8136', 'UA8207','UA7321');

data.SPVostok_VostokRegion = 'N';
data.SPVostok_ATOVostokRegion = 'N';


if (VostokRegion.indexOf(data.APP_REG_ADDRESS.ID_REGION) != -1 || VostokRegion.indexOf(data.APP_ACT_ADDRESS.ID_REGION) != -1) {
    data.SPVostok_VostokRegion = 'Y';
}

if (ATOVostokRegion.indexOf(data.APP_REG_ADDRESS.ID_REGION) != -1 || ATOVostokRegion.indexOf(data.APP_ACT_ADDRESS.ID_REGION) != -1) {
    data.SPVostok_ATOVostokRegion = 'Y';
}




//**************************************************************************************
console.log('SPVostok_VostokRegion=' + data.SPVostok_VostokRegion);
console.log('SPVostok_ATOVostokRegion=' + data.SPVostok_ATOVostokRegion);