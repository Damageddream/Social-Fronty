import { useState, FormEventHandler } from "react";


const Register:React.FC = ()=> {
    const [name, setName] = useState<string>("")
    const [file, setFile] = useState<File | null>()

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const selected = e.target.files? e.target.files[0] : null
        setFile(selected)
    }

    const submitHandler: FormEventHandler = (e) => {
        e.preventDefault()
    }

    return <>
    <form onSubmit={}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
        <label htmlFor="photo">Photo</label>
        <input type="file" id="photo" onChange={handleFileChange}/>
        <button type="submit">register</button>
    </form>
    
    </>
}

export default Register;