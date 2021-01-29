const mysql = require('mysql')
class DB {

  async getTimeStamp(insertId){
    this.assertPositiveInteger(insertId)
    const sql = this.getTimeStampSQL()
    const results = await this.query(sql, [insertId])
    return results[0].timestamp
  }

  getTimeStampSQL(){
    return `SELECT
              timestamp
            FROM
              logins
             WHERE
              id = ?`
  }

  async insertUserLogin(userId){
    this.assertPositiveInteger(userId)
    const sql = this.insertUserLoginSQL()
    const result = await this.query(sql,[userId])
    return result.insertId
  }

  insertUserLoginSQL(){
    return `INSERT INTO
              logins
            (user_id)
              VALUES
            (?)`
  }

  async getSubjects(){
    const sql =  this.getSubjectsSQL()
    return await this.query(sql)
  }

  getSubjectsSQL(){
    return `SELECT id, first, last
            FROM users u
            INNER JOIN subjects e
            WHERE u.id = e.user_id`
  }

  async getPhotoFileNames(){
    const sql =   this.getPhotoFileNamesSQL()
    return await this.query(sql)
  }

  getPhotoFileNamesSQL(){
    return `SELECT * from photos`
  }

  getConnection(){
    const con = mysql.createConnection({
      host:'localhost',
      user:'chris',
      password:'devpassword',
      database:'river'
    });
    return this.connect(con)
  }

  connect(con){
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

   async query(sql, args){
    return new Promise((resolve, reject)=>{
      this.getConnection().then(con =>{
        con.query(sql,args,(err, results) => {
          if (err) throw err;
          con.end()
          resolve(results)
        });
      })
    })
  }

  assertPositiveInteger(userId){
    if(!Number.isInteger(userId) || userId < 1)
      throw new Error('userId must be a positive integer.')
  }
}
module.exports = DB
