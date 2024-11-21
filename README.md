# XSS Demo

This project demonstrates examples of Reflected and Stored Cross-Site Scripting (XSS) vulnerabilities using a simple Express server and a React frontend.

## Project Structure

```
xss-demo/
    ├── .gitignore
    ├── package.json
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── README.md
    ├── src/
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── index.css
    │   ├── index.js
    │   ├── reportWebVitals.js
    │   └── setupTests.js
app.js
app.txt
index.html
index.txt
package.json
server.js
```

## Setup

1. Install dependencies:
    ```sh
    npm install
    ```

2. Start the server:
    ```sh
    node server.js
    ```

3. Start the React frontend:
    ```sh
    cd xss-demo
    npm start
    ```

## Vulnerabilities

### Reflected XSS

The `/api/search` endpoint reflects user input without sanitization, leading to potential XSS attacks.

### Stored XSS

The `/api/comments` endpoint stores user comments without sanitization, leading to potential XSS attacks when comments are displayed.

### Open Redirect

The `/api/redirect` endpoint redirects to a URL specified by the user, which can be exploited for phishing attacks.

## Usage

- Visit `http://localhost:3000` to access the frontend.
- Use the search functionality to test Reflected XSS.
- Add comments to test Stored XSS.
- Use the redirect endpoint to test Open Redirect.

## How to Perform XSS Attacks

### Reflected XSS

1. Go to the search input field.
2. Enter a payload such as `<script>alert('XSS')</script>`.
3. Click the search button.
4. The script should execute, demonstrating a reflected XSS attack.

### Stored XSS

1. Go to the comments section.
2. Enter a payload such as `<script>alert('XSS')</script>` in the comment input field.
3. Click the "Add Comment" button.
4. The script should execute when the comment is rendered, demonstrating a stored XSS attack.

### Open Redirect

1. Navigate to `http://localhost:5000/api/redirect?url=http://malicious-site.com`.
2. The server will redirect to the specified URL, demonstrating an open redirect vulnerability.

## Note

This project is for educational purposes only. Do not use this code in production environments. 
