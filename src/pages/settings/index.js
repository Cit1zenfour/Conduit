import React, {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";


const Settings = () => {
    const apiUrml = '/user'
    const [user, dispatch] = useContext(CurrentUserContext)
    const [image, setImage] = useState( '')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [{response}, doFetch] = useFetch(apiUrml)
    const [success, setSuccess] = useState(false)
    const [, setToken] = useLocalStorage('token')


    const handleSubmit = (event) => {
        event.preventDefault()
        doFetch({
            method: 'put',
            data: {
                user: {
                    ...user.currentUser,
                    image,
                    username,
                    bio,
                    email,
                    password
                }
            }
        })
    }

    const logout = (event) => {
        event.preventDefault()
        setToken('')
        dispatch({type: 'LOGOUT'})
        setSuccess(true)
    }

    useEffect(() => {
        if (!user.currentUser) {
            return
        }

        setImage(user.currentUser.image)
        setUsername(user.currentUser.username)
        setBio(user.currentUser.bio)
        setEmail(user.currentUser.email)

    }, [user.currentUser])

    useEffect(() => {
        if (!response) {
            return
        }

        dispatch({type: 'SET_AUTHORIZED', payload: response.user})
        setSuccess(true)
    }, [response, dispatch])

    if (success) {
        return <Redirect to='/'/>
    }

    if (!user.isLoggedIn) {
        return <Redirect to='/login' />
    }






    return (
        <div className="settings-page">
            <div className="container">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">Your Settings</h1>
                    <form onSubmit={handleSubmit} className="ng-pristine ng-valid ng-touched">
                        <fieldset className="form-group">
                            <input
                                name='image'
                                className='form-control ng-untouched ng-pristine ng-valid'
                                type="text"
                                placeholder='URL of profile picture'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                name='username'
                                className='form-control form-control-lg ng-touched ng-pristine ng-valid'
                                type="text"
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea
                                name='bio'
                                className='form-control form-control-lg ng-untouched ng-pristine ng-valid'
                                rows="8"
                                placeholder='Short bio about you'
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                name='email'
                                className='form-control form-control-lg ng-untouched ng-pristine ng-valid'
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                name='password'
                                className='form-control form-control-lg ng-untouched ng-pristine ng-valid'
                                type="password"
                                placeholder='New Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                        <fieldset>
                            <button type='submit' className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                        </fieldset>
                    </form>
                    <hr/>
                    <button onClick={logout} className="btn btn-outline-danger">Logout</button>
                </div>
            </div>
        </div>
    )
}


export default Settings