# How this app works

Base-url : https://ql-age-app.herokuapp.com

1.  To make a request to the server, you need to send a GET request with query params (dob)
to the following URL: ```https://ql-age-app.herokuapp.com/howold?dob=YYYY-MM-DD```

For example, to get the age of a person born on `2000-03-20`, you would send a GET request  with query params  (dob) to the following URL: ```https://ql-age-app.herokuapp.com/howold?dob=2000-03-20```

2.  The response will be a JSON object with the following:

```{
    {
    success: true,
    data: {
        "age": 22
    }
    }
```

3.  To run locally, you can run the following command:
```git clone https://github.com/armerillo/ql-task.git```  and then run the following command:
```cd ql-task```,
```npm install```,
```npm run dev```