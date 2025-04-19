[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19163392&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

# Menit Dot Com API Documentation

## Models :

_User_
- username: string (optional)
- email: string, unique (required)
- password: string (required)
- role: string (optional)
- phoneNumber: string (optional)
- address: string (optional)

_Category_
- name: string (required)

_Article_
- title: string (required)
- content: string (required)
- imgUrl: string (optional)
- categoryId: integer (required)
- authorId: integer (required)

## Relationship:

>### **Many-to-Many**

## Endpoints:

List of available endpoints:
- `POST /add-user`
- `POST /login`
- `GET /`
- `GET /pub/articles`
- `GET /pub/articles/:id`
- `GET /pub/category`

And routes below need authentication
- `POST /articles`
- `GET /articles`
- `GET /articles/:id`
- `POST /categories`
- `GET /categories`
- `PUT /categories/:id`

And routes below need authorization
> The request user should be match with article.authorId
- `PUT /articles/:id`
- `PATCH /articles/:id/img-url`
- `DELETE /articles/:id`

&nbsp;

## 1. POST /add-user

Request:

- body:
```json
{
    "email": "string",
    "password": "string"
}
```

_Response (201 = Created)_
```json
{
    "id": "integer",
    "role": "string",
    "email": "string",
    "username": "string",
    "phoneNumber": "string",
    "address": "string",
    "updatedAt": "date",
    "createdAt": "date"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "Email has been registered"
}
OR
{
    "message": "Format email wrong!"
}
OR
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request: 

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR

{
    "message": "Invalid email/password"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /articles

Description: 
    Add articles from current logged in user articles.

Request:
- headers
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (201 - Created)_

```json
{
    "id": 23,
    "title": "Ini milik Staff",
    "content": "Kehidupan di hacktiv8 sulit sekali nampaknya gais....",
    "imgUrl": "https://asset-a.grid.id/crop/0x0:0x0/x/photo/2022/07/07/stefan-moertl-cczjpqikyys-unspla-20220707075033.jpeg",
    "categoryId": 4,
    "authorId": 1,
    "updatedAt": "2025-04-19T02:22:05.208Z",
    "createdAt": "2025-04-19T02:22:05.208Z"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Title is required"
}
```

## 4. GET /articles

Description:
    Get all articles with detail user who made it.

Request:
- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "title": "Panduan Pola Hidup Sehat Modern",
        "content": "Kesehatan menjadi prioritas utama di era digital...",
        "imgUrl": "/uploads/health-guide.jpg",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2025-04-16T17:51:07.113Z",
        "updatedAt": "2025-04-16T17:51:07.113Z",
        "User": {
            "id": 1,
            "username": "admin",
            "email": "admin@gmail.com",
            "role": "Admin",
            "phoneNumber": "08123456789",
            "address": "jaksel",
            "createdAt": "2025-04-16T17:51:07.031Z",
            "updatedAt": "2025-04-16T17:51:07.031Z"
        }
    },
    {
        "id": 2,
        "title": "Tips Hidup Seimbang di Era Digital",
        "content": "Menjaga keseimbangan antara kerja dan istirahat...",
        "imgUrl": "/uploads/balanced-life.jpg",
        "categoryId": 2,
        "authorId": 2,
        "createdAt": "2025-04-16T17:51:07.113Z",
        "updatedAt": "2025-04-16T17:51:07.113Z",
        "User": {
            "id": 2,
            "username": "staff",
            "email": "staf@gmail.com",
            "role": "Staff",
            "phoneNumber": "08123456789",
            "address": "jaksel",
            "createdAt": "2025-04-16T17:51:07.112Z",
            "updatedAt": "2025-04-16T17:51:07.112Z"
        }
    }
]
```

&nbsp;

## 5. GET /articles/:id

Description:
    Get current articles with ID in params.

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 6,
    "title": "Digital Detox untuk Kesehatan Mental",
    "content": "Cara mengurangi ketergantungan pada perangkat digital...",
    "imgUrl": "https://res.cloudinary.com/dz7yyuyny/image/upload/v1744996134/b1nkrpi0qeh5ngwewlm1.jpg",
    "categoryId": 6,
    "authorId": 2,
    "createdAt": "2025-04-16T17:51:07.113Z",
    "updatedAt": "2025-04-18T17:08:52.837Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Article with ID 100 not found"
}
```

## 6. PUT /articles/:id

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

- body:
```json
{
    "title": "Update Title Baru",
    "content": "Startup finansial teknologi lokal mulai menunjukkan...",
    "imgUrl": "https://example.com/images/fintech.jpg",
    "categoryId": 3,
}
```

_Response (200 - OK)_

```json
{
    "id": 10,
    "title": "Update Title Baru",
    "content": "Startup finansial teknologi lokal mulai menunjukkan...",
    "imgUrl": "https://example.com/images/fintech.jpg",
    "categoryId": 3,
    "authorId": 5,
    "createdAt": "2025-04-16T17:51:07.113Z",
    "updatedAt": "2025-04-19T02:33:40.115Z"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Title is required"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "You're not authorized"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Article with 100 not found"
}
```

&nbsp;

## 7. DELETE /articles/:id

description: 
  Delete one of the current logged in user groceries. (Cannot delete another user's groceries except Admin)

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "<Ini Staff Paling Baru> success to delete"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Article with 100 not found"
}
```

&nbsp;

## 8. POST /categories

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:
```json
{
  "name": "Hacktiv8",
}
```

_Response (201 - Created)_

```json
{
    "id": 9,
    "name": "Hacktiv8",
    "updatedAt": "2025-04-19T02:56:28.995Z",
    "createdAt": "2025-04-19T02:56:28.995Z"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Category Name is required"
}
```

&nbsp;

## 9. 