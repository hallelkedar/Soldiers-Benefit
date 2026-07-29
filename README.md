# Walfare soldiers benefit system
## API manager for soldiers benefit and monthly salary

### Technical frameworks and packages
- node.js + express
- Docker (DockerFile + docker-compose)
- MongoDB
- SupaBase (with postgresql)
 
### Project structure


### Endpoints
METHOD | URL | EXPECTED STATUS CODE | DONE
-------------------
POST | /soldiers/:soldierId/benefits | 201 / 409 | X
GET | /soldiers/:soldierId/benefits | 200 / 404 | X
PATCH | /soldiers/:soldierId/benefits | 200 / 404 | X

POST | /budget | 201/409 | X
GET | /budget | 200 | X
GET | /budget/:id/transactions | 200 / 404 | X
POST | budget/:id/spend | 400 / 409 / 201 | X


### DB decisions

### Run with
```
npm install
```
