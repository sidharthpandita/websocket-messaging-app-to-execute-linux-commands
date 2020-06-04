------------------------------------Instructions----------------------------------------
1. Open the project folder and run the command "npm install" to install the required node modules. 
2. Run the command "node server.js" to start the server. 
3. Open the index.html file in any web browser. 
4. Generate a random linux command or write your own one in the input box. Click on send button after this. 
5. You will receive an "ACK" or "NOACK" depending on the successful or unsuccessful run of your command. 
 


----------------------------------About The Project--------------------------------------
1. I used NodeJS for writing the server side code and created a simple HTML interface for interacting with the server. 
2. The messages are encrypted at the client side and decrypted at the server side with RSA using forge library. 
3. The commands are received at the server side and executed using exec function. 
4. There is a single server and multiple client connections can be opened. 


