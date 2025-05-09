[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19258460&assignment_repo_type=AssignmentRepo)
# P2-Challenge-2 (Client Side)

> Tuliskan API Docs kamu di sini
# **Public-News API Documentation**

## **Base URL**
https://gc01.dhronz.space

## **Deployment URL**
public: https://public-menit-com.web.app
cms: https://cms-menit-com.web.app

---

## **Endpoints**

### **1. Get All Articles**
Retrieve a list of articles with optional filters, search, sort, and pagination.

- **URL**: `/pub/articles`
- **Method**: `GET`
- **Query Parameters**:
  | Parameter | Type   | Description                          |
  |-----------|--------|--------------------------------------|
  | `filter`  | String | Filter articles by category.         |
  | `search`  | String | Search articles by title or content. |
  | `sort`    | String | Sort articles (e.g., `-createdAt`).  |
  | `page`    | Number | Page number for pagination.          |

- **Response**:
  ```json
  {
    "page": 1,
    "totalData": 100,
    "data": [
      {
        "id": 1,
        "title": "Article Title",
        "content": "Article content...",
        "imgUrl": "https://example.com/image.jpg",
        "Category": {
          "id": 1,
          "name": "Technology"
        },
        "User": {
          "id": 1,
          "username": "Author Name",
          "authorImg": "https://example.com/author.jpg"
        }
      }
    ]
  }
  ```

2. Get Article Details
Retrieve detailed information about a specific article.

URL: /pub/articles/:id

Method: GET

Path Parameters:

Parameter	Type	Description
id	Number	ID of the article.

Response:
```js
{
  "id": 1,
  "title": "Article Title",
  "content": "Article content...",
  "imgUrl": "https://example.com/image.jpg",
  "Category": {
    "id": 1,
    "name": "Technology"
  },
  "User": {
    "id": 1,
    "username": "Author Name",
    "authorImg": "https://example.com/author.jpg"
  }
}
```

Error Responses
All endpoints return the following error format when a request fails:

```js
Response:
{
  "message": "Error message describing the issue."
}
```

Common HTTP Status Codes:

Status Code	Description
400	Bad Request.
404	Resource not found.
500	Internal server error.

Usage Examples
1. Get All Articles
Request:
GET /pub/articles?filter=Technology&search=AI&sort=-createdAt&page=1

Response:
```js
{
  "page": 1,
  "totalData": 10,
  "data": [
    {
      "id": 1,
      "title": "The Future of AI",
      "content": "AI is transforming the world...",
      "imgUrl": "https://example.com/ai.jpg",
      "Category": {
        "id": 1,
        "name": "Technology"
      },
      "User": {
        "id": 1,
        "username": "John Doe",
        "authorImg": "https://example.com/john.jpg"
      }
    }
  ]
}
```