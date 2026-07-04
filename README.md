# URL Shortener

# URL Shortener

A full-stack URL shortener built with Node.js, Express, and MySQL. Paste a long URL and get a short, shareable link back.

🔗 **Live Demo:** [url-shortener-bf7a.onrender.com](https://url-shortener-bf7a.onrender.com)

## Features
- Shorten any long URL into a random 6-character short code
- Redirect from short URL to original long URL
- Copy short URL to clipboard with one click

## Tech Stack
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript (vanilla)

## How it works
1. User submits a long URL through the frontend
2. Backend generates a random 6-character short code using `nanoid`
3. The long URL and short code are saved in a MySQL database
4. When someone visits the short URL, the backend looks up the code and redirects to the original URL

## Running locally
1. Clone this repo
2. Run `npm install`
3. Create a `.env` file with your own MySQL credentials (see `.env.example`)
4. Set up the database using the SQL in `schema.sql`
5. Run `node index.js`
6. Visit `http://localhost:5000`

## Future improvements
- Click analytics per short URL
- Custom short code option
- Link expiration
