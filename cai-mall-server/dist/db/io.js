"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require('./ioUtil');
const execute = (sql, params) => {
    return new Promise((resolve, reject) => {
        io.getConnection((error, connection) => {
            if (error) {
                reject(error);
                return;
            }
            connection.query(sql, params, (err, result) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    });
};
exports.default = execute;
//# sourceMappingURL=io.js.map