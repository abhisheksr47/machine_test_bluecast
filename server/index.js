const express = require("express");
const cors = require("cors");
const path=require('path')
const multer=require('multer')
const app = express();
const upload=multer({dest:'uploads/'})
app.use(cors());



app.post("/upload",upload.single("image"), (req, res) => {
  console.log(req.file);

  if (req.file) {
    
    res.json({ ack: "got" ,filename:req.file.filename});
    console.log(req.file);
  } else {
    res.json({ ack: "not got" });
  }
});

app.get("/download/:filename",(req,res)=>{
    const filename=req.params.filename
    const filepath=path.join(__dirname,"uploads",filename)
    console.log(filepath);
    
    res.download(filepath)
})

app.listen(3000, () => {
  console.log("Running");
});
