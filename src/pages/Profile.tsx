import '../styles/Profile.css'
import { useParams } from 'react-router-dom'
function Profile(){
    const {username} = useParams<{username : string}>()
    
    if(!username){
        return (
            <h1>User not Found</h1>
        )
    }
    
    return (
        <>
        <h1>Profile</h1>
        <h1>{username}</h1>
        </>
    )
}

export default Profile