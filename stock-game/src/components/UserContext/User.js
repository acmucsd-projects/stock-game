import axios from 'axios'



class User {
    constructor() {
        axios.get('http://localhost:5000/api/user', { withCredentials: true })
        .then(response => this.data = response.data.user)

    }
}

export default User;