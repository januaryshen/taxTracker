# taxTracker

The monorepo setting (where backend and frontend are served in the same repo) is in `myproject`. The front end is served through myapp/static/ folder in `myproject``.

To make change a redeploy to Heroku, go to /tax-tracker-front-end and then run `npm run build`, and then do `cp -rf build/static/ ../myproject/myapp/static/` and `cp build/index.html ../myproject/myapp/templates/index.html`
