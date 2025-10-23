import axios from 'axios'

const axiosInstance=axios.create({
    // baseURL:"http://127.0.0.1:5001/fir-801f7/us-central1/api"
    // baseURL:"http://localhost:5000"

    baseURL:"https://amazon-api-aa0d.onrender.com"

})

export {axiosInstance}