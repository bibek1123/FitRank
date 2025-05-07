
# Leaderboard API

This API provides functionality for recalculating the leaderboard ranks based on user activities and retrieving the current leaderboard data.

## API Endpoints

### 1. **Recalculate Leaderboard Ranks**

#### Endpoint
```http
POST /api/v1/leaderboard/recalculate?filter={filter}
```

#### Query Parameters
- **filter** (required):  
  Defines the time period for recalculating ranks. The possible values are:
  - `day`: Recalculates ranks for today's activities.
  - `month`: Recalculates ranks for the current month's activities.
  - `year`: Recalculates ranks for the current year's activities.

#### Example Request
```http
POST /api/v1/leaderboard/recalculate?filter=day
```

#### Success Response
- **Code**: 200 OK
- **Content**:
```json
[
  {
    "user_id": 1,
    "total_points": 40,
    "rank": 1,
    "User": {
      "id": 1,
      "full_name": "Santosh Sharma"
    }
  },
  {
    "user_id": 2,
    "total_points": 20,
    "rank": 2,
    "User": {
      "id": 2,
      "full_name": "Hari Yadav"
    }
  }
]
```

#### Error Response
- **Code**: 400 Bad Request
- **Content**:
```json
{
  "error": "Invalid filter. Must be one of: day, month, year."
}
```

---

### 2. **Get Leaderboard**

#### Endpoint
```http
GET /api/v1/leaderboard?search={userId}
```

#### Query Parameters
- **search** (optional):  
  A numeric user ID to search for a specific user on the leaderboard.

#### Example Request (Without Search)
```http
GET /api/v1/leaderboard
```

#### Example Request (With Search)
```http
GET /api/v1/leaderboard?search=2
```

#### Success Response (Without Search)
- **Code**: 200 OK
- **Content**:
```json
[
  {
    "user_id": 1,
    "total_points": 100,
    "rank": 1,
    "User": {
      "id": 1,
      "full_name": "Santosh Sharma"
    }
  },
  {
    "user_id": 2,
    "total_points": 80,
    "rank": 2,
    "User": {
      "id": 2,
      "full_name": "Hari Yadav"
    }
  }
]
```

#### Success Response (With Search)
- **Code**: 200 OK
- **Content**:
```json
[
  {
    "user_id": 2,
    "total_points": 80,
    "rank": 2,
    "User": {
      "id": 2,
      "full_name": "Hari Yadav"
    }
  },
  {
    "user_id": 1,
    "total_points": 100,
    "rank": 1,
    "User": {
      "id": 1,
      "full_name": "Santosh Sharma"
    }
  }
]
```

#### Error Response
- **Code**: 400 Bad Request
- **Content**:
```json
{
  "error": "Invalid search value. Must be a numeric user ID."
}
```

---

## How to Use the API

### 1. **Install Dependencies**

If you haven't already, install the required dependencies using `npm`:

```bash
npm install
```

### 2. **Setting Up Database**

Ensure that your database is properly configured and seeded with the necessary data. You can seed activities with the `seedActivities` function provided in the code.

### 3. **Recalculating Ranks**

- To recalculate the ranks for a specific time period, you can make a `POST` request to `/api/v1/leaderboard/recalculate` with a query parameter of `filter`.
- Supported filters are `day`, `month`, or `year`.
- Example (recalculate ranks for today):
  ```bash
  curl -X POST "http://localhost:3000/api/v1/leaderboard/recalculate?filter=day"
  ```

### 4. **Retrieving the Leaderboard**

- To get the current leaderboard, you can make a `GET` request to `/api/v1/leaderboard`.
- You can also search for a specific user by their `user_id` by using the `search` query parameter.
- Example (retrieve the leaderboard):
  ```bash
  curl "http://localhost:3000/api/v1/leaderboard"
  ```
- Example (search for user with `user_id` 2):
  ```bash
  curl "http://localhost:3000/api/v1/leaderboard?search=2"
  ```

### 5. **Error Handling**

Make sure to handle potential errors such as:
- Invalid filter value in `recalculateRanks` API.
- Invalid user ID format in the `getLeaderboard` API.
  
---

## Additional Information

### Models

- **Activity Model**: Represents user activities with a `id`, `user_id`, `activity_time`, and `points`.
- **Leaderboard Model**: Stores the leaderboard rankings with `user_id`, `total_points`, and `rank`.
- **User Model**: Represents users with `id` and `full_name`.

Make sure the necessary associations are set up between the models for proper querying.

---

## Troubleshooting

- **"Invalid filter" error**: This occurs if you pass a filter value other than `day`, `month`, or `year` to the `recalculateRanks` API.
- **"Invalid search value" error**: This occurs if the `search` query parameter is not a valid number representing a user ID.

---

### Authors

This API was created by **[Bibek Bhagat]**.

---
