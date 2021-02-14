const mysql = require('mysql')
const LoginRequest  = require('./models/LoginRequest')

class DB {


  async getPhoto(){
    const sql = this.getPhotoSQL()
    const results = await this.query(sql)
    return results[0]
  }

  getPhotoSQL(){
    return `SELECT
              id, url
            FROM
              photos
            ORDER BY RAND()
            LIMIT 1`
  }

  async getSelectableUsers(){
    const sql = `SELECT
                    `
  }

  async updateGetPhotoRecord(sampleId){
    const sql = `UPDATE
                    viewing_samples
                 SET
                    next_requested_at = now(6)
                 WHERE
                    id = ?`
    const result = await this.query(sql,[sampleId])
    if(result.affectedRows != 1)
      throw new Error('Something went wrong.')
  }

  async getSampleUserId(sampleId){
    const sql = `SELECT user_id from viewing_samples WHERE id = ?`
    const results = await this.query(sql, [sampleId])
    return results[0].user_id
  }

  async insertGetPhotoRecord(userId, photoId){
    if(!userId || !photoId)
      throw new Error('userId or photoId missing.')
    const sql = this.insertGetPhotoRecordSQL()
    const result = await this.query(sql,[userId, photoId])
    return result.insertId
  }


  insertGetPhotoRecordSQL(){
    return ` INSERT INTO viewing_samples
                    (user_id, photo_id)
                  VALUES
                    (?,?)`
  }

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

  async insertUserLogin(request){
    if(request instanceof LoginRequest == false)
      throw new Error('Expected LoginRequest instance.')
    const sql = this.insertUserLoginSQL()
    const args = request.getSQLArgs()
    const result = await this.query(sql, args)
    return result.insertId
  }

  insertUserLoginSQL(){
    return `INSERT INTO
              logins
            (user_id, lat, lon)
              VALUES
            (?,?,?)`
  }

  async getSubjects(){
    const sql =  this.getSubjectsSQL()
    return await this.query(sql)
  }

  getSubjectsSQL(){
    return `SELECT s.id, first, last
            FROM users u
            INNER JOIN subjects s
            WHERE u.id = s.id`
  }

  async getPhotoFileNames(){
    const sql =   this.getPhotoFileNamesSQL()
    return await this.query(sql)
  }

  getPhotoFileNamesSQL(){
    return `SELECT * from photos`
  }

  getConnection(){
    const obj = this.getConnectionObj()
    const con = mysql.createConnection(obj);
    return this.connect(con)
  }

  getConnectionObj(){
    return {
      host:'localhost',
      user:'chris',
      password:'devpassword',
      database:'river'
    }
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
