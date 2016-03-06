# Cookit_Microservice
This project is about to run Microservices built with Seneca on Osv Unikernel.

<b>Setup</b>

use npm install in each service and server folder.
To run the services call e.g:

<i>node searchPinService.js</i><br/>

<b>Run the Unikernel</b>

Install any virtualizer like qemu or virtualbox.
This manual is for building it with qemu.

<i>apt-get install qemu</i><br/>

Install Capstan http://osv.io/run-locally/

Create a mysql database and use the sqlScript to create a new database, table and demo recipes.
You need to create a user "student"@"%" with the password "myPass" who can select and insert into the database.
In the mysqld.cnf change the bind-address from localhost to an IP-Address, so that the services on the
Unikernel can reach the database and restart mysql.

Go in one folder and run "capstan build".
Afterwards run <i>capstan run 3000:3000</i> to start the Unikernel mapping the Unikernel port to the local port.
Port mapping:

searchService: 4000:4000
getRecipeService: 4001:4001
authService: 4002:4002
addRecipeService: 4003:4003

<b>Run the Unikernel in bridge mode</b>

Create a virtualbridge and add the bridge name into the bridge.cnf file in /etc/qemu.
If the file does not exist, create it.

<i>allow {bridgename}</i><br/>

Go in one folder and run "capstan build".
Now use <i>sudo {path to capstan} run -n bridge</i>
Each service should now get an IP-Address. Change to this address in the server.js file and start the server.
It should now be possible to call the Webservice without problems.
