import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AddAuthorForm from './AddAuthorForm'
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: '/images/authors/Mark_Twain.jpg',
        imageSource: 'Wikipedia Commons',
        books: ['The Adventures of Huckleberry Finn']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: '/images/authors/Joseph_Conrad.jpg',
        imageSource: 'Wikipedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: '/images/authors/JK_Rowling.jpg',
        imageSource: 'Wikipedia Commons',
        books: ['Harry Potter and the Sorcerers Stone']
    },
    {
        name: 'Stephen King',
        imageUrl: '/images/authors/Stephen_King.jpg',
        imageSource: 'Wikipedia Commons',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: '/images/authors/Charles_Dickens.jpg',
        imageSource: 'Wikipedia Commons',
        books: ['David Copperfield', 'A tale of Two Cities']
    },
    {
        name: 'William Shakespeare',
        imageUrl: '/images/authors/William_Shakespeare.jpg',
        imageSource: 'Wikipedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
];

function getTurnData() {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) =>
                title === answer))
    }
}

function resetState() {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

let state = resetState();

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function App() {
    return <AuthorQuiz {...state}
    onAnswerSelected={onAnswerSelected}
    onContinue={() => {
        state = resetState();
        render();
    }}/>;
}

const AuthorWrapper = withRouter(({ history }) => 
    <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }} />
);

function render() {
    ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App} />
            <Route exact path="/add" component={AuthorWrapper} />
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}
render();
registerServiceWorker();
