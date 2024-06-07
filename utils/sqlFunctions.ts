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

export function sqlEditor(table: string, data: any, id: number){
    let updateTable = `UPDATE ${table}`;
    let setValues = `SET `;
    let dataKeys = Object.keys(data);
    let dataValues= Object.values(data);
    let whereId = `WHERE ${table.slice(0, -1)}_id = ${id}`
    for (let i = 0; i < dataKeys.length; i++){
        if (i != dataKeys.length -1){
            setValues += `${dataKeys[i]} = ` + `'${dataValues[i]}', `;
        } else {
            setValues += `${dataKeys[i]} = ` + `'${dataValues[i]}' `;
        }
        
    }
    let query = `${updateTable} ${setValues} ${whereId}`;
    connection.execute(query)
    connection.end
}