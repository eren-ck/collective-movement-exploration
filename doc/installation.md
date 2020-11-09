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

## Local installation on a Windows/macOS

1. Install PostgreSQL, PostGIS, Python 3
2. Create a new database
```
CREATE DATABASE animaldb;
adduser deploy sudo
```
3. Connect to the database and create the PostGIS extension
```
CREATE EXTENSION postgis;
```
4. Install Python requirements
```
pip install -r requirements.txt
```
5. Modify the ```config.py``` of the server project, for example

```
SECRET_KEY = '123456789'

DATABASE_FILE = ''
SQLALCHEMY_DATABASE_URI = postgresql://postgres:@localhost/animaldb
SQLALCHEMY_ECHO = True

SECURITY_URL_PREFIX = "/view"
SECURITY_PASSWORD_HASH = "pbkdf2_sha512"
SECURITY_PASSWORD_SALT = "123456789abcdef"

SECURITY_LOGIN_URL = "/login/"
SECURITY_LOGOUT_URL = "/logout/"
SECURITY_REGISTER_URL = "/register/"

SECURITY_POST_LOGIN_VIEW = "/admin/"
SECURITY_POST_LOGOUT_VIEW = "/view/"
SECURITY_POST_REGISTER_VIEW = "/view/"

SECURITY_REGISTERABLE = False
SECURITY_SEND_REGISTER_EMAIL = False
SQLALCHEMY_TRACK_MODIFICATIONS = False

```

6. Run ```app.py``` with Pyhton e.g. with PyCharm
7. Login with the user ```admin``` and password ```admin```

## Configuration of the server

1. Create a new user
```
adduser deploy
adduser deploy sudo
```
2. Install the required software
```
apt-get install -y python python-pip python-virtualenv gunicorn supervisor nginx
```
3. Create the project directory and the python environment
```
mkdir /srv/animal
cd /srv/animal
virtualenv animalenv
```
4. Activate the virtualenv
```
source animal/bin/activate
```
5. Install all python requirements with pip
6. Create the project folder
```
mkdir flask_project
cd flask_project
```
7. Deploy the Fask application via SMTP
8. Run a test with gunicorn
```
cd flask_project
gunicorn app:app -b localhost:8000
```
9. Configure supervisor to start gunicorn
```
nano /etc/supervisor/conf.d/flask_project.conf
```
```
[program:flask_project]
command = /srv/animal/animalenv/bin/gunicorn app:app -b ip_address:8000
directory = /srv/animal/flask_project
user = deploy
stdout_logfile = /srv/animal/flask_project/logs/gunicorn/gunicorn_stdout.log
stderr_logfile = /srv/animal/flask_project/logs/gunicorn/gunicorn_stderr.log
redirect_stderr = True
environment = PRODUCTION=1
```
10. Start gunicorn with the supervisor
```
supervisorctl reread
supervisorctl update
supervisorctl start flask_project
```
11. Configure Nginx
```
touch /etc/nginx/sites-available/flask_project
sudo ln -s /etc/nginx/sites-available/flask_project /etc/nginx/sites-enabled/flask_project
etc/nginx/sites-enabled/flask_project
```
```
server {
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    location /static {
        alias  /srv/animal/flask_project/static/;
    }
}
```



## Run via Docker on a local machine
1. cd into project root
2. To create and run the Docker Containers run the following command:
```
docker-compose -f docker-compose.prod.yml up -d --build
```
3. Check the logs via the following command:
```
docker-compose -f docker-compose.prod.yml logs -f
```
The app runs in http://0.0.0.0:5000

