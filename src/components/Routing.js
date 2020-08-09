import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Header from './Header/Header';
import NewIdea from './Ideas/NewIdea';
import ListIdeas from './Ideas/ListIdeas';
import EditIdea from './Ideas/EditIdea';


class Routing extends Component {
    render() {
        return (
            <Router>
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={ListIdeas} >
                            <Redirect to="/list-ideas" />
                        </Route>
                        <Route path="/list-ideas" component={ListIdeas} />
                        <Route path="/new-idea" component={NewIdea} />
                        <Route path="/edit-idea" component={EditIdea} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Routing
