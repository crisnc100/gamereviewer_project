import axios from 'axios';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'; // This import helped it work!
import { useNavigate } from 'react-router-dom';

const CreateReview = (props) => {

    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState(0)
    const [errors,setErrors] = useState([])

    const reviewTextHandler = (e) => {
        setReviewText(e.target.value)
    }
    const ratingHandler = (e) => {
        setRating(e.target.value)
    }

    const {gameId} = props
    const {passUserId} = props
    const {gameTitle} = props

    const reviewFormHandler = (e) => {
        e.preventDefault()

        axios.post(`http://localhost:8000/api/review/${gameId}`, { userId : passUserId, reviewText, rating }, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log('Line 36: CreateReview.jsx ', error.response.data)
                setErrors(error.response.data)
                navigate('/dashboard/all-games')
            })
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Write a review
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Leave Review:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='reviewForm' onSubmit={reviewFormHandler} className="border border-primary p-2 border-5 rounded" >
                        <div class="form-outline" data-mdb-input-init>
                            <label className="form-label" htmlFor="reviewText">Review: {gameTitle}</label>
                            <textarea className="form-control" value={reviewText} onChange={reviewTextHandler} name="reviewText" rows="4"></textarea>
                            {errors.message && <p className="alert alert-danger">{errors.message}</p>}
                        </div>

                        <div className="form-outline" data-mdb-input-init>
                            <label className="form-label" htmlFor="rating">Rating</label>
                            <input type="number" className='form-control' name='rating' min='1' max='10' onChange={ratingHandler} />
                            {errors.message && <p className="alert alert-danger">{errors.message}</p>}
                        </div>
                        {/* <button className="btn btn-primary mt-2">Done</button> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button form='reviewForm' className="btn btn-primary mt-1">Done</button>
                    {/* <Button variant="primary">Done</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default CreateReview;
