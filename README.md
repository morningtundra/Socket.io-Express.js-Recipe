# Minimal Configuration of Socket.io & Express-Generator Recipe

## **Objective:** 
Configure socket.io to work with the default skeleton template generated by Express.js.

## **Prerequisites:** 
1. [Node.js](https://nodejs.org/en/download/) v14.15.0
2. [nodemon](https://nodemon.io/) v2.0.7
3. [Express.js](https://expressjs.com/) v4.16.1
4. [npm](https://www.npmjs.com/) v 7.5.4
5. [Socket.io](https://socket.io/) v3.1.1

Ensure the first four prerequisites are correctly installed on your system and running without errors.

## **Preamble:**

There are many tuts online explaining how to get Socket.io working with NodeJS but few explaining how to do this with [Express Application Generator](https://expressjs.com/en/starter/generator.html).

---

## Step 1 - Generate the Express skeleton

Using Express Generator, create a folder structure populated with the default templates. We'll call this example `node-socket.io`.

    express -e ejs node-socket.io

Navigate into the new project folder and install socket.io and supporting npm packages. 

    cd node-socket.io
    npm install socket.io --save
    npm install

![Express-Generator](img/a.1.png  'Express-generator')

Edit the file `bin\www` and create two new entries. The first will call (`require`) a new file we'll create later, containing our application socket.io code. 

    let socketapi = require("../socketapi");

The second entry will create a socket listner using the application code in the new file `socketapi.js`.

    socketapi.io.attach(server);

![Express-Generator](img/a.2.png  'Express-generator')

Create a new file called `socketapi.js` at the top level of the project folder. Paste in the following code...

    const io = require( "socket.io" )();
    const socketapi = { io: io };

    io.on( "connection", (socket) => {
        console.log( "A user connected" );
        io.emit('message', 'Hi Browser, this is your Server emitting');
        io.on('disconnect', () => {
            console.log(" A user disconnected");
        })
    });

    module.exports = socketapi;


![Express-Generator](img/a.3.png  'Express-generator')

Open and edit the file `views/index.js` and add the following code snippet. This will run in the browser.

    <script src="/socket.io/socket.io.js"></script>
    <script>
      var socket = io();
      socket.on('message', (msg) => {
        console.log(msg);
      })
    </script>

**Note:** Socket.io is comprised of two parts - the server-side libraries (`socket.io`), and a browser-side library (`socket.io.js`).

If everything is wired correctly, the server-side process will respond to this `<script>` call and serve up the browser-side library. Response to this request is handled by Socket.io and **NOT** by node.js or any Express route. So don't be tempted to put this library somewhere like `public/`.

    <script src="/socket.io/socket.io.js">

![Express-Generator](img/a.4.png  'Express-generator')

Start the node app with `node bin/www` or `nodemon bin/www`. 

Load the app in the browser and examine the developer console.

![Express-Generator](img/a.5.png  'Express-generator')

This concludes the basic, minimal setup.