# 📚 EaseOps E-Library – User Backend Module

This repository contains the **User-side backend** of the **E-Library Project**, built using **Node.js**, **Express**, and **MongoDB**.  

It handles user authentication, profile preferences, bookmarks, notes, feedback, contact requests, and FAQs — providing a smooth, feature-rich reading experience.

---

## 🚀 Tech Stack

* **Node.js** + **Express.js** – REST API Framework
* **MongoDB + Mongoose** – Database and ORM
* **JWT (jsonwebtoken)** – Secure authentication
* **Express Validator** – Input validation
* **Bcryptjs** – Password Hashing

---

## 🗂️ Folder Structure

```
EaseOps-E-Library/
│
├── handlers/
|   ├── auth/
│   ├── e-books/
│   ├── support/
│   └── user/
│       ├── bookmarks.js
│       ├── feedback.js
|       ├── notes.js
│       └── profile.js
│
├── middleware/
│   └── verifyToken.js
|
├── models/
│   ├── ContactRequest.js
│   ├── Ebook.js
│   ├── Faq.js
│   ├── Feedback.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   ├── ebookRoutes.js
│   ├── supportRoutes.js
│   └── userRoutes.js
│
└── server.js
```

---

## 🔐 Authentication Routes

### **Register User**

**POST** `/api/auth/register`

```json
{
  "username": "TestUser",
  "email": "testuser@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "message": "User registered successfully"
}
```

---

### **Login User**

**POST** `/api/auth/login`

```json
{
  "email": "testuser@example.com",
  "password": "123456"
}
```

**Response**

```json
{
    "message": "Login Successful!",
    "token": "your-JWT-access-token",
    "user": {
        "id": "68f7a2f82537247e7108edf5",
        "username": "TestUser"
    }
}
```

---

## 👤 User Routes

### **Update Mode Preferences**

**PUT** `/api/user/preferences`

```json
{
  "darkMode": true
}
```

**Response**

```json
{
    "message": "Mode updated",
    "darkMode": true
}
```

---

### **Add or Update Bookmark**

**POST** `/api/user/bookmarks`

```json
{
  "ebookId": "68f7adaf97f40d2619e7a527",
  "page": 32
}
```

**Response**

```json
{
    "message": "Bookmark saved",
    "bookmarks": [
        {
            "ebook": {
                "_id": "68f7adaf97f40d2619e7a527",
                "title": "Data Science Essentials"
            },
            "page": 32,
            "_id": "68f7af3b5428b762f8ea2a8d"
        }
    ]
}
```

---

### **Get Bookmarks**

**GET** `/api/user/bookmarks`

**Response**

```json
{
    "bookmarks": [
        {
            "ebook": {
                "_id": "68f7adaf97f40d2619e7a527",
                "title": "Data Science Essentials"
            },
            "page": 32,
            "_id": "68f7af3b5428b762f8ea2a8d"
        }
    ]
}
```

---

### **Remove Bookmark**

**DELETE** `/api/user/bookmarks/:ebookId`

**Response**

```json
{
    "message": "Bookmark removed",
    "bookmarks": [
        "your-remaining-bookmarks"
    ]
}
```

---

### **Add or Update Note**

**POST** `/api/user/notes`

```json
{
  "ebookId": "68f7adaf97f40d2619e7a526",
  "content": "This chapter explains the main concept of AI ethics."
}
```

**Response**

```json
{
    "message": "Note saved",
    "notes": [
        {
            "ebook": {
                "_id": "68f7adaf97f40d2619e7a526",
                "title": "Deep Learning Explained"
            },
            "content": "This chapter explains the main concept of AI ethics.",
            "_id": "68f7b03d5428b762f8ea2aa4",
            "createdAt": "2025-10-22T14:51:11.045Z",
            "updatedAt": "2025-10-22T14:51:11.045Z"
        }
    ]
}
```

---

### **Get Notes**

**GET** `/api/user/notes`

**Response**

```json
{
    "notes": [
        {
            "ebook": {
                "_id": "68f7adaf97f40d2619e7a526",
                "title": "Deep Learning Explained"
            },
            "content": "This chapter explains the main concept of AI ethics.",
            "_id": "68f7b03d5428b762f8ea2aa4",
            "createdAt": "2025-10-22T14:51:11.045Z",
            "updatedAt": "2025-10-22T14:51:11.045Z"
        }
    ]
}
```

---

### **Delete Note**

**DELETE** `/api/user/notes/:ebookId`

**Response**

```json
{
    "message": "Note deleted",
    "notes": [
        "your-remaining-notes"
    ]
}
```

---


### **Submit Feedback**

**POST** `/api/user/feedback`

```json
{
  "message": "This app is very user-friendly!"
}
```

**Response**

```json
{
    "message": "Feedback submitted successfully",
    "feedback": {
        "userId": "68f7a2f82537247e7108edf5",
        "message": "This app is very user-friendly!",
        "_id": "68f8f1ea2f46647309d5ad49",
        "createdAt": "2025-10-22T15:02:02.396Z",
        "updatedAt": "2025-10-22T15:02:02.396Z",
        "__v": 0
    }
}
```

---

## 📚 eBook Routes

### **Filter eBooks**

**GET** `/api/ebooks/filter?category=AI&tags=AI,Beginner&search=AI`

**Response**

```json
{
    "ebooks": [
        {
            "content": {
                "onlineUrl": "https://example.com/ebooks/ai-for-beginners",
                "offlineFile": "files/ai-for-beginners.pdf"
            },
            "_id": "68f7adaf97f40d2619e7a524",
            "title": "AI for Beginners",
            "author": "Sangeeta Mittal",
            "description": "An easy-to-understand guide for anyone starting their journey in Artificial Intelligence.",
            "category": "AI",
            "tags": [
                "AI",
                "Beginner",
                "Technology"
            ],
            "numberOfPages": 120
        }
    ]
}
```

---

### **Get eBook Details**

**GET** `/api/ebooks/:ebookId`

**Response**

```json
{
    "ebook": {
        "content": {
            "onlineUrl": "https://example.com/ebooks/deep-learning-explained",
            "offlineFile": "files/deep-learning-explained.pdf"
        },
        "_id": "68f7adaf97f40d2619e7a526",
        "title": "Deep Learning Explained",
        "author": "Jane Smith",
        "description": "Comprehensive explanation of deep learning models, layers, and optimization methods.",
        "category": "Deep Learning",
        "tags": [
            "DL",
            "Neural Networks",
            "AI"
        ],
        "numberOfPages": 200
    }
}
```

---

## 💬 Support Routes

### **Submit Contact Request**

**POST** `/api/support/contact`

```json
{
  "name": "Sangeeta Mittal",
  "email": "sangeeta@example.com",
  "subject": "Issue with reading offline",
  "message": "The offline mode isn’t loading properly."
}
```

**Response**

```json
{
    "message": "Contact request submitted successfully",
    "contact": {
        "name": "Sangeeta Mittal",
        "email": "sangeeta@example.com",
        "subject": "Issue with reading offline",
        "message": "The offline mode isn’t loading properly.",
        "_id": "68f8f2452f46647309d5ad4b",
        "createdAt": "2025-10-22T15:03:33.979Z",
        "updatedAt": "2025-10-22T15:03:33.979Z",
        "__v": 0
    }
}
```

---

### **Get FAQs**

**GET** `/api/support/faqs`

**Response**

```json
[
    {
        "_id": "68f8e5a9a366d3b9bae696a6",
        "question": "How do I create an account?",
        "answer": "Click on the Register button on the homepage, fill in your name, email, and password, and submit. Verify your email if prompted."
    },
    {
        "_id": "68f8e5a9a366d3b9bae696a7",
        "question": "I forgot my password. How can I reset it?",
        "answer": "Go to the login page and click 'Forgot Password'. Enter your registered email and follow the instructions sent to your inbox to reset the password."
    }
]
```

---

## 🔒 Authorization

All **user** and **ebook** routes are protected using JWT.  

Include your token in the request header:

```
Authorization: Bearer <your_token>
```

Also, include this in the request header:

```
Content-Type: application/json
```

---

## ⚙️ Environment Variables

Create a `.env` file in your root directory:

```
PORT=5000
MONGO_URL=mongodb://localhost:27017/easeops_e-library
JWT_SECRET=<your_random_secret_key>
```

---

## 🧪 Testing

Use **Postman** to test all endpoints.
You can organize them in folders:

* Auth
* User
* E-Books
* Support

---

## ✨ Status

✅ Core features implemented  
✅ Optional support features (Feedback, Contact, FAQs) implemented  
🚧 Optional advanced features (Surveys, Chatbot, Notifications) — not included

---