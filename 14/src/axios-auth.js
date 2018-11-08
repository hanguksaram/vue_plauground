import axios from 'axios'

//local axios configuration
const instance = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
})
instance.interceptors.request.use(config => {
    return config
})
instance.interceptors.response.use(res =>  {
    return res
})
export default instance 