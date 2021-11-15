# Floran_POS
## Introduction

Floran POS is an ERP solution for Hotel and lounge to manage their business from any device instead of buying POS System

## Feature Available once ready

<ol>
<li> Inventory management
<li> Kitchen and restrauant management and service system
<li> Business Intellegence
<li> Hotel management
<li> Easy overall bill genearate for customer
<li> Staff Management
<li> Restaurant Management
<li> Multiple POS system
<li> Security
</ol>

## Requirement 
Python v.3.8+
<br>Node.JS 
## Setup

### Clone Repository

create virtual env
```bash
    pip install virtualenvwrapper-win
    mkvirtualenv reactdj
```
for linux use this command
```bash
    apt-get install python3-venv  
    python3 -m venv reactdj
```

To activate environment
```bash
    workon reactdj
```

To activate environment in linux
```bash
    source reactdj/bin/activate
```

Copy Paste the following commands to clone the repo

```bash
    https://github.com/Floran-Github/Floran_POS.git
```

## To run backend django rest framework

Go inside the floran_pos_backend directory and install the module from requirements.txt

```bash
  cd floran_pos_backend
  pip install -r requirements.txt
 ```
 
 Then make the migrations and then migrate the database
 
 ```bash
    python manage.py makemigrations
    python manage.py migrate
  ```
  
  Create the superuser 
  
  ```bash
    python manage.py createsuperuser
  ```
  
  Now run the django server on your local network instead of localhost for react to communicate
  
  ```bash
    python manage.py runserver 0.0.0.0:8000
  ````
  
  <h2>Now you goto localhost:8000 to see the API</h2>
  
  ```bash
      http://127.0.0.1:8000/api/auth
  ```
  ## To run frontend react
  
  Now Open the new terminal or CMD and then direct to floran_pos_frontend folder inside the clone directory to run react server
  
  Go inside the floran_pos_frontend directory and install the library 

```bash
  cd floran_pos_frontend
  npm install
 ```
 
  ### FOR REACT TO COMMUNICATE WITH DJANGO YOU NEED TO WRITE YOUR IP ADDRESS IN /floran_pos_frontend/src/actions/types.js
  
  ```bash
  ipconfig
 ```
 NOW IN LINE NUMBER 34 OF /floran_pos_frontend/src/actions/types.js
 
 ```bash
 REPLACE
 export const BASE_URL = 'http://192.168.0.179:8000/'
 WITH
 export const BASE_URL = 'http://<YOUR_IP_ADDRESS>:8000/'
 ```
 
  Now Run the script to run react server on your local network
  
  ```bash
    npm run server
  ```
  
  If above give webpack Permission Denied error in linux, then run this command
  ```bash
    npm install --save-dev webpack
    npm run server
  ```
  
  <h2>Now you goto localhost:3000 to see the website</h2>
  
  ```bash
      http://127.0.0.1:3000/
  ```
  
  ## Note
  
  Here is the admin login id <br>
  user:- floranadmin<br>password:- adminadmin<h4> TO ACCESS ADMIN PANEL MAKE SURE TO OPEN IT IN INCOGNITO WINDOW </h4>
  
  ## Stage
  
  <h3> Developement stage </h3>
  
  ## Sponsor by
  
  <a href="https://www.google.com/search?sxsrf=ALeKk01rNvQWOTqmMH1Igu5_nmRysHr3VA:1625576940815&q=masters+computer+enterprise+sakinaka&spell=1&sa=X&ved=2ahUKEwivwfKAws7xAhWZAHIKHY-PAFUQBSgAegQIARAw">Master Computer Enterprise</a>
  
