// // src/middleware/authMiddleware.js
// import jwt from 'jsonwebtoken';
// import {app_config} from '../config.js';

// const secretKey = app_config.jwtSecret; //Make sure to store this in process.env

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['Authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) {
//         return res.sendStatus(401); // Unauthorized
//     }
//     else {
//         jwt.verify(token, secretKey, (err, user) => {
//             if (err) {
//                 return res.sendStatus(403); // Forbidden
//             }
//             req.user = user;
//             next();
//         });
//     }

// };

// export default authenticateToken;


// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import {app_config} from '../config.js';

const secretKey = app_config.jwtSecret; //Make sure to store this in process.env

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     // const token = authHeader && authHeader.trim().split(' ')[1];
//     const token = authHeader.split(' ')[1];

//     console.log("Auth Header:", authHeader); // ADD THIS LINE
//     console.log("Token:", token); // ADD THIS LINE

//     if (token == null) {
//         console.log("No token provided"); // ADD THIS LINE
//         return res.sendStatus(401); // Unauthorized
//     }
//     else {
//         jwt.verify(token, secretKey, (err, user) => {
//             if (err) {
//                 console.log("Token verification error:", err); // ADD THIS LINE
//                 return res.sendStatus(403); // Forbidden
//             }
//             console.log("Token verified. User:", user); // ADD THIS LINE
//             req.user = user;
//             next();
//         });
//     }

// };
// ... existing code ...

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];

    console.log("Auth Header:", authHeader); // ADD THIS LINE

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("No valid token provided"); // ADD THIS LINE
        return res.sendStatus(401); // Unauthorized
    }

    const token = authHeader.split(' ')[1];
    console.log("Token:", token); // ADD THIS LINE


    if (!token) {
        console.log("No token provided"); // ADD THIS LINE
        return res.sendStatus(401); // Unauthorized
    }
    else {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log("Token verification error:", err); // ADD THIS LINE
                return res.sendStatus(403); // Forbidden
            }
            console.log("Token verified. User:", user); // ADD THIS LINE
            req.user = user;
            next();
        });
    }

};

// ... rest of code ...

export default authenticateToken;


// curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MDQ4OTM2MywianRpIjoiYTkxNTJiMjctYWFlYy00Mzk1LTk2NzgtMjE1NWNkZjc5Zjg5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFtcml0ZW5kdW5hdGgxQGdtYWlsLmNvbSIsIm5iZiI6MTc1MDQ4OTM2MywiZXhwIjoxNzUwNDkyOTYzLCJuYW1lIjoiQW1yaXRlbmR1IE5hdGgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSS1ERjEzOGludzFUUmotYWwzUDVUa0lyZk9zSDdudGtkVkowRy1jbDQ5MFNwY1B2Mk09czk2LWMiLCJhdXRoX3Byb3ZpZGVyIjoiZ29vZ2xlIiwidXNlcl9laHJfaWQiOiIwMDAwMDAyIn0.CfqC6cBTQyqKvw3zpkS_g9dEE62i-bJybq4DjviXfZ8" "http://localhost:7000/api/availability?query_date=16-06-2025&doctor_name=john%20doe&hospital_name=chaitanya%20Hospital"