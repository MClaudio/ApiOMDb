const express = require('express')
const path = require('path')

const app = express();


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
})

app.get('/movie/:id', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/views/movie.html'));
})

//statics files
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', 5000);
app.listen(app.get('port'), ()=>{
    console.log('Server is run on port: ', app.get('port'));
})