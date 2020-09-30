import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Header from './Header/Header';
import NewIdea from './Ideas/NewIdea';
import ListIdeas from './Ideas/ListIdeas';
import EditIdea from './Ideas/EditIdea';
import Footer from './Footer/Footer';
import './Routing.css'


class Routing extends Component {
    render() {
        return (
            <Router>
                <Header />
                <section className="container main-content">
                    <Switch>
                        <Route exact path="/" component={ListIdeas} >
                            <Redirect to="/list-ideas" />
                        </Route>
                        <Route path="/list-ideas" component={ListIdeas} />
                        <Route path="/new-idea" component={NewIdea} />
                        <Route path="/edit-idea" component={EditIdea} />
                    </Switch>
                </section>
                <Footer />
            </Router>
        )
    }
}

export default Routing
