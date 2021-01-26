const mysql = require('mysql')
class DB {

  static getConnection(){
    const con = mysql.createConnection({
      host:'localhost',
      user:'chris',
      password:'devpassword',
      database:'river'
    });
    return DB.connect(con)
  }

  static connect(con){
    return new Promise((resolve, reject) =>{
      con.connect(function(err) {
        if (err){
          con.end()
          throw err
        }
        resolve(con)
      });
    })
  }

   static async query(sql, args){
    return new Promise((resolve, reject)=>{
      DB.getConnection().then(con =>{
        con.query(sql,args,(err, results) => {
          if (err) throw err;
          con.end()
          resolve(results)
        });
      })
    })
  }

  static async getSubjects(){
    const sql =  DB.getSubjectsSQL()
    return await DB.query(sql)
  }

  static getSubjectsSQL(){
    return `SELECT id, first, last
            FROM users u
            INNER JOIN subjects e
            WHERE u.id = e.user_id`
  }

  static async getPhotoFileNames(){
    const sql =   DB.getPhotoFileNamesSQL()
    return await DB.query(sql)
  }

  static getPhotoFileNamesSQL(){
    return `SELECT * from photos`
  }
}
module.exports = DB
