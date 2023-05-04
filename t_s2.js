
const express = require('express')
const app = express()
const fs = require("fs")
const path = require("path")
var bodyParser = require('body-parser')

const port = 3000
app.use(bodyParser.json())
let noticias = []
// GET
app.get('/', (req, res) => {
    
    fs.readFile(path.join(__dirname, 'main.html'), (err, contenidoArchivo)=>{
        res.header('Content-type', 'text/html');
     
    res.send(contenidoArchivo)  })
})
app.get('/noticia', (req, res) => {
    res.send(noticias)
  })
// POST
app.post('/noticia', (req, res) => {
  const nueva_noticia = req.body
 
  noticias.push(nueva_noticia)

  const codigo_respuesta = 201 

  const respuesta =  'mensaje  enviado con exito'
    
      
    
  
    res.status(codigo_respuesta).send(respuesta + "\n " + "id: "+  nueva_noticia.id + "\n " + "titulo: "+ nueva_noticia.titulo)
  })
// PUT
app.put('/noticia/:id', (req, res) => {
  let id = req.params.id
  const titulo = req.body.titulo
  const mensaje = req.body.mensaje

  const index =noticias.findIndex((noticia)=>{
    return (noticia.id === Number.parseInt(id))
  })

  if (index >= 0){
const news = noticias[index]
news.titulo = titulo
news.mensaje= mensaje
res.json(news)
  }
else{
   res.status(404)
}

    
  
   
   

    res.send(noticias);


  })
app.delete('/noticia/:id', (req, res) => {
  const nueva_noticia = req.body
  
  console.log(nueva_noticia);

  const noticia = noticias.find(n=> n.id === parseInt(req.params.id));
  if (!noticia) return res.status(404).send('no se encontro la noticia');

  const news = noticias.indexOf(noticia);
  noticias.splice(news, 1);
    res.send("este mensaje: " + nueva_noticia.titulo +", fue eliminado" )
  
 


  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})