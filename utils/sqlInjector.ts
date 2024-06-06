import { connection } from "../mysqlConnect"

export function sqlInjector(table: string, data: any){
    let insertCommand = `INSERT INTO ${table} (`;
    let values = 'VALUES (';
    let dataKeys = Object.keys(data);
    let dataValues = Object.values(data);
    let auxiliar = '?';
    for (let i = 0; i < dataKeys.length; i++){
        insertCommand += `${dataKeys[i]}`
        if (i != dataKeys.length -1){
            insertCommand += ',';
            values += auxiliar + ',';
        } else {
            insertCommand += ')'
            values += auxiliar + ')';
        }
    }
    insertCommand += values
    connection.execute(insertCommand, dataValues)
    connection.end
}

