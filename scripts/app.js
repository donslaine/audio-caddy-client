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
    onShowRecordSuccess,
    onEditButtonClick,
    onUpdateRecordSuccess
} from './ui.js'

const signUpContainer = document.querySelector('#sign-up-container')
const signInContainer = document.querySelector('#sign-in-container')
const showRecordContainer = document.querySelector('#show-record-container')
const indexContainer = document.querySelector('#index-container')
const editRecordContainer = document.querySelector('#edit-record-container')
const commentContainer = document.querySelector('#comment-container')

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

indexContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')

	if (!id) return

	showRecord(id)
		.then((res) => res.json())
		.then((res) => {
			onShowRecordSuccess(res.record)
		})
		.catch(onFailure)
})

showRecordContainer.addEventListener('click', (event) => {
    const id = event.target.getAttribute('data-id')

    if (!id) return

    showRecord(id)
		.then((res) => res.json())
		.then((res) => {
			onEditButtonClick(res.record)
		})
		.catch(onFailure)
})

editRecordContainer.addEventListener = ('submit', (event) => {
    event.preventDefault()
    const id = event.target.getAttribute('data-id')

    if (!id) return

    const recordData = {
        record: {
            artist: event.target['artist'].value,
            album: event.target['album'].value,
            genre: event.target['genre'].value,
            condition: event.target['condition'].value
        },
    }
    updateRecord(recordData, id)
        .then(onUpdateRecordSuccess)
        .catch(onFailure)
})