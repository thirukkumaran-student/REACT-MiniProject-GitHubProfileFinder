import { useState, useEffect } from 'react'
import '../styles/Profile.css'
import { useNavigate, useParams } from 'react-router-dom'
function Profile(){
    const {username} = useParams<{username : string}>()
    const navigate = useNavigate()
    interface GitHubUser {
        avatar_url : string,
        login : string,
        name : string | null,
        bio : string | null,
        company : string | null,
        location : string | null,
        followers : number,
        following : number,
        public_repos : number
    }
    const [user, setUser] = useState<GitHubUser | null>(null)
    const [loading, setLoad] = useState<boolean>(true)
    const [err, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUser(){
            const url = `https://api.github.com/users/${username}`

            try{
            const response = await fetch(url)

            if (!response.ok) throw new Error('User not found')

            const data : GitHubUser = await response.json()
            setUser(data)               
            }
            catch(error : Error | unknown){
                if (error instanceof Error) setError(error.message)
                else setError('Something went wrong')
            }
            finally{
                setLoad(false)

            }        
        }

        fetchUser()
        setLoad(true)
    }, [username])

    useEffect(() => {
        console.log(`User : ${user}`)
    }, [user])

    if (loading){
        return (<div className='flex justify-center items-center min-h-screen'>
            <h1 className = 'text-3xl'>Loading . . .</h1>
            </div>
        )
    }

    if(err){
        return (
            <div className='flex justify-center items-center min-h-screen flex-col gap-2'>
            <h1 className = 'text-3xl'>{err}</h1>
            <button className='w-16 h-9 text-gray-300 bg-gray-700 rounded-lg border' onClick = {() => {navigate('/')}}>back</button>
            </div>
        )
    }
    
    return (
        <div className = 'flex justify-center items-center min-w-screen h-screen '>
            <div className='w-sm flex items-center flex-col'>
                <div className='shadow-xl/30 w-sm mb-3 rounded-md p-3.5'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <button className='w-16 h-9 text-gray-300 bg-gray-700 rounded-lg border' onClick = {() => {navigate('/')}}>back</button>
            </div>
        </div>
    )
}

export default Profile