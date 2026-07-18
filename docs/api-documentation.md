# API Documentation

## Overview

Game Monetization App API endpoints for managing monetization features.

## Base URL

```
http://localhost:8000/api/v1
```

## Authentication

All endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Login
- **POST** `/auth/login`
- Request body:
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```

#### Register
- **POST** `/auth/register`
- Request body:
  ```json
  {
    "email": "user@example.com",
    "password": "password",
    "name": "User Name"
  }
  ```

### In-App Purchases

#### List IAPs
- **GET** `/iap/products`
- Query parameters: `limit=10&offset=0`

#### Create IAP
- **POST** `/iap/products`
- Request body:
  ```json
  {
    "name": "Gold Pack",
    "description": "100 Gold Coins",
    "price": 4.99,
    "currency": "USD",
    "type": "consumable"
  }
  ```

#### Get IAP Details
- **GET** `/iap/products/{product_id}`

#### Update IAP
- **PUT** `/iap/products/{product_id}`

#### Delete IAP
- **DELETE** `/iap/products/{product_id}`

### Analytics

#### Get Revenue Stats
- **GET** `/analytics/revenue`
- Query parameters: `start_date=2024-01-01&end_date=2024-01-31`

#### Get Player Stats
- **GET** `/analytics/players`
- Query parameters: `metric=active_users&period=daily`

### Subscriptions

#### List Subscriptions
- **GET** `/subscriptions`

#### Create Subscription
- **POST** `/subscriptions`
- Request body:
  ```json
  {
    "name": "Premium",
    "price": 9.99,
    "billing_cycle": "monthly",
    "features": []
  }
  ```

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

## Error Handling

Error responses include proper HTTP status codes and error messages:

```json
{
  "success": false,
  "error": "error_code",
  "message": "Error description"
}
```

## Rate Limiting

- API calls are limited to 1000 requests per hour per user
- Rate limit headers are included in responses
