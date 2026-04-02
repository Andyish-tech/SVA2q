const express = require('express')
const app = express()
app.use(express.json())
const mysql = require('mysql2')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'edsoddb'
})
db.connect((err)=>{
    if(err){
        console.log('error connecting to database',err)
    }else{
        console.log('connected to database')
        
    }
})
app.get('/',(req,res)=>{
    res.send('Welcome to our server')
})

app.get('/api/classes', (req,res)=>{
let sql = "SELECT * FROM classes"
db.query(sql,(err, result)=>{
    if(err){
        console.log('error in fetch classes', err);
        res.status(500).json({error:'error fetching classes'})
        
    }else{
        res.status(200).json(result)

        
    }
})
})


app.get('/api/classes/:id', (req,res)=>{
let sql = "SELECT * FROM classes  where class_id=?"
let id = req.params.id
db.query(sql,[id], (err, result)=>{
    if(err){
        console.log('error in fetch classes', err);
        res.status(500).json({error:'error fetching classes'})
        
    }else{
        res.status(200).json(result)

        
    }
})
})

app.get('/api/students/:id', (req, res) => {
    const { id} = req.params;

    let sql = `
        SELECT id, full_name, age, class_name 
        FROM students
        JOIN classes ON students.class_id = classes.class_id
        WHERE students.id = ? 
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Error fetching student', err);
            return res.status(500).json({ error: 'Error fetching student' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(result[0]);
    });
});
    
app.post('/api/class', (req,res)=>{
    let sql = 'INSERT INTO classes (class_name) VALUES(?)';
    let class_name = req.body.class_name;
    db.query(sql, [class_name],(err,result)=>{
        if(err){
            console.log('fail to fetch',err);
            res.status(500).json({error: 'error in create class'})
            
        }else{
            res.status(201).json({message:'class created successfull'});
        }
    })
})
app.post('/api/student', (req,res)=>{
 let sql = 'INSERT INTO students (full_name, age, nid, class_id) VALUES(?,?,?,?)';
    let {full_name, age, nid, class_id} = req.body;
    db.query(sql, [full_name, age, nid, class_id],(err,result)=>{
        if(err){
            console.log('fail to fetch',err);
            res.status(500).json({error: 'error in create student'})
            
        }else{
            res.status(201).json({message:'student created successfull'});
        }
    })
})
app.put('/api/student/:id', (req, res) => {
    let student_id = req.params.id;
    let { full_name, age, nid, class_id } = req.body;

    let checkSql = "SELECT * FROM students WHERE id = ?";

    db.query(checkSql, [student_id], (err, results) => {
        if (err) {
            console.log('fail', err);
            return res.status(500).json({ error: 'fail to get student' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'student with this id not found' });
        }

        let updateSql = `
            UPDATE students 
            SET full_name=?, age=?, nid=?, class_id=? 
            WHERE id=?
        `;

        db.query(updateSql, [full_name, age, nid, class_id, student_id], (err, result) => {
            if (err) {
                console.log('fail', err);
                return res.status(500).json({ error: "fail to update" });
            }

            res.status(200).json({ message: 'successfully updated' });
        });
    });
});

      
app.delete('/api/student/:id', (req, res) => {
    const student_id = req.params.id;

    let sql = 'DELETE FROM students WHERE id = ?';

    db.query(sql, [student_id], (err, result) => {
        if (err) {
            console.log('Error deleting student', err);
            return res.status(500).json({ error: 'Error deleting student' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });
    });
});
app.post('/api/register', async(req,res)=>{
    let {email, password, role} = req.body;
    let hashedpassword = await bcrypt.hash(password, 10);
    let sql = 'INSERT INTO users(email,password,role) VALUES (?,?,?)' ;
    db.query(sql, [email, hashedpassword, role], (err,result)=>{

    if (err) {
            console.log('error', err);
            return res.status(500).json({ error: 'fail to create user' });
        }else{
            res.status(201).json({message:"user created"})
        }
})
    })
    app.post('/api/login', async(req,res)=>{
        let {email, password} = req.body;
        let sql = "select * from users where email =?";
        db.query(sql,[email], async(err,result)=>{
           if (err) {
            console.log('error', err);
            return res.status(500).json({ message: 'fail to login try again'});
           }else if(result.length ==0){
            res.status(400).json({ message: 'invalid email or password'});
           }else{
            let userdata = result[0];
            let ismatch = bcrypt.compare(password, userdata.password);
            if(!ismatch){
                 res.status(400).json({ message: 'invalid email or password'});
            }
let token = JsonWebTokenError.sign(
    {id: userdata.id, role: userdata.role},
    'SECRETE_KEY',
    {EXPIRED: '1h'}
)
res.status(200).json({ message: 'login successfull', token: 'token'});
           } 
        })
    })
app.listen(3000, () =>{
    console.log(' Our App is running on port 3000');
})