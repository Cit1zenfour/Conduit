import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {CurrentUserContext} from "../contexts/currentUser";

const FeedToggler = ({tagName}) => {
    const [currentUserState] = useContext(CurrentUserContext)


    return (
        <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
                {currentUserState.isLoggedIn && (<li className="nav-item">
                    <NavLink to='/feed' className='nav-link'>Your feed</NavLink>
                </li>)}
                <li className="nav-item">
                    <NavLink exact to='/' className='nav-link'>Global feed</NavLink>
                </li>
                {tagName && (
                    <li className="nav-item">
                        <NavLink exact to={`/tags/${tagName}`} className='nav-link'>
                            <i className="ion-pound">
                                {tagName}
                            </i>
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default FeedToggler