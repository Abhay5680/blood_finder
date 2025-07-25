import {Client} from 'pg'
var sqlClient: Client
export const run = async ()=>{
    const client = new Client({
        connectionString:process.env.DB_STRING
    })
    await client.connect()
    sqlClient = client
    return sqlClient
}

