reportamoose
============

report a moose frontend and backend application


Installation
------------

To get the project working on your mashine you need two things to install:

* [git](http://git-scm.com/) - the version controll system to download und upload code to github
* [nodeJS](http://nodejs.org/) - the javascript runtime to develope and test the code

### Step 1

Clone the project to your local pc with the terminal*:

``git clone https://github.com/stetro/reportamoose.git``

### Frontend

Go to the `phone` folder and install all node dependencies*:

```
npm install -g yeoman
npm install
bower install
```

Run the server for this with*:

``grunt server``

### Backend

Go to the `phone` folder and install all node dependencies*:

```
npm install -g lcm
npm install

```

Run the server for this with*:

``lcm server``

>*You need maybe a terminal configuration when the commands are not found!

### Deploying on different devices

For deploying you need the phonegap application and the specific build environment installed. Go to the `phonegap/reportamoose` folder and run your specific system:
```
npm install -g phonegap
phonegap run android		# or ios, blackbarry ...
```

Information and Tutorials
-------------------------

* Nice Git Introduction from [net.tutsplus](http://net.tutsplus.com/tutorials/other/easy-version-control-with-git/)

* [Locomotive JS](http://locomotivejs.org/guide/) - Guide for backend development with JavaScript

* [AngularJS](http://angularjs.org/) - Beginners guide for frontend development with JavaScript


