# Database Editor
Ryan Tong

November 17, 2018

## Goal
To simulate a database as a json file and to condense the amount of data seen by a client.

## Files
* node_modules (DIR)
* package-lock.json
* sample.json
* index.js
  * '/'
  * '/all'
  * '/edit'
  * '/save'
* index.html
* newsample.json (generated)

## Installation
1. Download and extract zip file
1. Run `index.js` using Node.js in cmd or Terminal
1. Access `index.js` through `http://localhost:8080`

## Design
The main file here is index.js. I will spend some time to explain its route methods:

### http://localhost:8080
A simple HTML site to display the contents. For the most part this page is useless.

### http://localhost:8080/all
This takes the raw data from `sample.json` and returns it as a JSON.parse array.

### http://localhost:8080/edit
The core functionality. Based on the JSON object that is passed in to the POST request, a condensed version of the database will be returned.

For example, a JSON object such as this:

```
{
   "page_no" : 1,
   "page_size" : 1000,
   "sort" : {
      "id": "asc"
   },
      "filter": [
         {"field":"last_name", "operator":"CONTAINS", "value":"Van"}
  	  ]
}
```

will return

```
[
    {
        "id": 31,
        "first_name": "Allina",
        "last_name": "Vannikov",
        "email": "avannikovu@discuz.net",
        "gender": "Female",
        "age": 39
    },
    {
        "id": 143,
        "first_name": "Zane",
        "last_name": "Vanyutin",
        "email": "zvanyutin3y@usnews.com",
        "gender": "Male",
        "age": 32
    },
    {
        "id": 179,
        "first_name": "Lotta",
        "last_name": "Van Vuuren",
        "email": "lvanvuuren4y@desdev.cn",
        "gender": "Female",
        "age": 70
    }
]
```

There can only be a maximum of 3 sorts. If there are more, the fourth and onward will not be run.

Filter operators include `EQUAL`, `STARTSWITH`, `CONTAINS` for string values.
`EQUAL`, `GREATERTHAN`, `LESSTHAN` for number values.

### http://localhost:8080/save
This does the exact same thing as `http://localhost:8080/edit`, except it saves the condensed JSON array into a new file `newsample.json`.
If `'/save'` is called again, it will overwrite `newsample.json`.

## References
* Stack Overflow
* w3schools
* Nodejs Docs
* MDN