import { Pool, PoolConnection, MysqlError } from "mysql";

const io: Pool = require('./ioUtil');

const execute = (sql: string, params?: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        io.getConnection((error: MysqlError, connection: PoolConnection) => {
            if (error) {
                reject(error);
                return;
            }
            connection.query(sql, params, (err: MysqlError, result: any) => {
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

export default execute;
