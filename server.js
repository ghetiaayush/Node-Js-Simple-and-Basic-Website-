const http = require("http");
const fs = require("fs");

http.createServer((req, resp) => {

  //  Sync: Header file loaded before anything else
      let collectHeaderData = fs.readFileSync("html/header.html", 'utf-8');

      let file = "/home";
      if (req.url !== '/') {
           file = req.url;
      }

   //  Async: Header file loaded separately
   // fs.readFile("html/header.html", "utf-8", (error, headerData) => {
   //       if (error) {
   //          resp.writeHead(500, { "content-type": "text/plain" });
   //          resp.end("Internal Server Error");
   //          return false;
   //       }
   //       collectHeaderData=headerData;
   //       // resp.write(headerData);
   //       // resp.end();
   //    });

   if (req.url !== '/style.css') {
      fs.readFile("html" + file + ".html", 'utf-8', (error, data) => {
         if (error) {
            resp.writeHead(500, { "content-type": "text/plain" });
            resp.end("Internal Server Error");
            return false;
         }
         resp.write(collectHeaderData + "" + data);
         resp.end();
      });
   }
   // Serve CSS with correct content-type 
   else if (req.url === '/style.css') {
      fs.readFile("html/style.css", "utf-8", (error, data) => {
         if (error) {
            resp.writeHead(500, { "content-type": "text/plain" });
            resp.end("css not found");
            return false;
         }
         resp.writeHead(200, { "content-type": "text/css" });
         resp.end(data);
      });

   }
   }).listen(3200);