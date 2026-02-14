# Campground

Full-stack campground listing app inspired by YelpCamp. Users can register, log in, create campgrounds with photos, add reviews, and browse locations on a map.

## Features
- User authentication with Passport (register, login, logout)
- CRUD campgrounds with image uploads (Cloudinary)
- Reviews for campgrounds
- Mapbox geocoding for locations and map display
- Flash messages and server-side validation

## Tech Stack
- Node.js, Express, MongoDB, Mongoose
- EJS + EJS-Mate
- Passport (local strategy)
- Cloudinary + Multer
- Mapbox SDK
- Bootstrap 5

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally

### Install
```bash
npm install
```

### Environment Variables
Create a `.env` file in the project root:
```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
SESSION_SECRET=change_me_in_production
MONGODB_URI=mongodb://127.0.0.1:27017/yelp-camp
MAPBOX_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Note: set a strong `SESSION_SECRET` in production and ensure the app uses it.

### Run
```bash
npm start
```
Visit `http://localhost:3000`.

## Seeding the Database
The seed script populates sample campgrounds.
```bash
node seeds/index.js
```

## Project Structure
- `controllers/` request handlers
- `routes/` express routes
- `models/` mongoose schemas
- `views/` EJS templates
- `public/` client-side assets
- `cloudinary/` upload config

## License
This project is for learning purposes.