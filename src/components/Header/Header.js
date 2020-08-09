import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import './Header.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export class Header extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <nav className="navbar navbar-light justify-content-between idea-header mb-2">
                <a className="navbar-brand header-signature" href="/">
                    Stefan Đorđević
                </a>

                <div className="d-flex mb-2 justify-content-between" >
                    <NavLink activeClassName="active" className="mr-2 header-link" to="/list-ideas">
                        Ideas
                    </NavLink>
                    <NavLink activeClassName="active" className="header-link mr-4" to="/new-idea">
                        New Idea
                    </NavLink>
                    <a className="header-link  idea-header-icon" target="_blank" href="https://github.com/stedjor/records-of-idea"
                        rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </nav>
        )
    }
}

export default Header
