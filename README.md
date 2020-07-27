# SAP Service Layer Proxy
A Proxy written on NodeJS that simplifies the cookie authentication needed for SAP Service Layer, and the parameters to operations like GET/PATCH/DELETE passed as part of the URL (Service Layer wants like /ProfitCenter('Test1') but you maybe want to do /ProfitCenter?id=Test1).

### Overview
- It is coded in `[NodeJS](https://nodejs.org/en/)`.
- It allows the integration between SAP Service Layer (B1, Hana, etc) and Scribe Online (this is my case), but it should work with any App that is able to work with REST.
- It is designed for SAP SL but you can modify it to suit your needs.
- I used express, body-parser and requestify, but did a little modification to requestify to change PUT to PATCH, becasue SL uses PATCH when you want to delete records.
- It will allow you to use Basic Authentication to connect to SL.  Internally it will handle all SL Cookie Authentication every 20 minutes (or whatever time you set).
- It currently works through HTTP.  You will see some //TODO comments in the code because i have plans to change it to HTTPS.
- It allows you to use "?id=:recordId" instead of the "(':recordId')" when "updating/deleting/getting specific record" that Service Layer uses, but it wont limit you if you want to do it.

### Setup
First download project from:  https://github.com/scorpile/SAP-Service-Layer-Proxy

You need to modify the app.js file:
- You can change the PORT from 3000 to any port you want.
- Change the YOURSERVER string with your server's name or address (ie: sapserver.com or 10.1.1.1 or servername:50000).
- Change the variable counter from 20 to any amount of minutes you want the proxy to refresh the session with SL.
- Change ANYUSERNAME:ANYPASSWORD to any user:password you want to use.  Those are from your application to the proxy.
- Change the credentials from manager, YOURPASSWORD, YOURDB to whatever credentials your SAP Consultant gives.  Those are for connecting to SAP Service Layer.
- Run with "node app.js" for testing.  Later you can make it run as a service, it's up to you the method you choose for that.

### Usage
After the proxy is running you should see a console log about listening on the port you specified, and the successful connection to SAP Service Layer.

At this point you can test it normally with Postman or any other app you prefer.  Remember to use "Basic authentication" and set the ANYUSERNAME:ANYPASSWORD you used.

If you run the node on your local computer, you can try it with http://127.0.0.1:3000/ and you should get the SAP Metadata.

SL uses an " id in the url " that is not supported by some API integration apps, example: http://127.0.0.1:3000/ProfitCenters('Test1') 

The proxy allows you to use that type of urls, or if you prefer you can use an "id" parameter like: http://127.0.0.1:3000/ProfitCenters?id=Test1 and internally it will convert it.
