import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Home(){
    const navigate = useNavigate()
    let [username, setName] = useState<string>('')
    return (
        <div className = 'min-h-screen flex justify-center items-center flex-col gap-6 font-bold'>
            <h1 className="text-3xl">Search for the GitHub Profile Here:</h1>
            <form className="w-full max-w-md h-20 shadow-md/30 font-mono bg-mauve-100 rounded-2xl flex justify-center items-center">
                <input className = 'inset-shadow-sm/20 pl-2 bg-white w-xs h-9' placeholder="Type the profile id" type="search" value={username}onChange={(e) => {setName(e.target.value)}} id="" />
                <button className="bg-green-600 w-20 h-9 ml-2 rounded-sm text-amber-50 text-xl hover:bg-green-700 transition-all duration-100" onClick={() => {navigate('/user/:username')}}>Search</button>
            </form>
        </div>
    )
}

export default Home