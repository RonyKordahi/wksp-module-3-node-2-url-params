'use strict';

const morgan = require('morgan');
const express = require('express');

const { top50 } = require('./data/top50');
const { books } = require("./data/books");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// endpoints here
//top50
app.get("/top50", (req, res) => {
    res.render("pages/top50" , {
        title: "Top 50 Songs Streamed on Spotify",
        topSongs: top50
    });
});

//sorting the most popular artists
app.get("/top50/popular-artist", (req, res) => {
    res.render("pages/popular-artist", {
        title: "Most poplar artist in the top 50",
        topArtist: top50,
    })
})

//params on each individual song
app.get("/top50/song/:number", (req, res) => {
    const number = req.params.number;
    
    if (number < 1 || number > 50 || number % 1 !== 0) {
        res.status(404);
        res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
    }
    else {
        res.render("pages/songNumber", {
            number: number,
            allSongs: top50,
            title: `Song #${number}`
        })
    }
})

//all books
app.get("/books", (req, res) => {
    res.render("pages/books", {
        title: "All the books available",
        books: books
    })
})

//books by ID
app.get("/books/id/:number", (req, res) => {
    const id = req.params.number;

    if (id < 101 || id > 125 || id % 1 !== 0) {
        res.status(404);
        res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
    }
    else {
        res.render("pages/bookID", {
            id: id,
            title: `Book #${id}`,
            books: books
        })
    }
})

app.get("/books/type/:type", (req, res) => {
    const type = req.params.type;

    if (type === "fiction" || type === "non-fiction" || type === "drama" || type === "graphic-novel") {
        res.render("pages/bookType", {
            type: type,
            books: books,
            title: `All books that fall under the ${type} category`
        })
    }
})

// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));