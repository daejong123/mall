"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
exports.CaiCode = {
    Inner_Error: 9999,
    ValidCode_Right: 1000,
    ValidCode_Expired: 1001,
    ValidCode_NotExist: 1002,
    Exist_Admin: 2000,
    Not_Exist_Admin: 2001,
    Logout_Success: 3000,
    Logout_Fail: 3001,
    UserName_Password_Can_Not_Empty: 4001,
    Generate_Code_Success: 5000,
    Generate_Code_Fail: 5001,
    Need_Login: 6001,
    Get_System_User_Success: 7000,
    User_Not_Exist: 8001,
    User_Exists: 8000,
    User_Name_Has_Exists: 8002,
    Buyer_Registe_Success: 9000,
    Buyer_Registe_Fail: 9001,
    Seller_Registe_Success: 9900,
    Seller_Registe_Fail: 9901,
    Get_Goods_Kind_Success: 5500,
    Upload_Image_Success: 1234,
    Upload_Image_Fail: 4321,
    Publish_Goods_Success: 5678,
    Publish_Goods_Fail: 8765,
    Get_All_Goods_Success: 2345,
    Get_All_Goods_Fail: 5432,
    Add_Goods_To_Cart_Success: 4567,
    Add_Goods_To_Cart_Fail: 7654,
    Get_UserId_All_Goods_Success: 6789,
    Get_UserId_All_Goods_Fail: 9876,
    Delete_Goods_Success: 1212,
    Delete_Goods_Fail: 2121,
    Get_User_Goods_Success: 7896,
    Get_User_Goods_Fail: 6987,
};
class ResultUtil {
    static make(msg, code, data) {
        return { msg, code, data };
    }
}
exports.default = ResultUtil;
function isEmpty(param) {
    if (!param || param.trim() === "") {
        return true;
    }
    return false;
}
exports.isEmpty = isEmpty;
function generateCode(digits) {
    let result = "";
    const origin = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let time = 0; time < digits; time++) {
        const index = Math.floor(Math.random() * origin.length);
        result += origin.charAt(index);
    }
    return result;
}
exports.generateCode = generateCode;
// let a = "";
// for (let i = 0; i < 26; i++) {
//     a += String.fromCharCode(65 + i);
// }
// for (let i = 0; i < 26; i++) {
//     a += String.fromCharCode(97 + i);
// }
function generateToken(name) {
    const hash = crypto.createHash("md5");
    hash.update(name + new Date().getTime());
    const encode = hash.digest('hex');
    return encode;
}
exports.generateToken = generateToken;
//# sourceMappingURL=ResultUtil.js.map