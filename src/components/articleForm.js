import React, {useEffect, useState} from "react";
import BackendErrors from "../pages/createArticle/components/BackendErrors";


const ArticleForm = ({onSubmit, errors, initialValues}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const [tagList, setTagList] = useState('')

    useEffect(() => {
        if (!initialValues) {
            return
        }
        setTitle(initialValues.title)
        setDescription(initialValues.description)
        setBody(initialValues.body)
        setTagList(initialValues.tagList.join(' '))

    }, [initialValues])


    const handleSubmit = (event) => {
        event.preventDefault()
        const article = {
            title,
            body,
            description,
            tagList
        }
        onSubmit(article)
    }

    return (
        <div className="editor-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        {errors && <BackendErrors error={errors} />}
                        <form onSubmit={handleSubmit} className='ng-pristine ng-valid ng-touched'>
                            <fieldset className="form-group">
                                <input
                                    name='title'
                                    type="text"
                                    className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                                    placeholder='Article Title'
                                    value={title}
                                    onChange={((e) => setTitle(e.target.value))}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    name='description'
                                    type="text"
                                    className="form-control ng-untouched ng-pristine ng-valid"
                                    placeholder='Whats this article about?'
                                    value={description}
                                    onChange={((e) => setDescription(e.target.value))}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <textarea
                                    name="body"
                                    className='form-control ng-touched ng-pristine ng-valid'
                                    rows="8"
                                    placeholder='Write your article (in markdown)'
                                    value={body}
                                    onChange={((e) => setBody(e.target.value))}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    name='tags'
                                    type="text"
                                    className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                                    placeholder='Enter Tags'
                                    value={tagList}
                                    onChange={((e) => setTagList(e.target.value))}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <button type='submit' className="btn btn-lg pull-xs-right-btn-primary">Publish Article</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleForm