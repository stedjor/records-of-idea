import React, { Component } from 'react'
import firestore from "../Firestore";
import './EditIdea.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class EditIdea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ideaId: '',
            ordinal: 0,
            shortName: '',
            detailedDesc: '',
            expectation: '',
            category: '',
            rating: 0,
            date: null,
            ratings: [],
            categories: ['Personal life', 'Job', 'Education', 'Entertainment', 'Travel', 'Other'],
            modalOpen: false,
            categoryInModal: '',
            isCreatedCategory: false,
            isDeletedCategory: false
        }
    }

    componentDidMount() {
        this.getIdea(this.props.location.state.data)
        this.setState({
            ideaId: this.props.location.state.data
        })
        this.createRating()
    }

    createRating = () => {
        let arrRating = []
        for (let i = 1; i <= 10; i++) {
            arrRating.push(i)
        }
        this.setState({
            ratings: arrRating
        })
    }

    getIdea = (id) => {
        const db = firestore.firestore();
        db.collection("ideas").doc(id).get()
            .then(data => {
                this.setState({
                    ordinal: data.data().ordinal,
                    shortName: data.data().shortName,
                    detailedDesc: data.data().detailedDesc,
                    expectation: data.data().expectation,
                    category: data.data().category,
                    rating: data.data().rating,
                    date: data.data().date
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    changeShortNameHandler = e => {
        this.setState({ shortName: e.target.value })
    }

    changeDetailedDescHandler = e => {
        this.setState({ detailedDesc: e.target.value })
    }

    changeExpectationHandler = e => {
        this.setState({ expectation: e.target.value })
    }

    changeCategoryHandler = e => {
        this.setState({ category: e.target.value })
    }

    changeRatingHandler = e => {
        this.setState({ rating: e.target.value })
    }

    updateIdea = e => {
        e.preventDefault();
        const db = firestore.firestore();
        db.collection("ideas").doc(this.state.ideaId)
            .update({
                ordinal: this.state.ordinal,
                shortName: this.state.shortName,
                detailedDesc: this.state.detailedDesc,
                expectation: this.state.expectation,
                category: this.state.category,
                rating: this.state.rating,
                date: this.state.date
            })
            .then(() => {
                this.props.history.push('list-ideas')
            })
            .catch(error => {
                console.log(error)
            })
    }

    backToListIdeas = () => {
        let path = `list-ideas`;
        this.props.history.push(path);
    }

    //======= Manipulating category =======//
    getCategory = () => {
        let cat = JSON.parse(localStorage.getItem('category'))
        this.setState({
            categories: cat
        })
    }

    createCategory = () => {
        let catArr = this.state.categories
        if (this.state.categoryInModal !== '') {
            catArr.push(this.state.categoryInModal)
            this.setState({
                categories: catArr,
                isCreatedCategory: true
            })
        }
    }

    deleteCategory = index => {
        let catArr = this.state.categories;
        catArr.splice(index, 1)
        this.setState({
            categories: catArr,
            isDeletedCategory: true
        })
    }

    changeCategoryModalHandler = e => {
        let isDeleted = this.state.isDeletedCategory
        if (e.target.value !== '') {
            isDeleted = true
        } else {
            isDeleted = false
        }
        this.setState({
            categoryInModal: e.target.value,
            isDeletedCategory: isDeleted
        })
    }

    openCategoryModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    saveCategory = () => {
        if (this.state.isCreatedCategory || this.state.isDeletedCategory) {
            this.setState({
                modalOpen: false
            })
            localStorage.setItem('category', JSON.stringify(this.state.categories))
        }

    }

    closeModal = () => {
        if (this.state.isCreatedCategory || this.state.isDeletedCategory) {
            let conf = window.confirm('Do you real want to close, your changes will be lost?')
            if (conf) {
                let cat = JSON.parse(localStorage.getItem('category'))
                this.setState({
                    modalOpen: false,
                    categories: cat,
                    categoryInModal: '',
                    isDeletedCategory: false,
                    isCreatedCategory: false
                })
            }
        } else {
            this.setState({
                modalOpen: false
            })
        }
    }


    render() {
        const { shortName, detailedDesc, expectation, category, rating, ratings, categories, modalOpen, categoryInModal, isDeletedCategory } = this.state
        const modalStyle = {
            display: 'block'
        }
        modalOpen ? modalStyle.display = 'block' : modalStyle.display = 'none';
        return (
            <React.Fragment>
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <div className="card edit-idea-card">
                            <div className="card-header edit-idea-card-header">
                                <h3>Edit idea</h3>
                            </div>
                            <div className="card-body edit-idea-card-body">
                                <form onSubmit={this.updateIdea}>
                                    <div className="row ">
                                        <div className="col-md-6">
                                            <div className="form-group edit-card-form-group">
                                                <label htmlFor="inputShortName">Short Name </label>
                                                <input type="text" className="form-control" id="inputShortName" placeholder="Enter short name"
                                                    value={shortName || ''} onChange={this.changeShortNameHandler} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group edit-card-form-group">
                                                <label htmlFor="inputCategory">Category</label>
                                                <div className="d-flex">
                                                    <select className="form-control movie-input" value={category || ''} onChange={this.changeCategoryHandler} >
                                                        <option value={category || ''} hidden>{category}</option>
                                                        {
                                                            categories.map((categrory, index) => {
                                                                return <option value={categrory} key={index}>{categrory}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <button type="button" className="new-card-add-category-btn" onClick={this.openCategoryModal}>
                                                        <FontAwesomeIcon icon={faPlusCircle} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group edit-card-form-group">
                                                <label htmlFor="inputRating">Rating</label>
                                                <select className="form-control " value={rating} onChange={this.changeRatingHandler} >
                                                    {
                                                        ratings.map((rating, index) => {
                                                            return <option value={rating} key={index}>{rating}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-md-12">
                                            <div className="form-group edit-card-form-group">
                                                <label htmlFor="inputDetailedDesc">Detailed description</label>
                                                <textarea className="form-control" rows="3" id="inputDetailedDesc" placeholder="Enter detailed description "
                                                    value={detailedDesc || ''} onChange={this.changeDetailedDescHandler}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group edit-card-form-group">
                                                <label htmlFor="inputExpectation">Expectation</label>
                                                <textarea className="form-control" rows="3" id="inputExpectation" placeholder="Enter expectation"
                                                    value={expectation || ''} onChange={this.changeExpectationHandler} ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button type="submit" className="btn edit-card-btn-submit">Submit</button>
                                        <button type="button" className="btn edit-card-btn-back" onClick={this.backToListIdeas}>back</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal category */}
                <div className="modal edit-idea-modal" tabIndex="-1" role="dialog" style={modalStyle}>
                    <div className="modal-dialog " role="document">
                        <div className="modal-content edit-idea-modal-content">
                            <div className="modal-header edit-idea-modal-header">
                                <div>
                                    <h5 className="modal-title">Add new category</h5>
                                </div>
                                <button type="button" className="close " data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body edit-idea-modal-body">
                                <div className="row mb-2">
                                    <div className="col input-group">
                                        <input type="text" className="form-control add-new-category-input" id="inputCategory" placeholder="Add new Category"
                                            value={categoryInModal} onChange={this.changeCategoryModalHandler} />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary add-new-category-btn" onClick={this.createCategory}>add</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="new-idea-subtitle-modal">List of categories</h6>
                                        <ul className="list-group edit-idea-category-modal scrollbar scrollbar-primary">
                                            {
                                                categories.map((item, index) => {
                                                    return (
                                                        <li className="list-group-item d-flex justify-content-between" key={index}>
                                                            <div>
                                                                {item}
                                                            </div>
                                                            <button className="btn btn-link new-idea-delete-category" onClick={() => this.deleteCategory(index)}>
                                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                            </button>

                                                        </li>

                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer edit-idea-modal-footer">
                                <button type="button" className="btn new-card-btn" data-dismiss="modal" aria-label="Close" onClick={this.saveCategory}
                                    disabled={!isDeletedCategory}>
                                    <span aria-hidden="true">Save</span>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop" style={modalStyle} onClick={this.closeModal}></div>

            </React.Fragment>
        )
    }
}

export default EditIdea
