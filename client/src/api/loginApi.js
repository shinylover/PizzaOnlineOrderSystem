
const baseURL = "/loginApi"

async function login(email, password) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {email: email, password: password} ),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve(user)
                })
            } else {
                response.json()
                    .then((error) =>{
                        reject(error)
                    })
                    .catch(()=>{
                        reject( {errors: [ {param: "Application", msg: "Cannot parse server response"} ]} )
                    } )
            }
        }).catch( () => {
            reject( {errors: [ {param: "Server", msg: "Cannot communicate"} ]} )
        } );
    })
}

async function logout() { // used to clear the cookies 
    return new Promise((resolve, reject) => {
        fetch( baseURL + '/logout', {
            method: 'POST',
        }).then((response) => {
            if (response.ok){
                resolve(null)
            } else {
                response.json()
                    .then((errors) => {
                        reject(errors)                        
                    }).catch(()=>{
                        reject({errors: [ {param: "Application", msg: "Cannot parse server response"} ]})
                    })
            }
        })
    })
}

async function isAuthenticated() { // check current account is authenticated or not for the cookie
    const response = await fetch(baseURL + "/user")
    const userJson = await response.json()
    if ( response.ok){
        return userJson;
    } else {
        throw {status: response.status, errObj: userJson};
    }
}

const LoginApi = {
    login,
    logout,
    isAuthenticated
}

export default LoginApi