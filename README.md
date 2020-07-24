# SAPServiceLayerProxy
A Proxy written on NodeJS that simplifies the cookie authentication needed for Service Layer, and the parameters to operations like GET/PATCH/DELETE passed as part of the URL (Service Layer wants like /ProfitCenter('Test1') but you maybe want to do /ProfitCenter?id=Test1).

### Overview
- It is coded in [NodeJ](https://nodejs.org/en/).
- It allows the integration between SAP Service Layer (B1, Hana, etc) and Scribe Online (this is my case).
- It is designed for SAP SL but you can modify it to suit your needs.
- I used express, body-parser and requestiy, but did a little modification to requestify to change PUT to PATCH, becasue SL uses PATCH when you want to delete records.

### Setup
You need to modify the app.js file:
- You can change the PORT from 3000 to any port you want.
- Change the YOURSERVER string with your server's name or address (ie: sapserver.com or 10.1.1.1 or servername:50000).
- Change the variable counter from 20 to any amount of minutes you want the proxy to refresh the session with SL.
- Change the credentials from manager, YOURPASSWORD, YOURDB to whatever credentials your SAP Consultant gives.
- Run with "node app.js" for testing.  Later you can make it run as a service, it's up to you the method you choose for that.

### Usage
After the proxy is running you can test it normally with 
