## Project setup

```bash
$ npm install
```

## Run the migration

```bash
$ npm run migration:run
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Custom Endpoints Documentation

## Employer Endpoints

### 1. Get Workers by Employer ID

- **URL**: `/employers/:id/workers`
- **Description**: Retrieve a list of all workers associated with the specified employer.
- **Method**: `GET`
- **Request Body**: None
- **Example Response**:
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "salary": 5000,
      "employer_id": 10,
      "job_id": 3,
      "status": "ACTIVE"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "salary": 5500,
      "employer_id": 6,
      "job_id": 2,
      "status": "ACTIVE"
    }
  ]
  ```

---

## Job Endpoints

### 2. Get Jobs by Date Period

- **URL**: `/jobs/date-period`
- **Description**: Retrieve all jobs within a specified date range.
- **Method**: `GET`
- **Request Body**: None
- **Query Parameters**:
  - `startDate` (string): The start date of the period (format: YYYY-MM-DD).
  - `endDate` (string): The end date of the period (format: YYYY-MM-DD).
- **Example Request**:
  ```
  GET /jobs/date-period?startDate=2024-09-26&endDate=2024-09-30
  ```
- **Example Response**:
  ```json
  [
    {
      "id": 4,
      "name": "Software Engineer",
      "salary": 6000,
      "status": "ACTIVE",
      "createdAt": "2024-09-26T11:58:07.327Z"
    },
    {
      "id": 5,
      "name": "Data Analyst",
      "salary": 5500,
      "status": "ACTIVE",
      "createdAt": "2024-09-27T10:30:12.123Z"
    }
  ]
  ```

### 3. Archive Job

- **URL**: `/jobs/:id/archive`
- **Description**: Archive a specified job by ID.
- **Method**: `PUT`
- **Request Body**: None
- **Example Response**:
  ```json
  {
    "id": 4,
    "name": "Software Engineer",
    "salary": 6000,
    "status": "ARCHIVE"
  }
  ```

---

## Worker Endpoints

### 4. Get Matched Jobs by Worker ID

- **URL**: `/workers/:id/matched-jobs`
- **Description**: Retrieve a list of active jobs where the salary meets or exceeds the worker's expected salary.
- **Method**: `GET`
- **Request Body**: None
- **Example Response**:
  ```json
  [
    {
      "id": 4,
      "name": "Software Engineer",
      "salary": 6000,
      "status": "ACTIVE"
    },
    {
      "id": 5,
      "name": "Senior Data Scientist",
      "salary": 7000,
      "status": "ACTIVE"
    }
  ]
  ```

### 5. Change Employer or Terminate Worker

- **URL**: `/workers/:id/new-employer`
- **Description**: Change the employer for a worker or terminate employment.
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "operation_type": "CHANGE", // or "TERMINATE"
    "employer_id": 10, // Required if changing employer
    "job_id": 5 // Required if changing employer
  }
  ```
- **Example Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "salary": 5000,
    "employer_id": 10,
    "job_id": 5
  }
  ```

---
