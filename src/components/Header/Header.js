import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import './Header.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'

export class Header extends Component {

    render() {
        return (
            <nav className="navbar navbar-light justify-content-between idea-header mb-2">
                <a className="navbar-brand header-brand" href="/">
                    Record <FontAwesomeIcon className="brand-icon" icon={faLightbulb} />f Ideas
                </a>

                <div className="d-flex mb-2 justify-content-between" >
                    <NavLink activeClassName="active" className="mr-2 header-link" to="/list-ideas">
                        Ideas
                    </NavLink>
                    <NavLink activeClassName="active" className="header-link mr-4" to="/new-idea">
                        New Idea
                    </NavLink>
                    <a className="header-link  idea-header-icon"  rel="noopener noreferrer"  target="_blank" href="https://github.com/stedjor/records-of-idea">
                    <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </nav>
        )
    }
}

export default Header
