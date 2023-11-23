# taxTracker

The monorepo setting is in myproject. The front end is served through myapp/static/build folder in myproject.

To make change a redeploy to Heroku, go to /tax-tracker-front-end and then run `npm run build`, and then `cp -rf build ../myproject/myapp/static/`
