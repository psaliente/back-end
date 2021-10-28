const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const url = require('url');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mongoose = require('mongoose');

app.use(cors());
app.use('/', express.static(__dirname + '/public', {
    index: 'index.html'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = Promise;

const dbURL = 'mongodb+srv://nodeUser:ivnwY8F7faMyakln@cluster0.5jr6j.mongodb.net/movie-house?retryWrites=true&w=majority';

//thumbnail sources https://www.bestrandoms.com/random-movie-generator

let Seat = mongoose.Schema({
    MovieId: Number,
    Location: String,
    Occupied: Boolean
});

let Movie = mongoose.model('Movie', {
    Title: String,
    Year: String,
    Description: String,
    Thumbnail: String,
    Seats: [Seat]
});

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
    try {
        Movie.find({}, (e, movies) => {
            res.send(movies);
        });
    }
    catch (e) {
        res.sendStatus(500);
        logger.error(e);
    }
});

app.get('/api/seats', async (req, res) => {
    try {
        const queryObj = url.parse(req.url, true).query;
        let movie = await Movie.findOne({ _id: queryObj.MovieId })
        if (movie) {
            res.send(movie.Seats);
        } else {
            res.send([]);
        }
    }
    catch (e) {
        res.sendStatus(500);
        logger.error(e);
    }
});

app.post('/api/seats', async (req, res) => {
    try {
        let seat = req.body;

        let movie = await Movie.findOne({ _id: seat.MovieId });
        if (movie) {
            let found = movie.Seats.filter(s => s.Location == seat.Location);
            found.Occupied = seat.Occupied;
            await movie.save();
            logger.info(`saved - MovieID:${seat.MovieId} SeatLocation:${seat.Location} Occupied:${seat.Occupied}`);
        }
        res.sendStatus(200);
    }
    catch (e) {
        res.sendStatus(500);
        logger.log('error', e);
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
    catch (e) {
        res.sendStatus(500);
        logger.log('error', e)
    }
});


io.on('connection', s => { console.log('socket io connected'); });

mongoose.connect(dbURL, (err) => {
    console.log('mongo db error', err)
    logger.error(err)
});

let server = http.listen(3001, () => {
    logger.info(`server is listening on port ${server.address().port}`)
});