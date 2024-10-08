# Routers
## 1. POST /users/register
### Body
```
    {
        email : "string",
        password : "string"
    }
```
### Response (201 CREATED)
```
    {
        id : "string"
        email : "string"
    }
```
## 2. POST /users/login
### Body
```
    {
        email : "string",
        password : "string"
    }
```
### Response (200 OK)
```
    {
        access_token : "string"
    }
```
## 3. POST /profiles
### Body
```
    {
        displayName : "string",
        profilePicture : "string",
        UserId : "integer"
    }
```
### Response (201 CREATED)
```
    {
        displayName : "string",
        profilePicture : "string",
        UserId : "integer"
    }
```
## 4. GET /profiles
### Response (200 OK)
```
    [
        {
            displayName : "string",
            profilePicture : "string",
            UserId : "integer"
        },
        {
            displayName : "string",
            profilePicture : "string",
            UserId : "integer"
        },
    ]
```
## 5. GET /profiles/:id
### Headers
```
    {
        id : "string"
    }
```
### Response (200 OK)
```
    {
        displayName : "string",
        profilePicture : "string",
        UserId : "integer"
    }
```
## 6. PUT /profiles/:id
### Headers
```
    {
        id : "string"
    }
```
### Body
```
    {
        displayName : "string",
        profilePicture : "string",
        UserId : "integer"
    }
```
### Response (200 OK)
```
    {
        displayName : "string",
        profilePicture : "string",
        UserId : "integer"
    }
```
## 7. POST /messages
### Authorization
```
    {
        access_token : "string"
    }
```
### Response (201 CREATED)
```
    {
        message : "string",
        ProfileId : "integer"
    }
```
## 8. GET /messages
### Response (200 OK)
```
    [
        {
            message : "string",
            ProfileId : "integer"
        }
    ]
```