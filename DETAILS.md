# How does this work?

- Base-url : https://ql-age-app.herokuapp.com


- To make a request to the server, you need to send a GET request with query params  (dob) to the following URL:

```https://ql-age-app.herokuapp.com/howold?dob=YYYY-MM-DD```

- For example, to get the age of a person born on `2000-03-20`, you would send a GET request  with query params  (dob) to the following URL:

```https://ql-age-app.herokuapp.com/howold?dob=2000-03-20```

- The response will be a JSON object with the following:

```{
    {
    success: true,
    data: {
        "age": 22
    }
    }
```