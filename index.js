const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

let database = fs.readFile('sample.json', (err, data) => {
    database = JSON.parse(data);
});
let sortCount = 0;

app.get('/', (req, res) => {
    fs.readFile('index.html', (err, data) => {
        if (err) console.log('Error');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

app.get('/all', (req, res) => {
    fs.readFile('sample.json', (err, data) => {
        if (err) console.log('Error');
        // let database = JSON.parse(data);
        res.send(database);
        res.end();
    });
});  

app.post('/edit', (req, res) => {
    const input = {
        page_no: req.body.page_no - 1,
        page_size: req.body.page_size,
        sort: {
            id: req.body.sort.id,
            first_name: req.body.sort.first_name,
            last_name: req.body.sort.last_name,
            email: req.body.sort.email,
            gender: req.body.sort.gender,
            age: req.body.sort.age
        },
        filter: req.body.filter
    }
    let db = database;
    // sort
    if (input.sort.id != null && sortCount < 3) {
        if (input.sort.id === 'asc') {
            db = db.sort((a, b) => {
                return a.id - b.id;
            });
        } else if (input.sort.id === 'desc') {
            db = db.sort((a, b) => {
                return b.id - a.id;
            });
        }
        sortCount += 1;
    }
    if (input.sort.first_name != null && sortCount < 3) {
        if (input.sort.first_name === 'asc') {
            db = db.sort((a, b) => {
                return a.first_name > b.first_name ? 1 : -1;
            });
        } else if (input.sort.first_name === 'desc') {
            db = db.sort((a, b) => {
                return a.first_name > b.first_name ? -1 : 1;
            });
        }
        sortCount += 1;
    }
    if (input.sort.last_name != null && sortCount < 3) {
        if (input.sort.last_name === 'asc') {
            db = db.sort((a, b) => {
                return a.last_name > b.last_name ? 1 : -1;
            });
        } else if (input.sort.last_name === 'desc') {
            db = db.sort((a, b) => {
                return a.last_name > b.last_name ? -1 : 1;
            });
        }
        sortCount += 1;
    }
    if (input.sort.email != null && sortCount < 3) {
        if (input.sort.email === 'asc') {
            db = db.sort((a, b) => {
                return a.email > b.email ? 1 : -1;
            });
        } else if (input.sort.email === 'desc') {
            db = db.sort((a, b) => {
                return a.email > b.email ? -1 : 1;
            });
        }
        sortCount += 1;
    }
    if (input.sort.gender != null && sortCount < 3) {
        if (input.sort.gender === 'asc') {
            db = db.sort((a, b) => {
                return a.gender > b.gender ? 1 : -1;
            });
        } else if (input.sort.gender === 'desc') {
            db = db.sort((a, b) => {
                return a.gender > b.gender ? -1 : 1;
            });
        }
        sortCount += 1;
    }
    if (input.sort.age != null && sortCount < 3) {
        if (input.sort.age === 'asc') {
            db = db.sort((a, b) => {
                return a.age - b.age;
            });
        } else if (input.sort.age === 'desc') {
            db = db.sort((a, b) => {
                return b.age - a.age;
            });
        }
        sortCount += 1;
    }
    // pagination
    db = db.slice(input.page_no * input.page_size, (input.page_no + 1) * input.page_size);
    // filter
    for (let i = 0; i < input.filter.length; i++) {
        switch (input.filter[i].field) {
            case 'id':
                if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.id === input.filter[i].value);
                } else if (input.filter[i].operator === 'GREATERTHAN') {
                    db = db.filter((data) => data.id > (input.filter[i].value));
                } else if (input.filter[i].operator === 'LESSTHAN') {
                    db = db.filter((data) => data.id < (input.filter[i].value));
                }
                break;
            case 'first_name':
                if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.first_name === input.filter[i].value);
                } else if (input.filter[i].operator === 'STARTSWITH') {
                    db = db.filter((data) => data.first_name.startsWith(input.filter[i].value));
                } else if (input.filter[i].operator === 'CONTAINS') {
                    db = db.filter((data) => data.first_name.includes(input.filter[i].value));
                }
                break;
            case 'last_name':
                if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.last_name === input.filter[i].value);
                } else if (input.filter[i].operator === 'STARTSWITH') {
                    db = db.filter((data) => data.last_name.startsWith(input.filter[i].value));
                } else if (input.filter[i].operator === 'CONTAINS') {
                    db = db.filter((data) => data.last_name.includes(input.filter[i].value));
                }
                break;
            case 'email':
                if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.email === input.filter[i].value);
                } else if (input.filter[i].operator === 'STARTSWITH') {
                    db = db.filter((data) => data.email.startsWith(input.filter[i].value));
                } else if (input.filter[i].operator === 'CONTAINS') {
                    db = db.filter((data) => data.email.includes(input.filter[i].value));
                }
                break;
            case 'gender':
                if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.gender === input.filter[i].value);
                } else if (input.filter[i].operator === 'STARTSWITH') {
                    db = db.filter((data) => data.gender.startsWith(input.filter[i].value));
                } else if (input.filter[i].operator === 'CONTAINS') {
                    db = db.filter((data) => data.gender.includes(input.filter[i].value));
                }
                break;
            case 'age':
            if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.age === input.filter[i].value);
                } else if (input.filter[i].operator === 'GREATERTHAN') {
                    db = db.filter((data) => data.age > (input.filter[i].value));
                } else if (input.filter[i].operator === 'LESSTHAN') {
                    db = db.filter((data) => data.age < (input.filter[i].value));
                }
                break;
        }
    }
    database.push(db);
    res.send(db);
    // reset
    database = fs.readFile('sample.json', (err, data) => {
        database = JSON.parse(data);
    });
    db = database;
    sortCount = 0;
});

app.post('/save', (req, res) => {
    const input = {
        page_no: req.body.page_no - 1,
        page_size: req.body.page_size,
        sort: {
            id: req.body.sort.id,
            first_name: req.body.sort.first_name,
            last_name: req.body.sort.last_name,
            email: req.body.sort.email,
            gender: req.body.sort.gender,
            age: req.body.sort.age
        },
        filter: req.body.filter
    }
    let db = database;
    // sort
    if (input.sort.id != null && sortCount < 3) {
        if (input.sort.id === 'asc') {
            db = db.sort((a, b) => {
                return a.id - b.id;
            });
        } else if (input.sort.id === 'desc') {
            db = db.sort((a, b) => {
                return b.id - a.id;
            });
        }
        sortCount += 1;
    }
    if (input.sort.first_name != null && sortCount < 3) {
        if (input.sort.first_name === 'asc') {
            db = db.sort((a, b) => {
                return a.first_name > b.first_name ? 1 : -1;
            });
        } else if (input.sort.first_name === 'desc') {
            db = db.sort((a, b) => {
                return a.first_name > b.first_name ? -1 : 1;
            });
        }
        sortCount += 1;
    }
    if (input.sort.last_name != null && sortCount < 3) {
        if (input.sort.last_name === 'asc') {
            db = db.sort((a, b) => {
                return a.last_name > b.last_name ? 1 : -1;
            });
        } else if (input.sort.last_name === 'desc') {
            db = db.sort((a, b) => {
                return a.last_name > b.last_name ? -1 : 1;
            });
        }
        sortCount += 1;
    }
    if (input.sort.email != null && sortCount < 3) {
        if (input.sort.email === 'asc') {
            db = db.sort((a, b) => {
                return a.email > b.email ? 1 : -1;
            });
        } else if (input.sort.email === 'desc') {
            db = db.sort((a, b) => {
                return a.email > b.email ? -1 : 1;
            });
        }
        sortCount += 1;
    }
    if (input.sort.gender != null && sortCount < 3) {
        if (input.sort.gender === 'asc') {
            db = db.sort((a, b) => {
                return a.gender > b.gender ? 1 : -1;
            });
        } else if (input.sort.gender === 'desc') {
            db = db.sort((a, b) => {
                return a.gender > b.gender ? -1 : 1;
            });
        }
        sortCount += 1;
    }
    if (input.sort.age != null && sortCount < 3) {
        if (input.sort.age === 'asc') {
            db = db.sort((a, b) => {
                return a.age - b.age;
            });
        } else if (input.sort.age === 'desc') {
            db = db.sort((a, b) => {
                return b.age - a.age;
            });
        }
        sortCount += 1;
    }
    // pagination
    db = db.slice(input.page_no * input.page_size, (input.page_no + 1) * input.page_size);
    // filter
    for (let i = 0; i < input.filter.length; i++) {
        switch (input.filter[i].field) {
            case 'id':
                if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.id === input.filter[i].value);
                } else if (input.filter[i].operator === 'GREATERTHAN') {
                    db = db.filter((data) => data.id > (input.filter[i].value));
                } else if (input.filter[i].operator === 'LESSTHAN') {
                    db = db.filter((data) => data.id < (input.filter[i].value));
                }
                break;
            case 'first_name':
                if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.first_name === input.filter[i].value);
                } else if (input.filter[i].operator === 'STARTSWITH') {
                    db = db.filter((data) => data.first_name.startsWith(input.filter[i].value));
                } else if (input.filter[i].operator === 'CONTAINS') {
                    db = db.filter((data) => data.first_name.includes(input.filter[i].value));
                }
                break;
            case 'last_name':
                if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.last_name === input.filter[i].value);
                } else if (input.filter[i].operator === 'STARTSWITH') {
                    db = db.filter((data) => data.last_name.startsWith(input.filter[i].value));
                } else if (input.filter[i].operator === 'CONTAINS') {
                    db = db.filter((data) => data.last_name.includes(input.filter[i].value));
                }
                break;
            case 'email':
                if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.email === input.filter[i].value);
                } else if (input.filter[i].operator === 'STARTSWITH') {
                    db = db.filter((data) => data.email.startsWith(input.filter[i].value));
                } else if (input.filter[i].operator === 'CONTAINS') {
                    db = db.filter((data) => data.email.includes(input.filter[i].value));
                }
                break;
            case 'gender':
                if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.gender === input.filter[i].value);
                } else if (input.filter[i].operator === 'STARTSWITH') {
                    db = db.filter((data) => data.gender.startsWith(input.filter[i].value));
                } else if (input.filter[i].operator === 'CONTAINS') {
                    db = db.filter((data) => data.gender.includes(input.filter[i].value));
                }
                break;
            case 'age':
            if (input.filter[i].operator === 'EQUAL') {
                    db = db.filter((data) => data.age === input.filter[i].value);
                } else if (input.filter[i].operator === 'GREATERTHAN') {
                    db = db.filter((data) => data.age > (input.filter[i].value));
                } else if (input.filter[i].operator === 'LESSTHAN') {
                    db = db.filter((data) => data.age < (input.filter[i].value));
                }
                break;
        }
    }
    database.push(db);
    res.send(db);
    // save
    fs.writeFile('newsample.json', JSON.stringify(db, null, '\t'), function (err) {
        if (err) {
            console.log('Error: Cannot save file');
            throw err;
        };
        console.log('Saved current database in newsample.json!');
    });
    // reset
    database = fs.readFile('sample.json', (err, data) => {
        database = JSON.parse(data);
    });
    db = database;
    sortCount = 0;
});

app.listen(8080, () => {
    console.log('Listening to port 8080...')
});