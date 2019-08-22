#!/bin/bash
echo "<<<<<<<<<<<<<<<<<<<< START API >>>>>>>>>>>>>>>>>>>>>>>>"
gunicorn config.wsgi -b 0.0.0.0:8000


# heroku apps
# heroku buildpacks:set heroku/python
# heroku buildpacks:add --index 1 heroku/nodejs
# git push heroku master