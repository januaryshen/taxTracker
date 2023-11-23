# taxTracker

The monorepo setting (where backend and frontend are served in the same repo) is in `myproject`. The front end is served through myapp/static/ folder in `myproject``.

## Before deployment

To make change a redeploy to Heroku, go to /tax-tracker-front-end and then run `npm run build`, and then do `cp -rf build/static/ ../myproject/myapp/static/` and `cp build/index.html ../myproject/myapp/templates/index.html`

run migration locally (/myproject) to create migration files
`python manage.py makemigrations myapp`
`python manage.py migrate`

## Deploy to Heroku

`git add .`
`git commit -m "Add database migration"`
`git push heroku main`

## After deployed to Heroku

run `heroku run python manage.py makemigrations` and `heroku run python manage.py migrate` so that database is created in Heroku.

`heroku run python manage.py makemigrations -a shin-tax`
`heroku run python manage.py migrate -a shin-tax`

2. update `REACT_APP_API_URL` in tax-tracker-front-end .env with the app location

### Database

0. Enter the Heroku database `heroku pg:psql postgresql-flat-01113 --app shin-tax` or find the URL on Heroku dashboard
1. create a user so that it can be used in mileage and expense table
   `shin-tax::DATABASE=> INSERT INTO public.myapp_user(name) VALUES('shin');`

## Postgres Operations

1. view tables `SELECT * FROM public.myapp_mileagedata;`
2. see all the schema (my table is stored under public) `\dn`
3. see info of table`\d myapp_user`
