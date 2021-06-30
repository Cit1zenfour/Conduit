import {useEffect, useState, useCallback} from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";


const useFetch = (url) => {
    const baseURL = 'https://conduit.productionready.io/api'
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState()
    const [token] = useLocalStorage('token')

    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
    }, [])

    useEffect(() => {
        let skipGetResponseAfterDestroy = false
        if (!isLoading) {
            return
        }
        const requestOptions = {
            ...options,
            ...{
                headers: {
                    authorization: token ? `Token ${token}` : ''
                }
            }
        }
        axios(baseURL + url, requestOptions)
            .then(res => {
                if (!skipGetResponseAfterDestroy) {
                    setIsLoading(false)
                    setResponse(res.data)
                }
            })
            .catch(error => {
                if (!skipGetResponseAfterDestroy) {
                    setIsLoading(false)
                    setError(error.response.data)
                }
            })
        return () => {
            skipGetResponseAfterDestroy = true
        }
    }, [isLoading, url, options, token])


    return [{isLoading, response, error}, doFetch]


}


export default useFetch