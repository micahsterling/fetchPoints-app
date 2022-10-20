# fetchPoints-app

The API does the following: 
1. The ability to track points per payer/partner that are rewarded to users.
2. When points are spent they are deducted based on oldest timestamp first.
3. Payer/partner point balance will not go below 0. 

### Prerequisites
-   NodeJs https://nodejs.org/en/ 
-   API client like insomnia or postman
    - Insomnia https://insomnia.rest/   
    - Postman https://www.postman.com/

### Usage

1. Clone the project
```
git clone https://github.com/micahsterling/fetchPoints-app.git 
```
2. Go into directory fetchPoints-app
3. Run the command `npm install`
4. Run the command `npm start`
5. You should see in terminal: Started application on port 3000
6. Open up your preferred API client

## API Routes 

### Add Points

`POST request` 
```
http://localhost:3000/points
```
JSON
```
 { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
```

### GET Points Balance

`GET request` 
```
http://localhost:3000/balance
```

### Spend Points

`POST request` 
```
http://localhost:3000/points/spent
```
JSON
```
{"points" : 100}
```
