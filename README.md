# ImmoManagement

ImmoManagement is a full-stack real estate management application.

- Backend: Spring Boot, JPA/Hibernate, MariaDB, Spring Security, JWT, Swagger
- Frontend: Next.js (JavaScript)

## Prerequisites

- Java 17+
- Maven 3.9+ (or Maven Wrapper if available)
- Node.js 18+
- MariaDB running locally

## Repository Structure

```text
ImmoManagement/
├── backend/    # Spring Boot API
└── frontend/   # Next.js web application
```

## Backend Setup

1. Create the database:
   ```sql
   CREATE DATABASE real_estate_db;
   ```
2. Verify database credentials in `backend/src/main/resources/application.yml`.
3. Start the backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

Backend base URL: `http://localhost:8080`  
Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### Authentication

- Basic Auth user: `admin`
- Basic Auth password: `admin`
- JWT login endpoint: `POST /login`

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: [http://localhost:3000/login](http://localhost:3000/login)

## Core API Endpoints

- `POST /login`
- `POST /api/properties`
- `GET /api/properties`
- `GET /api/properties/{id}`
- `PUT /api/properties/{id}`
- `DELETE /api/properties/{id}`
- `GET /api/properties/filter?city=&minPrice=&maxPrice=`
