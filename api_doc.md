# My First Sever App

# Models :

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
  {
    "id": "integer",
    "title": "string",
    "content": "string",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer",
    "updatedAt": "date",
    "createdAt": "date"
}
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Properies is required"
}
```

## 4. GET /articles

Description:
    Get all current logged in user articles

Request:
- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```