import express from "express"
import cors from "cors"
import {v4 as uuid} from "uuid"

const app = express()

app.use(cors())
app.use(express.json())

let notesArray = [
 



  
 
]

app.get("/get-notes", (req,res)=>{
   return res.status(201).json({
    success : true,
    message : "data added successfully in notesArray",
    error : null,
    data : notesArray,
  })


})

app.post("/add-notes", (req,res)=>{
  let {title, text, color} = req.body

  if(!title || !text){
    return res.status(404).json({
      success : false,
      message : "title || text are not found",
      error : {
        code : "TEXT_TITLE_NOT_FOUND",
        field : "title || text",
        details : "title and text not provided ",
      },
      data : null,
    })

  }

  let obj = {
    id : uuid(),
    title, text, color
  }
  notesArray.push(obj)
  return res.status(201).json({
    success : true,
    message : "data added successfully in notesArray",
    error : null,
    data : notesArray,
  })
})

app.delete("/delete-notes", (req,res)=>{
  let id = req.query?.id
  if(!id){
    return res.status(401).json({
      success : false,
      message : "id is not found",
      error : {
        code : "ID_NOT_FOUND",
        field : "id not provided",
        details : "plz id provided correctlly",
      },
      data : null
    })
  }

   let findId = notesArray.find((item)=> id == item.id)

    if(!findId){
      return res.status(400).json({
        success : false,
        message : "id not provided correctlly",
        error : {
          code : "ID",
          field : "id provided wrong",
          details : "plz provided id correctlly",
        },
        data : null
      })
    }

    notesArray = notesArray.filter((item)=> item.id != id)

    return res.status(201).json({
      success : true,
      message : "data successfully deleted",
      error : null,
      data : notesArray
    })
})


app.patch("/update-notes", (req,res)=>{
  let id = req.query?.id
   let {title, text, color} = req.body

   if(!id || !title || !text){
    return res.status(401).json({
      success : false,
      message : "id or title or text any one more not found",
      error : {
        code : "ID_TEXT_TITLE_IS_NOT_FOUND",
        field : "id and title and text not provided",
        details : "ple provided id and title and text correctlly",
      },
      data : null
    })

  

    

   }
     let findId = notesArray.find((item)=> id == item.id)

    if(!findId){
      return res.status(400).json({
        success : false,
        message : "id not provided correctlly",
        error : {
          code : "ID",
          field : "id provided wrong",
          details : "plz provided id correctlly",
        },
        data : null
      })
    }

    findId.title = title
    findId.text = text
    findId.color = color

    return res.status(201).json({
      success : true,
      message : "data updated succeefully",
      error : null,
      data : notesArray
    })


})





app.listen(5047, ()=>console.log("server is running"))