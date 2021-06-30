import React from "react";

const BackendErrors = ({error}) => {
    const {body, description, title} = error


    return (
            <ul className="error-messages">
                {title && (
                    title.map(el => <li>title {el}</li>)
                )}
                {description && (
                    description.map(el => <li>description {el}</li>)
                )}
                {body && (
                    body.map(el => <li>body {el}</li>)
                )}
            </ul>
    )
}


export default BackendErrors