import { useState } from 'react'

import './App.css'
import axios from 'axios'

function App() {

  const [image, setImage] = useState(null)
  const [downurl,setDownurl]=useState(null)

  const handlefile = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!image){
      console.log('No image selected');
      return
      
    }
    const data = new FormData()
    data.append("image", image)

    axios.post('http://localhost:3000/upload', data).then((result) => {
     
      
      console.log(result)
      setDownurl(`http://localhost:3000/download/${result.data.filename}`)
    }).catch((err) => {
      console.log(err);

    })

  }

  return (
    <>
      <form onSubmit={handleSubmit}  method="post" enctype="multipart/form-data">

        <input type='file' onChange={handlefile} />
        <button type="submit">Upload</button>

      </form>
      {downurl &&(
        <div>
          <p>Uploaded Succesfullly</p>
          <a href={downurl}>Download File</a>

        </div>
        
      )}
    </>
  )
}

export default App
