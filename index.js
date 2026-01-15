import express, { response } from 'express'
import mysql from 'mysql'
import cors from 'cors'
import { configDB } from './configDB.js'

const db=mysql.createConnection(configDB)
const app=express()
app.use(cors())
app.use(express.json())

const PORT = 8000

//összes kategória lekérdezése

app.get("/books/categories", (request,response)=>{
    console.log('ok');
    const sql = "SELECT id, name FROM categories ORDER by name"
    db.query(sql,(error,result)=>{
        if(error){
            response.status(500).json({error:"Adatbázis Hiba!!"})
        }else{
            response.status(200).send(result)
        }
    })
})

app.get("/books/books", (request,response)=>{
    const sql = "SELECT books.id, books.title, books.author, books.description, books.cover, books.rating, categories.name from books, categories WHERE books.category_id = categories.id ORDER by books.title"
    db.query(sql,(error,result)=>{
        if(error){
            response.status(500).json({error:"Adatbázis Hiba!!"})
        }else{
            response.status(200).send(result)
        }
    })
})

app.get("/books/categ/:categId", (request,response)=>{
    const {categId} = request.params 
    const sql = "SELECT books.id, books.title, books.author, books.description, books.cover, books.rating, categories.name from books, categories WHERE books.category_id = categories.id and categories.id=? ORDER by books.title;"
    const values = [categId]
    console.log(sql);
    
    db.query(sql,values,(error,result)=>{
        if(error){
            response.status(500).json({error:"Adatbázis Hiba!!"})
        }else{
            response.status(200).send(result)
        }
    })
})

//egy könyv lekérdezése az cím részlet alapján

app.get("/books/title/:searchedText", (request,response)=>{
    const {searchedText} = request.params 
    const sql = "SELECT books.id, books.title, books.author, books.description, books.cover, books.rating, categories.name from books, categories WHERE books.category_id=categories.id and instr(books.title,?) ORDER by books.title;"
    const values = [searchedText]
    db.query(sql,values,(error,result)=>{
        if(error){
            response.status(500).json({error:"Adatbázis Hiba!!"})
        }else{
            response.status(200).send(result)
        }
    })
})
app.get("/books/author/:author", (request,response)=>{
    const {author} = request.params 
    const sql = "SELECT books.id, books.title, books.author, books.description, books.cover, books.rating, categories.name from books, categories WHERE books.category_id=categories.id and instr(books.author,?)>0 ORDER by books.title;"
    const values = [author]
    db.query(sql,values,(error,result)=>{
        if(error){
            response.status(500).json({error:"Adatbázis Hiba!!"})
        }else{
            response.status(200).send(result)
        }
    })
})

//új könyv hozzáadása
app.post("/books", (request,response)=>{
    const {title,author,description,cover,rating,category_id}=request.body
    const sql = "INSERT into books (title,author,description,category_id,cover,rating) values(?,?,?,?,?,?) "
    const values = [title,author,description,cover,rating,category_id]
    db.query(sql,values,(error,result)=>{
        if(error){
            response.status(500).json({error:"Adatbázis Hiba!!"})
        }else{
            response.status(201).send({id:result.insertId,title,author,description,category_id,cover,rating})
        }
    })
})
app.delete("/books/:id", (request,response)=>{
    const {id} =request.params
    const sql = "DELETE books from where id=?"
    const values = [id]
    db.query(sql,values,(error,result)=>{
        if(error){
            console.log(error);
            return response.status(500).json({error:"Adatbázis Hiba!!"})
            
        }
        if(result.affectedRows==0){
            return response.status(404).json({error:"A megadott könyv nem létezik"})
        }
        response.status(200).json({msg:"Sikeres törlés!"})

    })
})

app.put("/books/:id",(req,resp)=>{
    const {id} = req.params
    const {title,author,description,cover,rating} = req.body
        if(!title || !author || !description || !cover || !rating){
        return resp.status(400).json({error:"Minden mező kötelező!"})
    }
    const sql = "UPDATE books SET title = ?,author=?,description=?,cover=?,rating=? WHERE id = ?"
    const values = [title,author,description,cover,rating,id]
    db.query(sql,values,(err,res)=>{
        if(err){
            console.log(err);
            return resp.status(500).json({error:"Adatbázis hiba!"})
        }if(res.affectedRows==0){
            return resp.status(404).json({error:"A megadott könyv nem létezik!"})
        }else{
            return resp.status(200).send(res)
        }
    })
})

app.listen(PORT,()=>console.log(`server listening on port : ${PORT}`));