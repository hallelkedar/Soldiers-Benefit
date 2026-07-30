# Walfare soldiers benefit system
## API manager for soldiers benefit and monthly salary

### Technical frameworks and packages
- node.js + express
- Docker (DockerFile + docker-compose)
- MongoDB
- SupaBase (with postgresql)
 
### Project structure


### Endpoints
```
METHOD | URL | EXPECTED STATUS CODE | DONE
-------------------
POST | /soldiers/:soldierId/benefits | 201 / 409 / 400 | V
GET | /soldiers/:soldierId/benefits | 200 / 404 | V
PATCH | /soldiers/:soldierId/benefits | 200 / 404 / 400 | X

POST | /budget | 201/409 / 400 | V
GET | /budget | 200 | V
GET | /budget/:id/transactions | 200 / 404 | V
POST | budget/:id/spend | 400 / 409 / 201 | V
```


### DB decisions
There are 3 types of intities:

- Walfare record:

for that intity I choosed noSQL - mongoDB, because we can't know the exactly schema that will be in every benefit, we using array inside the document, and we don't need any connection between collections

- Budget allocation, Spend transation - 
Now we have stable and constent schema, we need connection between tables, so we'll choose postgreSQL with supabase





### DataBase and .env prepare

For walfare records (benefits) -
the general schema will be - 
```
{
    id: number | ObjectId,
    soldierId: number | ObjectId,
    unit: string,
    currentBenefitType: "giftCard" | "diningHall",
    history: [
        {
        startDate: string,
        endDate: string || null,
        decisionReason: string,
        budgetApproved: boolean,
        benefitType: "giftCard | "diningHall",
        details: {

        }
        }

    ]
}
```

For supabase -
you need to create 2 tables with that schema,
* for Budget allocation -
name: budget
{
    id: int auto_increment primary key,
    unit: text,
    benefitType: enum("giftCard", "diningHall"),
    month: string,
    allocatedAmount: number
}

* for Spend transation -
name: spends
{
    id: int auto_increment primary key,
    budgetId: number,
    amount: number,
    reason?: string,
    createdAt: now() 
}


For .env file - 
you need to write those values:
```
PORT=3000

# Users database info
MONGO_URI=<your mongo uri>

# Sessions database info
SUPABASE_URL= <your supabase url>
SUPABASE_SECRET_KEY= <youre supabase secert key>
```


### Run with
```
git remote add origin https://github.com/hallelkedar/Soldiers-Benefit.git
cd Soldiers-Benefit
```
```
npm install
```
```
npm start
```
