import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { set } from '../redux/slices/username'

function Login() {
    const dispatch = useDispatch()


    const [formData, setFormData] = useState({
        username: "",
    })
    const [errors, setErrors] = useState({
        username: ""
    })


    function handleChange(e) {
        if (!e.target.checkValidity()) {
            setErrors({ ...errors, username: 'Only alphabets and "_" allowed ' })
        } else setErrors({ ...errors, username: '' })
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (errors.username === "" && formData.username !== "") {
            dispatch(set(formData.username))
        } else if (formData.username === "") {
            setErrors({ ...errors, username: 'Username cannot be empty' })
        }
    }

    return (
        <section id="login">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <form className="myform mx-auto">
                            <div className="form-group">
                                <label htmlFor="username">Enter Username : </label>
                                <input type="text" className="form-control mt-1" onChange={handleChange} placeholder="Username" name="username" pattern="[A-Za-z_]*" />
                                <span>{errors.username}</span>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary mt-3 mx-auto" onClick={handleSubmit}>Play <i className="fa-solid fa-play"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login