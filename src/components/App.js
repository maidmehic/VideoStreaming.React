import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamList from '../components/streams/StreamList';
import StreamShow from '../components/streams/StreamShow';
import StreamCreate from '../components/streams/StreamCreate';
import StreamEdit from '../components/streams/StreamEdit';
import Header from './Header';
import history from '../history';

export class App extends React.Component {

    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={StreamList}></Route>
                            <Route path="/streams/new" exact component={StreamCreate}></Route>
                            <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
                            <Route path="/streams/:id" exact component={StreamShow}></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;