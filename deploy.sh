 #!/bin/bash

# Navigate to React app directory and build
cd tax-tracker-front-end
npm run build

# Copy build files to Django directories
cp -rf build/static/* ../myproject/myapp/static/
cp build/index.html ../myproject/myapp/templates/index.html

# Go back to the root directory
cd ..

# Add and commit changes
git add .
git commit -m "Deploy changes"

# Push to Heroku
git push heroku main

# Run migrations on Heroku
heroku run python manage.py makemigrations -a shin-tax
heroku run python manage.py migrate -a shin-tax

echo "Deployment complete."
