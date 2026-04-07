# Real Estate Management Challenge

Full-stack coding challenge with:
- Backend: Spring Boot, JPA/Hibernate, MariaDB, Spring Security, JWT, Swagger
- Frontend: Next.js (JavaScript)

## Project Structure

```text
real-estate-challenge/
├── backend/
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/example/realestate/
│       │   │   ├── config/
│       │   │   ├── controller/
│       │   │   ├── dto/
│       │   │   ├── mapper/
│       │   │   ├── model/
│       │   │   ├── repository/
│       │   │   ├── security/
│       │   │   └── service/
│       │   └── resources/application.yml
│       └── test/
│           ├── java/com/example/realestate/controller/PropertyControllerTest.java
│           └── resources/application.yml
└── frontend/
    ├── package.json
    ├── next.config.js
    ├── lib/api.js
    ├── pages/
    │   ├── _app.js
    │   ├── index.js
    │   ├── login.js
    │   ├── properties.js
    │   ├── add-property.js
    │   └── edit-property/[id].js
    └── styles/globals.css
```

## Backend Run

1. Create MariaDB database: `real_estate_db`
2. Adjust credentials in `backend/src/main/resources/application.yml`
3. Start backend:
   - `mvn spring-boot:run` (or `./mvnw spring-boot:run` if wrapper exists)

Swagger UI:
- [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

Login:
- Basic auth user: `admin` / `admin`
- JWT login endpoint: `POST /login`

## Frontend Run

1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Open [http://localhost:3000/login](http://localhost:3000/login)

## API Endpoints

- `POST /api/properties`
- `GET /api/properties`
- `GET /api/properties/{id}`
- `PUT /api/properties/{id}`
- `DELETE /api/properties/{id}`
- `GET /api/properties/filter?city=&minPrice=&maxPrice=`
- `POST /login`
