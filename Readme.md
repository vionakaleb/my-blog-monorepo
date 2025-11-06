# Monorepo Setup Guide (Docker)

## Step 1: Create Project Structure

- Create the docker/nginx directory inside your my-blog-monorepo root.

- Add the docker-compose.yml file to your root directory.

- Add the laravel-backend/Dockerfile.

- Add the nextjs-frontend/Dockerfile.

- Add the docker/nginx/default.conf file.

## Step 2: Configure Environment Files

A. Laravel Backend (laravel-backend/.env)

- Copy laravel-backend/.env.example to laravel-backend/.env

B. Nextjs Frontend
- Generate .env 
NEXT_PUBLIC_API_URL=http://localhost:8000/api

## Step 3: Build and Run the Containers

- Build the images: From the root my-blog-monorepo directory, run:

docker-compose build

- Start the services:

docker-compose up -d

## Step 4: Run Database Migrations

docker-compose exec app composer install

- Run Migrations:

docker-compose exec app php artisan migrate

- (Optional) Seed the database:

docker-compose exec app php artisan db:seed

## Step 5: Access Your Application

That's it! Your full-stack monorepo is now running.

Next.js Frontend: Open http://localhost:3000

Laravel Backend API: Access http://localhost:8000

## Useful Docker Commands

View logs: docker-compose logs -f (See all logs)

View frontend logs: docker-compose logs -f frontend

View backend logs: docker-compose logs -f app

Stop services: docker-compose down

Rebuild and restart: docker-compose up -d --build
