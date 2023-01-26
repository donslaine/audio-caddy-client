import {
    signUp,
    signIn,
    createRecord,
    indexRecord,
    showRecord,
    updateRecord,
    deleteRecord,
} from './api.js'

import {
    onFailure,
    onSignUpSuccess,
    onSignInSuccess,
    onIndexRecordsSuccess,
    
} from './ui.js'

const signUpContainer = document.querySelector('#sign-up-container')
const signInContainer = document.querySelector('#sign-in-container')

//User actions
signUpContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    const userData = {
        credentials: {
            email: event.target['email'].value,
            password: event.target['password'].value
        },
    }
    signUp(userData)
        .then(onSignUpSuccess)
        .catch(onFailure)
})

signInContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    const userData = {
        credentials: {
            email: event.target['email'].value,
            password: event.target['password'].value
        },
    }
    signIn(userData)
        .then((res) => res.json())
        .then((res) => onSignInSuccess(res.token))
        .then(indexRecord)
        .then((res) => res.json())
        .then((res) => onIndexRecordsSuccess(res.records))
        .catch(onFailure)
})