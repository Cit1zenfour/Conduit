import React, {useContext, useEffect, useState} from "react";
import ArticleForm from "../../components/articleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";

const CreateArticle = () => {
    const apiUrl = '/articles'
    const [{response, error}, doFetch] = useFetch(apiUrl)
    const [user] = useContext(CurrentUserContext)
    const initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: []
    }
    const [success, setSuccess] = useState(false)

    const handleSubmit = (article) => {
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        if (!response) {
            return
        }

        setSuccess(true)


    }, [response])

    if (!user.isLoggedIn) {
        return <Redirect to='/' />
    }

    if (success) {
        return <Redirect to='/' />
    }

    // const [currentUserState] = useContext(CurrentUserContext)
    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    // const [body, setBody] = useState('')
    // const [tagList, setTagList] = useState('')
    // const [{response, error}, doFetch] = useFetch('/articles')
    // const [success, setSuccess] = useState(false)
    //
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     doFetch({
    //         method: 'post',
    //         data: {
    //             article: {
    //                 body,
    //                 description,
    //                 tagList,
    //                 title
    //             }
    //         }
    //     })
    // }
    //
    // useEffect(() => {
    //     if (!response) {
    //         return
    //     }
    //     setSuccess(true)
    // }, [response])
    //
    // if (!currentUserState.isLoggedIn) {
    //     return <Redirect to='/' />
    // }
    //
    // if (success) {
    //     return <Redirect to='/' />
    // }




    return (
        <div>
            <ArticleForm errors={(error && error.errors) || {}} initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    )
}


export default CreateArticle