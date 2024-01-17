# Angular project 3rd year

### DataBase:

- download docker
- `docker run --name angular-db -d -p 7474:7474 -p 7687:7687 --env=NEO4J_AUTH=none neo4j`

### Backend:

- `cd backend`
- `npm install`
- create file `.env`:

##### (example)

```
PORT=3069

#DB
URL=neo4j://localhost:7687
DB_USERNAME=neo4j
DB_PASSWORD=neo4j
DB=neo4j
```

- `npm start`

### Frontend:

- `cd frontend`
- `npm install`
- `npm start`
