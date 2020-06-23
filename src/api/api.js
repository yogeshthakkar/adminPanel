import Axios from "axios"

export const api = async (endpoint, data, token, type) => {
    let response
    let mainURL = 'http://176.9.19.106:1337'
    let headers = { "x-auth": `${token}` }
    let headersWithContent = {
        "Content-Type": "application/json",
        "x-auth": `${token}`
    }
    let headersForImage = {
        "Content-Type": "multipart/form-data",
        "x-auth": `${token}`
    }
    // console.log(token);

    try {
        switch (type) {
            case 'get':
                response = await Axios.get(                    
                    `${mainURL}/${endpoint}`,
                    { headers }
                )
                break;
            case 'postPassWithoutToken':
                response = await Axios.post(
                    `${mainURL}/${endpoint}`,
                    data,
                    { headers }
                )
                break;
            case 'postImage':
                response = await Axios.post(
                    `${mainURL}/${endpoint}`,
                    data,
                    { headers:headersForImage }
                )
                break;
            case 'post':
                    response = await Axios.post(
                        `${mainURL}/${endpoint}`,
                        data,
                        { headers:headersWithContent }
                    )
                    break;
            case 'patch':
                response = await Axios.patch(
                    `${mainURL}/${endpoint}`,
                    data,
                    {
                        headers: headersWithContent
                    }
                )
                break;
            case 'delete':
                response = await Axios.delete(
                    `${mainURL}/${endpoint}`,
                    { headers }
                )
                break;
            default:
                console.log('Not mach any case');
                
                break;
        }
    } catch (error) {
        response = error.response

    }

    return response
}