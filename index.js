const http = require('http');
const path = require('path');
const fs = require('fs');
const { ENOENT } = require('constants');
const server = http.createServer((req, res) => {
//   if(req.url === '/') {
//     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
//         if(err) throw err;
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(content);
//     })

//   }

//   if(req.url === '/api/users') {
//       const users = [
//           {
//               name: 'Bob Smith',
//               age: 40,
//           },
//           {
//               name: 'John Doe',
//               age: 35
//           }
//       ];
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(users));
//   }

   //Build file path
   const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

   //Extension file
   const extName = path.extname(filePath);

   //Initial content type
   let contentType = 'text/html';

   //Check ext and set content type
   switch(extName) {
       case '.js':
           contentType = 'text/javascript';
           break;
       case '.css':
           contentType = 'text/css';
           break;
       case '.json':
           contentType = 'application/json';
           break;
       case '.png':
           contentType = 'image/png';
           break;
       case '.jpg':
           contentType = 'image.jpg';
           break;
   }

   //Read file path
   fs.readFile(filePath, (err, content) => {
       if(err) {
           if(err.code === 'ENOENT') {
               //PAGE NOT FOUND
               fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf8');
               })
           } else {
               //Some server error
               res.writeHead(500);
               res.end(`Server error ${err.code}`)
           }
       } else {
           //Successful response
           res.writeHead(200, { 'Content-Type': contentType });
           res.end(content, 'utf8');
       }
   })
})

const PORT = process.env.port || 5000;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));