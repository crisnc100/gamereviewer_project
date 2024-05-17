import { useEffect, useState } from "react"
import axios from 'axios'

const Dashboard = (props) => {

const {viewReview, setReviewPage} = useState(false)
const {currentUser} = props

// Grab all games
useEffect(() => {
    axios.get('http://localhost:8000/api/')
})


    return (
        <>
            <div>
                <h1>Welcome currentUser</h1>
                <h2>Reviews from others:</h2>

                <table class="table align-middle mb-0 bg-grey">
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    )
}
export default Dashboard


// Ignore this
{/* <form action="">

<div>
    <label htmlFor="firstName"></label>
    <input type="text" name="firstName" placeholder="First Name" />
</div>

<div>
    <label htmlFor="lastName"></label>
    <input type="text" name="lastName" placeholder="Last Name" />
</div>


<div>
    <label htmlFor="email"></label>
    <input type="text" name="email" placeholder="email" />
</div>

<div>
    <label htmlFor="password"></label>
    <input type="text" name="password" placeholder="password" />
</div>


</form> */}