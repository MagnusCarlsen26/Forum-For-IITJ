import axios from 'axios'

export default function responseUtil(id,email,setEmail,setLike,setPfp,setUsername) {
    const storedData = localStorage.getItem('email')
    if (storedData) setEmail(storedData)

    const fetchData = async (id) => {
        var response = await axios.post("http://localhost:5000/feed/likeDislikeFetch", { id, author: storedData })
        setLike(response.data)
        response = await axios.post("http://localhost:5000/profile/getUser",{email})
        setPfp(response.data.profilePicture)
        setUsername(response.data.username)
    }
    fetchData(id)

}