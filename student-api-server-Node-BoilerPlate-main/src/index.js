const express = require('express')
const app = express();
const bodyParser = require("body-parser");

const port = 8080;

app.use(express.urlencoded());
// const {MongoClient} = require('mongodb');
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
// const dbName = 'student';

let studentArray = require('./InitialData');
// console.log('student array', studentArray);

let mapStudent = new Map();
let newId;
for(let i = 0; i < studentArray.length; i++) {
    mapStudent.set(studentArray[i].id, studentArray[i]);
    if(i === studentArray.length-1) {
        newId = studentArray[i].id;
    }
}

// let ids = new Set();
// for(let i = 0; i < studentArray.length; i++) {
//     ids.add(studentArray[i].id);
// }
// console.log(ids);

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// app.use('/api', studentRouter)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

/*
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Mongoose is Up")
})

app.use('/api', studentRouter)
*/

async function main() {

    // await client.connect();
    // console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('students');

    app.get('/api/student', (req, res) => {
        try {
            // const student = studentArray;
            // console.log(req)
            // console.log(student)
            res.status(200).json({
                status: "Success",
                data: studentArray
            })
        } catch(e) {
            res.status(400).json({
                status: "Failed",
                message: e.message
            })
        }
    })


    app.get('/api/student/:id', (req, res) => {
        try {
                res.status(200).json({
                status: "Success",
                data: mapStudent.get(parseInt(req.params.id))
            })
        } catch(e) {
            res.status(400).json({
                status: "Failed",
                message: e.message
            })
        }
    })
    
    app.post('/api/student', (req, res) => {
        if(req.body.name !== undefined && req.body.currentClass !== undefined && req.body.division !== undefined) {
                newId++
                const student = {
                    id: newId,
                    name: req.body.name,
                    currentClass: parseInt(req.body.currentClass),
                    division: req.body.division
                }
                studentArray.push(student);
                mapStudent.set(newId, student);
                res.status(200).json({
                    status: "Success",
                    student
                })
        } else {
            res.status(400).json({
                status: "Failed",
                message: "Insufficent Data"
            })
        }
        
    })

    app.put('/api/student/:id', (req, res) => {
        if (mapStudent.has(parseInt(req.params.id))) {
            const student = mapStudent.get(parseInt(req.params.id))
            console.log(student)
            for(let i = 0; i < Object.keys(req.body).length; i++) {
                let key = Object.keys(req.body)
                student[Object.keys(req.body)[i]] = req.body[key[i]]
                // console.log(student[Object.keys(req.body)[i]])
            }
            console.log(student)
            mapStudent.delete(req.params.id)
            mapStudent.set(req.params.id, student)
            res.status(200).json({
                status: "Success",
                student
            })
        } else {
            res.status(404).json({
                status: "Failed",
                message: "Invalid Id"
            })
        }
    })

    app.delete('/api/student/:id', async (req, res) => {
     
        if (mapStudent.has(parseInt(req.params.id))) {
            let index;
            for(let i = 0; i < studentArray.length; i++) {
                if (studentArray[i].id === parseInt(req.params.id)) {
                    index = i;
                    break;
                }
            }
            studentArray.splice(index,1);
            mapStudent.delete(req.params.id)
            res.status(200).json({
                status: "Success"
            })
        } else {
            res.status(400).json({
                status: "Failed",
                message: "Invalid Id"
            })
        }
    })
    
}

main()
 .then(console.log())
 .catch(console.error())
//  .finally(() => client.close())

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   