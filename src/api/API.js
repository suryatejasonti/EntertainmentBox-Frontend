import {history} from "../App";
import app from '../firebase';
import axios from 'axios';

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';


const headers = {
    'Accept': 'application/json'
};
//checklogin
export const check = () =>
    fetch(`${api}/ad/check`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        //body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
//checklogin
export const getSearchedMoviesAdmin = (term) =>
    fetch(`${api}/admin/movieSearch?term=${term}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        //body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
//adminSignUp
export const SignUp = (values) => {
    app.auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(function(user){
      if(user && user.emailVerified === false){
        user.sendEmailVerification().then(function(){
          console.log("email verification sent to user");
        });
      }
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });
}


//adminSignin
export const getMovieOverview = (tmdbid) =>
    fetch(`${api}/movies/getMovieOverview?tmdbid=${tmdbid}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        //body: JSON.stringify(values)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//adminSignin
export const updateEditedMovieAdmin = (values) =>
    fetch(`${api}/admin/saveMovie`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//adminSignin
export const searchUsers = (values) =>

    fetch(`${api}/user/searchusers?user=${values}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//checklogin
export const getRevenue = () =>
    fetch(`${api}/ad/getRevenue`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        //body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


//getBills
export const getBills = (value) =>

    fetch(`${api}/admin/bills?date=${value}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then(res => {
        //console.log(res.json());
        // console.log(res.json())
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


//getBillsMonth
export const getBillsMonth = (value) =>

    fetch(`${api}/admin/billMonth?date=${value}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then(res => {
        //console.log(res.json());
        // console.log(res.json())
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


//signOut
// export function signoutMovieHall(values) {
//     console.log(values);
//
//     return (dispatch) => {
//         const response = axios.get(`${ROOT_URL}/user/signout`,{withCredentials: true})
//             .then(response => {
//                 console.log(response.data);
//                 window.localStorage.clear();
//                 history.push('/moviehallSignin');
//                 dispatch(() => {
//                     return {
//                         type: SIGN_OUT,
//                         payload: response
//                     }
//                 })
//             }).catch(error => {
//                 console.log(error);
//             });
//     }
// }


export const signOut = () =>
    {
        app.auth().signOut().then(function() {
            alert("signout success");
          }).catch(function(error) {
            alert("singout unsuccess");
          });
    }


// export function fetchUser() {
//     return function (dispatch) {
//         let rtype = null;
//         let dtype = null;
//         const request = axios.get(`${api}/user/fetchuser`, {withCredentials: true});
//         request.then(function (res) {
//             if (res.status == 201) {
//                 console.log('response received', res);
//                 dtype = request;
//                 dispatch({type: FETCH_USER, payload: res.data});
//             }
//             else {
//                 dtype = request;
//                 dispatch({type: FETCH_USER_NULL, payload: res.data});
//             }

//         });
//         request.catch(function (err) {
//             localStorage.setItem('user', err.user);
//             dtype = {message: 'error received'};
//             console.log("error:", err);
//         });

//     }
// }

export const fetchUser = () =>
    fetch(`${api}/user/fetchuser`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then(res => {
        console.log("here")
        console.log()
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


