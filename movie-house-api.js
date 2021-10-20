const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(cors());
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let movies = [
    {
        Id: 1,
        Title: 'untitled movie 1',
        Description: 'lorem ipsum dolor sit amet',
        Thumbnail: ''
    },
    {
        Id: 2,
        Title: 'untitled movie 2',
        Description: 'lorem ipsum dolor sit amet',
        Thumbnail: ''
    },
    {
        Id: 3,
        Title: 'untitled movie 3',
        Description: 'lorem ipsum dolor sit amet',
        Thumbnail: ''
    },
    {
        Id: 4,
        Title: 'untitled movie 4',
        Description: 'lorem ipsum dolor sit amet',
        Thumbnail: ''
    },
    {
        Id: 5,
        Title: 'untitled movie 5',
        Description: 'lorem ipsum dolor sit amet',
        Thumbnail: ''
    }
];

let seats = [
    {
        Id: 1,
        MovieId: 1,
        SeatLocation: 'A1',
        Occupied: false
    },
    {
        Id: 2,
        MovieId: 1,
        SeatLocation: 'A2',
        Occupied: false
    },
    {
        Id: 3,
        MovieId: 1,
        SeatLocation: 'A3',
        Occupied: false
    },
    {
        Id: 4,
        MovieId: 1,
        SeatLocation: 'A4',
        Occupied: false
    },
    {
        Id: 5,
        MovieId: 1,
        SeatLocation: 'A5',
        Occupied: false
    },
    {
        Id: 6,
        MovieId: 1,
        SeatLocation: 'B1',
        Occupied: false
    },
    {
        Id: 7,
        MovieId: 1,
        SeatLocation: 'B2',
        Occupied: false
    },
    {
        Id: 8,
        MovieId: 1,
        SeatLocation: 'B3',
        Occupied: false
    },
    {
        Id: 9,
        MovieId: 1,
        SeatLocation: 'B4',
        Occupied: false
    },
    {
        Id: 10,
        MovieId: 1,
        SeatLocation: 'B5',
        Occupied: false
    },
    {
        Id: 11,
        MovieId: 2,
        SeatLocation: 'A1',
        Occupied: false
    },
    {
        Id: 12,
        MovieId: 2,
        SeatLocation: 'A2',
        Occupied: false
    },
    {
        Id: 13,
        MovieId: 2,
        SeatLocation: 'A3',
        Occupied: false
    },
    {
        Id: 14,
        MovieId: 2,
        SeatLocation: 'A4',
        Occupied: false
    },
    {
        Id: 15,
        MovieId: 2,
        SeatLocation: 'A5',
        Occupied: false
    },
    {
        Id: 16,
        MovieId: 2,
        SeatLocation: 'B1',
        Occupied: false
    },
    {
        Id: 17,
        MovieId: 2,
        SeatLocation: 'B2',
        Occupied: false
    },
    {
        Id: 18,
        MovieId: 2,
        SeatLocation: 'B3',
        Occupied: false
    },
    {
        Id: 19,
        MovieId: 2,
        SeatLocation: 'B4',
        Occupied: false
    },
    {
        Id: 20,
        MovieId: 2,
        SeatLocation: 'B5',
        Occupied: false
    },
    {
        Id: 21,
        MovieId: 3,
        SeatLocation: 'A1',
        Occupied: false
    },
    {
        Id: 22,
        MovieId: 3,
        SeatLocation: 'A2',
        Occupied: false
    },
    {
        Id: 23,
        MovieId: 3,
        SeatLocation: 'A3',
        Occupied: false
    },
    {
        Id: 24,
        MovieId: 3,
        SeatLocation: 'A4',
        Occupied: false
    },
    {
        Id: 25,
        MovieId: 3,
        SeatLocation: 'A5',
        Occupied: false
    },
    {
        Id: 26,
        MovieId: 3,
        SeatLocation: 'B1',
        Occupied: false
    },
    {
        Id: 27,
        MovieId: 3,
        SeatLocation: 'B2',
        Occupied: false
    },
    {
        Id: 28,
        MovieId: 3,
        SeatLocation: 'B3',
        Occupied: false
    },
    {
        Id: 29,
        MovieId: 3,
        SeatLocation: 'B4',
        Occupied: false
    },
    {
        Id: 30,
        MovieId: 3,
        SeatLocation: 'B5',
        Occupied: false
    },
    {
        Id: 31,
        MovieId: 4,
        SeatLocation: 'A1',
        Occupied: false
    },
    {
        Id: 32,
        MovieId: 4,
        SeatLocation: 'A2',
        Occupied: false
    },
    {
        Id: 33,
        MovieId: 4,
        SeatLocation: 'A3',
        Occupied: false
    },
    {
        Id: 34,
        MovieId: 4,
        SeatLocation: 'A4',
        Occupied: false
    },
    {
        Id: 35,
        MovieId: 4,
        SeatLocation: 'A5',
        Occupied: false
    },
    {
        Id: 36,
        MovieId: 4,
        SeatLocation: 'B1',
        Occupied: false
    },
    {
        Id: 37,
        MovieId: 4,
        SeatLocation: 'B2',
        Occupied: false
    },
    {
        Id: 38,
        MovieId: 4,
        SeatLocation: 'B3',
        Occupied: false
    },
    {
        Id: 39,
        MovieId: 4,
        SeatLocation: 'B4',
        Occupied: false
    },
    {
        Id: 40,
        MovieId: 4,
        SeatLocation: 'B5',
        Occupied: false
    },
    {
        Id: 41,
        MovieId: 5,
        SeatLocation: 'A1',
        Occupied: false
    },
    {
        Id: 42,
        MovieId: 5,
        SeatLocation: 'A2',
        Occupied: false
    },
    {
        Id: 43,
        MovieId: 5,
        SeatLocation: 'A3',
        Occupied: false
    },
    {
        Id: 44,
        MoviId: 5,
        SeatLocation: 'A4',
        Occupied: false
    },
    {
        Id: 45,
        MovieId: 5,
        SeatLocation: 'A5',
        Occupied: false
    },
    {
        Id: 46,
        MovieId: 5,
        SeatLocation: 'B1',
        Occupied: false
    },
    {
        Id: 47,
        MovieId: 5,
        SeatLocation: 'B2',
        Occupied: false
    },
    {
        Id: 48,
        MovieId: 5,
        SeatLocation: 'B3',
        Occupied: false
    },
    {
        Id: 49,
        MovieId: 5,
        SeatLocation: 'B4',
        Occupied: false
    },
    {
        Id: 50,
        MovieId: 5,
        SeatLocation: 'B5',
        Occupied: false
    }
];

let paymentTypes = [
    {
        Id: 1,
        Name: 'Paypal'
    },
    {
        Id: 2,
        Name: 'Credit Card'
    }
]

let transactions = [];

app.get('/api/movies', (req, res) => {
    res.send(movies);
});

app.get('/api/seats', (req, res) => {
    const queryObj = url.parse(req.url, true).query;
    res.send(seats.filter(d => d.MovieId == queryObj.MovieId));
});

app.post('/api/seats', (req, res) => {
    try {
        let seat = req.body;

        let found = seats.find(d => d.Id == seat.Id);

        if (found) {
            found.Occupied = seat.Occupied;
        }
        else {
            seats.push(seat);
        }

        res.sendStatus(200);
    }
    catch(e) {
        res.sendStatus(500);
        console.error(e);
    }
});

app.get('/api/paymentTypes', (req, res) => {
    res.send(paymentTypes);
})

app.post('/api/transaction', async (req, res) => {
    try {
        transactions.push(req.body);
        res.sendStatus(200);
    }
    catch(e) {
        res.sendStatus(500);
        console.error(e);
    }
});


io.on('connection', s => {console.log('socket io connected');});

let server = http.listen(3001, () => {
    console.log(`server is listening on port ${server.address().port}`)
});