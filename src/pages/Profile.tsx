import '../styles/Profile.css'
import { useNavigate, useParams } from 'react-router-dom'
function Profile(){
    const {username} = useParams<{username : string}>()
    const navigate = useNavigate()
    if(!username){
        return (
            <h1>User not Found</h1>
        )
    }
    
    return (
        <div className = 'flex justify-center items-center min-w-screen h-screen '>
            <div className='w-sm flex items-center flex-col'>
                <div className='shadow-xl/30 w-sm mb-3 rounded-md p-3.5'>
                    
                    <h1>{username}</h1>
                </div>
                <button className='w-16 h-9 text-gray-300 bg-gray-700 rounded-lg border' onClick = {() => {navigate('/')}}>back</button>
            </div>
        </div>
    )
}

export default Profile