import React, { Component } from 'react'
import firestore from "../Firestore";
import './ListIdeas.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowUp,
    faArrowLeft,
    faEdit,
    faTrashAlt,
    faLongArrowAltDown,
    faLongArrowAltUp
} from '@fortawesome/free-solid-svg-icons'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'

class ListIdeas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allIdeas: [],
            idea: null,
            ideaId: '',
            ideaInx: 0,
            sortOrdinal: false
        }
    }

    componentDidMount() {
        this.getIdeas()
    };

    getIdeas = () => {
        const db = firestore.firestore();
        db.collection("ideas").get()
            .then(data => {
                const ideas = []
                data.forEach((doc) => {
                    ideas.push({ id: doc.id, ...doc.data() })
                })
                ideas.sort((a, b) => a['ordinal'] - b['ordinal'])
                this.setState({ allIdeas: ideas })
            })
            .catch(error => {
                console.log(error)
            })
    }

    getIdea = (id, inx) => {
        const db = firestore.firestore();
        db.collection("ideas").doc(id).get()
            .then(data => {
                this.setState({
                    idea: data.data(),
                    ideaId: id,
                    ideaInx: inx
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    editIdea = () => {
        let path = `edit-idea`;
        this.props.history.push(path);
        this.props.history.push({
            state: { data: this.state.ideaId }
        })
    }

    deleteIdea = () => {
        let reset = window.confirm("Do you realy want to delete this idea?")
        if (reset) {
            const db = firestore.firestore();
            db.collection("ideas").doc(this.state.ideaId)
                .delete()
                .then(() => {
                    this.state.allIdeas.splice(this.state.ideaInx, 1)
                    this.setState({
                        allIdeas: this.state.allIdeas,
                        idea: null
                    })
                    this.props.history.push(`list-ideas`);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    sortByOrdinal = () => {
        let ideas = this.state.allIdeas
        if (!this.state.sortOrdinal) {
            ideas.sort((a, b) => b.ordinal - a.ordinal)
        } else {
            ideas.sort((a, b) => a.ordinal - b.ordinal)
        }

        this.setState({
            allIdeas: ideas,
            sortOrdinal: !this.state.sortOrdinal
        })

    }

    render() {
        const { allIdeas, idea, ideaId, sortOrdinal } = this.state
        return (
            <div className="row">
                <div className="col-lg-4 col-md-5">
                    <div className="text-center">
                        <button className="btn list-btn-sort" onClick={this.sortByOrdinal}>
                            Sort by ordinal <FontAwesomeIcon icon={sortOrdinal ? faLongArrowAltDown : faLongArrowAltUp} />
                        </button>
                    </div>

                    {
                        allIdeas.length !== 0 ? (
                            <div className="list-card-content scrollbar scrollbar-primary mb-2">
                                {
                                    allIdeas.map((item, index) => {
                                        return (
                                            <div className={`card list-card mb-1 ${ideaId !== '' && ideaId === item.id ? "list-active" : ""}`} key={item.id} onClick={() => this.getIdea(item.id, index)}>
                                                <div className="card-body list-card-body">
                                                    <div className="row" >
                                                        <div className="col-3">
                                                            <h3>{item.ordinal}.</h3>
                                                        </div>
                                                        <div className="col">
                                                            <h6>{item.shortName}</h6>
                                                            <small>{item.date}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                                <div className="no-ideas text-center p-5">
                                    <h3>No ideas to show</h3>
                                </div>
                            )
                    }
                </div>
                {
                    idea !== null ? (
                        <div className="col-lg-8 col-md-7">
                            <div className="card idea-card">
                                <div className="card-header idea-card-header d-flex justify-content-between">
                                    <div>
                                        <h4><span>{idea.ordinal}.</span> {idea.shortName} </h4> <small>{idea.date}</small>
                                    </div>
                                    <div className="d-flex">
                                        <button type="button" className="btn btn-link card-link-btn"
                                            onClick={this.editIdea}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button type="button" className="btn btn-link card-link-btn"
                                            onClick={this.deleteIdea}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body idea-card-body">
                                    <div className="idea-card-details">
                                        <h5 >Category: </h5>
                                        <div className="idea-card-text">{idea.category}</div>
                                    </div>
                                    <div className="idea-card-details">
                                        <h5>Detailed description: </h5>
                                        <div className="idea-card-text">{idea.detailedDesc}</div>
                                    </div>
                                    <div className="idea-card-details">
                                        <h5>Expectation: </h5>
                                        <div className="idea-card-text">{idea.expectation}</div>
                                    </div>
                                    <div className="idea-card-rating">
                                        <div><span>R:</span> {idea.rating}*</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className="col-lg-8 col-md-7">
                                <div className="not-picked-idea">
                                    <FontAwesomeIcon icon={faLightbulb} className={allIdeas.length !== 0 ? "list-light-bulb" : "list-dark-bulb"} />
                                    {
                                        allIdeas.length !== 0 ? (
                                            <h3 > <FontAwesomeIcon icon={(window.innerWidth <= 425) ? faArrowUp : faArrowLeft} className="list-carret-arrow" /> Pick the idea to see details</h3>
                                        ) : <h3 className="list-no-ideas">No ideas</h3>
                                    }
                                </div>
                            </div>
                        )
                }

            </div>

        )
    }
}

export default ListIdeas
