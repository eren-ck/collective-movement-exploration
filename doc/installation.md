# Installation Tutorial

## Architecture

A Client-Server-Architecture was implemented. The architecture of the application can be seen in the following Figure.

<p align="center"><img width=100% src="https://raw.githubusercontent.com/dbvis-eren-ck/collective-movement-exploration/master/media/system-architecture.png"></p>

1. The user access the web application
2. The system get the HTTP request and the proxy routes it to the specific virtual machine.
Gunicorn takes the HTTP request and starts a new worker Flask for the request
3. Flask either stores or accesses data from PostgreSQL
4. The data is then used to generate a HTML page or a JSON stream
5. The HTML page or stream is routed back to the user
6. The user accesses the requested web page



## Run via Docker on a local machine
1. install Docker on your machine
2. cd into project root

3. To create and use the Docker Containers run the following command:
```
docker-compose up -d --build
```
Ignore the "Error October 2020" message for now.
4. Check the logs via the following command:
```
docker-compose logs -f
```
The app runs in http://0.0.0.0:5000
Default Email Address: admin
Default Password: admin
