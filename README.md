# taxTracker

`taxTracker` is a full-stack application for tracking tax-related information. It utilizes a monorepo setup with both the backend (Django) and frontend (React) served from the same repository. The frontend is served through the `myapp/static/` folder in the `myproject` directory.

## Getting Started

These instructions will guide you in setting up the project on your local machine for development and testing purposes.

### Prerequisites

Before beginning, ensure you have the following tools installed:

- Python
- Django
- Node.js and npm
- Git

### Installation

Clone the repository and install the necessary dependencies:

```bash
# Clone the repository
git clone https://github.com/januaryshen/taxTracker.git
cd taxTracker

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies
cd tax-tracker-front-end
npm install
```

## Deploy to Heroku

run `deploy.sh`

## Heroku Database Add-on

Before creating the add-on:

Run below in /myproject to create migration files
`python manage.py makemigrations myapp`
`python manage.py migrate`

After creating the add-on:

1. Migrate schema to Heroku Postgresql
   `heroku run python manage.py makemigrations -a shin-tax`
   `heroku run python manage.py migrate -a shin-tax`

2. Enter the Heroku database `heroku pg:psql postgresql-flat-01113 --app shin-tax` or find the URL on Heroku dashboard
3. create a user so that it can be used in mileage and expense table
   `shin-tax::DATABASE=> INSERT INTO public.myapp_user(name) VALUES('shin');`

### Postgres Operations

1. view tables `SELECT * FROM public.myapp_mileagedata;`
2. see all the schema (my table is stored under public) `\dn`
3. see info of table`\d myapp_user`
