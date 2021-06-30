import React, {useContext, useEffect, useState} from "react";
import useFetch from "../hooks/useFetch";
import {CurrentUserContext} from "../contexts/currentUser";

const IsFavorited = ({favorite, favoriteCount, slug}) => {
    const [user] = useContext(CurrentUserContext)
    const apiUrl = `/articles/${slug}/favorite`
    const [{response}, doFetch] = useFetch(apiUrl)
    const favCountWithResponse = response
    ? response.article.favoritesCount
        : favoriteCount
    const isFavoriteWithResponse = response
    ? response.article.favorited
        : favorite

    const style = isFavoriteWithResponse ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'

    console.log(user)

    const handleLike = (event) => {
        event.preventDefault()
        doFetch({
            method: isFavoriteWithResponse ? 'delete' : 'post',
        })
    }

    if (!user.isLoggedIn) {
        return null
    }


    return (
        <button onClick={handleLike} className={style}>
            <i className="ion-heart"></i>
            <span>&nbsp; {favCountWithResponse}</span>
        </button>
    )
}

export default IsFavorited