import mysql from 'mysql2'

const db = mysql.createConnection({
   
    user:'root',
    password:'Mohana@123',
    database:'intranet'   
})

// const db = mysql.createConnection({
    
//     user:'root',
//     password:'root',
//     database:'intranet'   
// })



export default db
