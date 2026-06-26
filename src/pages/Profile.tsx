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
                <div className='flex justify-center items-center flex-col shadow-xl/30 w-xs gap-2 mb-3 rounded-md p-3.5'>
                    <div className='flex justify-center items-center w-full flex-col'>
                        <img src={user?.avatar_url} className = 'min-w-28 rounded-4xl' alt="" />
                        <h1>{user?.name}</h1>
                        <h1>{user?.login}</h1>
                        <p>{user?.bio}</p>
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                        <span className='flex justify-between'>
                            <h1>Followers:</h1><h1>{user?.followers}</h1>
                        </span>
                        <span className='flex justify-between'>
                            <h1>Following:</h1><h1>{user?.following}</h1>
                        </span>
                        <span className='flex justify-between'>
                            <h1>Public repos:</h1><h1>{user?.public_repos}</h1>
                        </span>
                        <div className='flex flex-col justify-center items-center'>
                        <h1>{user?.company}</h1>
                        <h1>{user?.location}</h1>
                        </div>
                    </div>
                </div>
                <button className='w-16 h-9 text-gray-300 bg-gray-700 rounded-lg border' onClick = {() => {navigate('/')}}>back</button>
            </div>
        </div>
    )
}

export default Profile