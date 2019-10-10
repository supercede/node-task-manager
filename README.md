# Introduction
It is a simple Task-manager app that allows registered users create tasks. Tasks can also be deleted/edited.
App is hosted at: https://destiny-task-manager.herokuapp.com.
Requests can be sent through Postman

# Overview
The App uses the sendgrid email client to notify users on (de)activation of acounts. Users are unable to view other users' tasks. Users can upload avatars as well as delete them.

# Authentication
JWT is used to validate users on log in. Users can log out with the '/logout' route upon which the token is destroyed. It is important that the JWT is present in the request header as the value to the 'authorization' key.

# Error Codes
* 200 - OK
* 201 - Created
* 202 - Accepted
* 400 - Bad Request
* 500 - Internal Server Error
* 401 - Unauthorized
* 403 - Forbidden

Routes: 
Check [Documentation](https://documenter.getpostman.com/view/8630438/SVtVSn4o?version=latest)
