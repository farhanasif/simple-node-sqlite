This project is created to test the front-end with back-end. Basic database opration is done and SQLITE database is used for testing.

## Available Scripts

Clone the project and in the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The following API is used for testing<br />
GET http://localhost:8000/books<br />
-- this provides list of books<br />
POST http://localhost:8000/book<br />
-- This API is used for insert data,<br /> sample JSON : {"title": "A Beautiful Mind"}<br />
DELETE http://localhost:8000/book/:id<br />
-- This API is used to delete book<br />