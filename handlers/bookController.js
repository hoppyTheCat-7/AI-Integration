const Book = require("../pkg/books/bookSchema");
const { chatWithAI } = require("./aiSystem");

exports.createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();

        return res.status(200).json(book);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// RAG
exports.chatAboutBooks = async (req, res) => {
    try {
        if (req.auth?.role === "admin") {
            return res.status(403).json({ error: "Admins cannot use the Book Chat!" });
        }

        const books = await Book.find();

        const context = books.map(
            (book) =>
                `Title: ${book.title}, Description: ${book.description}, Genre: ${book.genre}, Author: ${book.author}, Publication Year: ${book.publicationYear}, Page Count: ${book.pageCount}, Rating: ${book.rating}`)

        const systemMessage =
            "Use the following information to answer questions about books:";

        const fullPrompt = `${systemMessage}\n${context}\n\nQuestions: ${req.body.prompt}`;

        const aiResponse = await chatWithAI(fullPrompt);

        return res.status(200).json(aiResponse);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.addSampleBooks = async (req, res) => {
    try {
        const sampleBooks = [
            {
                "title": "Harry Potter",
                "description": "A young wizard and his friends embark on a journey to save their world",
                "genre": "Fantasy",
                "author": "J.K. Rowling",
                "publicationYear": 1997,
                "pageCount": 223,
                "rating": 4.8,
                "isRead": false
            },
            {
                "title": "The Catcher in the Rye",
                "description": "Social alienation through the eyes of an adolescent",
                "genre": "Realistic Fiction",
                "author": "J.D. Salinger",
                "publicationYear": 1951,
                "pageCount": 250,
                "rating": 3.7,
                "isRead": true
            },
            {
                "title": "Sense and Sensibility",
                "description": "A classic exploration of pivotal themes during the Regency Era",
                "genre": "Historical Romance",
                "author": "Jane Austen",
                "publicationYear": 1811,
                "pageCount": 400,
                "rating": 4.4,
                "isRead": true
            },
            {
                "title": "The Great Gatsby",
                "description": "The tragedy of pursuing the American Dream",
                "genre": "Psychological Fiction",
                "author": "F. Scott Fitzgerald",
                "publicationYear": 1925,
                "pageCount": 180,
                "rating": 4.0,
                "isRead": true
            },
            {
                "title": "Who's Afraid of Virginia Woolf?",
                "description": "The reality and illusion of marital strife",
                "genre": "Absurdist Drama",
                "author": "Edward Albee",
                "publicationYear": 1962,
                "pageCount": 250,
                "rating": 4.5,
                "isRead": true
            },
            {
                "title": "Norse Mythology",
                "description": "A riveting adaptation of classic Norse myths",
                "genre": "Fantasy Fiction",
                "author": "Neil Gaiman",
                "publicationYear": 2017,
                "pageCount": 304,
                "rating": 4.3,
                "isRead": false
            },
            {
                "title": "31 Songs",
                "description": "A collection of 26 essays about songs",
                "genre": "Biography",
                "author": "Nick Hornby",
                "publicationYear": 2002,
                "pageCount": 256,
                "rating": 3.6,
                "isRead": true
            },
            {
                "title": "The Hitchhiker's Guide to The Galaxy",
                "description": "The misadventures of the last surviving Earthling",
                "genre": "Comedy Sci-Fi",
                "author": "Douglas Adams",
                "publicationYear": 1979,
                "pageCount": 224,
                "rating": 3.8,
                "isRead": true
            },
            {
                "title": "Seize the Day",
                "description": "Exploring themes of failure, identity and the search for meaning",
                "genre": "Psychological Fiction",
                "author": "Saul Bellow",
                "publicationYear": 1956,
                "pageCount": 128,
                "rating": 3.5,
                "isRead": true
            },
            {
                "title": "The Bell Jar",
                "description": "Exploring themes of identity, mental illness, and women's roles in society",
                "genre": "Fictional Autobiography",
                "author": "Sylvia Plath",
                "publicationYear": 1963,
                "pageCount": 244,
                "rating": 4.0,
                "isRead": true
            },
            {
                "title": "The Hobbit",
                "description": "A reluctant hobbit embarks on an unexpected adventure, leading to the discovery of hidden courage and the confrontation of powerful forces",
                "genre": "Fantasy",
                "author": "J.R.R. Tolkien",
                "publicationYear": 1937,
                "pageCount": 310,
                "rating": 4.7,
                "isRead": false
            }
        ];

        const inserted = await Book.insertMany(sampleBooks);
        return res.status(201).json({
            message: "Books added",
            data: inserted,
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};