import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Footer.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'

class Footer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: true,
        }
    }

    showInfoModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    closeModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })

        console.log(this.state.modalOpen)
    }

    render() {
        const { modalOpen } = this.state
        const modalStyle = {
            display: 'block'
        }
        modalOpen ? modalStyle.display = 'block' : modalStyle.display = 'none';
        return (
            <React.Fragment>
                <footer className="navbar navbar-light justify-content-between idea-footer mt-2">
                    <div className="d-flex mb-2 justify-content-between" >
                        <p className="footer-link  idea-footer-icon" rel="noopener noreferrer"
                            title="Info" onClick={this.showInfoModal}>
                            <FontAwesomeIcon icon={faLightbulb} />
                        </p>
                    </div>
                    <a className="navbar-brand footer-signature" title="Go to my portfolio app" rel="noopener noreferrer" target="_blank" href="https://stefan-djordjevic.rs/home">
                        Stefan Đorđević</a>
                </footer>
                {/* modal */}
                <div className="modal idea-footer-modal" tabIndex="-1" role="dialog" style={modalStyle}>
                    <div className="modal-dialog idea-footer-modal-dialog" role="document">
                        <div className="modal-content idea-footer-modal-content">
                            <div className="modal-header idea-footer-modal-header">
                                <div>
                                    <h5 className="modal-title">Record <FontAwesomeIcon className="lightbul-icon" icon={faLightbulb} />f Ideas </h5>
                                </div>
                                <button type="button" className="close " data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body idea-footer-modal-body">
                                <h4 className="text-center">Welcome</h4>
                                <h5 className="idea-footer-modal-text-indent">
                                    This is a Single Page Application for a simple record of ideas
                                    where you can add an idea, edit it and delete it.
                                </h5>
                                <h5 className="idea-footer-modal-text-indent">
                                    The whole application is made in React Framework.
                                    For the look I used Bootstrap and clean css without a preprocessor.
                                    The application is connected to the Firebase database.
                                    </h5>
                                <h5 className="idea-footer-modal-text-indent">
                                    You can see the whole code on my github profile by clicking on the cat in the upper right corner.
                                </h5>
                                <h5 className="idea-footer-modal-text-indent">
                                    There is a signature in the lower right corner and by clicking on it you can access my web presentation.
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="idea-footer-modal-backdrop" style={modalStyle} onClick={this.closeModal}></div>
                </div>
            </React.Fragment>
        )
    }
}

export default Footer