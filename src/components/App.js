import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamList from '../components/streams/StreamList';
import StreamShow from '../components/streams/StreamShow';
import StreamCreate from '../components/streams/StreamCreate';
import StreamEdit from '../components/streams/StreamEdit';
import StreamDelete from '../components/streams/StreamDelete';
import Header from './Header';
import history from '../history';

export class App extends React.Component {

    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Route path="/" exact component={StreamList}></Route>
                        <Route path="/streams/new" exact component={StreamCreate}></Route>
                        <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
                        <Route path="/streams/delete/:id" exact component={StreamDelete}></Route>
                        <Route path="/streams/show/:id" exact component={StreamShow}></Route>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;