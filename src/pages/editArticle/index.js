import React, {useContext, useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import ArticleForm from "../../components/articleForm";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";


const EditArticle = ({match}) => {
    const [user] = useContext(CurrentUserContext)
    const [success, setSuccess] = useState(false)
    const slug = match.params.slug
    const apiUrl = `/articles/${slug}`
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
    const [{response: updateArticleResponse, error: updateArticleError}, doUpdateArticle] = useFetch(apiUrl)
    const [initialValues, setInitialValues] = useState(null)


    const handleSubmit = (article) => {
        doUpdateArticle({
            method: 'put',
            data: {
                article
            }
        })

    }

    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if (!fetchArticleResponse) {
            return
        }

        setInitialValues({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList
        })

    }, [fetchArticleResponse])

    useEffect(() => {
        if (!updateArticleResponse) {
            return
        }

        setSuccess(true)
    }, [updateArticleResponse])

    if (success) {
        return <Redirect to='/' />
    }

    if (!user.isLoggedIn) {
        return <Redirect to='/login' />
    }


    return (
        <ArticleForm
            onSubmit={handleSubmit}
            errors={(updateArticleError && updateArticleError.errors) || {}}
            initialValues={initialValues}
        />
    )
}


export default EditArticle