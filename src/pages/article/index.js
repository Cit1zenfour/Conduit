import React, {useContext, useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import {Link, Redirect} from "react-router-dom";
import TagList from "../../components/tagList";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/errorMessage";
import {CurrentUserContext} from "../../contexts/currentUser";

const Article = ({match}) => {
    const [success, setSuccess] = useState(false)
    const [user] = useContext(CurrentUserContext)
    const slug = match.params.slug
    const apiUrl = `/articles/${slug}`
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
    const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl)

    const deleteArticle = () => {
        doDeleteArticle({
            method: 'delete'
        })
    }

    const isAuthor = () => {
        if (!response || !user.isLoggedIn) {
            return false
        }
        if (response) {
            return user.currentUser.username === response.article.author.username
        }
    }
    console.log(isAuthor())

    useEffect(() => {
        doFetch()
    }, [doFetch, slug])

    useEffect(() => {
        if (!deleteArticleResponse) {
            return
        }
        setSuccess(true)

    }, [deleteArticleResponse])

    if (success) {
        return <Redirect to='/' />
    }


    return (
        <div className="article-page">
            <div className="banner">
                {response && (
                    <div className="container">
                        <h1>{response.article.title}</h1>
                        <div className="article-meta">
                            <Link to={`profiles/${response.article.author.username}`}>
                                <img src={response.article.author.image} alt="author-pic"/>
                            </Link>
                            <div className="info">
                                <Link to={`profiles/${response.article.author.username}`} className='author'>
                                    {response.article.author.username}
                                </Link>
                                <span className="date">{response.article.createdAt}</span>
                            </div>
                            {isAuthor() && (
                                <span>
                                    <Link to={`/articles/${response.article.slug}/edit`} className='btn btn-outline-secondary btn-sm'>
                                        <i className="ion-edit">
                                            Edit Article
                                        </i>
                                    </Link>
                                    <button
                                        onClick={deleteArticle}
                                        className='btn btn-outline-danger btn-sm'>
                                        <i className="ion-trash-a">
                                            Delete Article
                                        </i>
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>)}
            </div>
            {isLoading && <Loading/>}
            {error && <ErrorMessage/>}
            {response && (<div className="container page">
                <div className="row article-content">
                    <div className="col-xs-12">
                        <div>
                            <p>{response.article.body}</p>
                        </div>
                        <TagList tags={response.article.tagList}/>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Article