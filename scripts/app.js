import {
    signUp,
    signIn,
    createRecord,
    indexRecord,
    showRecord,
    updateRecord,
    deleteRecord,
    createComment,
    deleteComment
} from './api.js'

import {
    onFailure,
    onSignUpSuccess,
    onSignInSuccess,
    onIndexRecordsSuccess,
    onShowRecordSuccess,
    onEditButtonClick,
    onUpdateRecordSuccess,
    onCreateRecordSuccess,
    onDeleteRecordSuccess,
    onCreateCommentSuccess,
    onDeleteCommentSuccess
} from './ui.js'

const signUpContainer = document.getElementById('sign-up-container')
const signInContainer = document.getElementById('sign-in-container')
const showRecordContainer = document.getElementById('show-record-container')
const indexContainer = document.getElementById('index-container')
const editRecordContainer = document.getElementById('edit-record-container')
// const commentContainer = document.getElementById('comment-container')
const createButton = document.getElementById('create-button')
// const authContainer = document.getElementById('auth-container')
const createContainer = document.getElementById('create-container')
const homeButton = document.getElementById('home-button')
const mainContainer = document.getElementById('main-container')
// const deleteButton = document.getElementById('delete-button')

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

// 
indexContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')

	if (!id) return
    while (showRecordContainer.firstChild) {
        showRecordContainer.removeChild(showRecordContainer.firstChild)
    }
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

editRecordContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const id = event.target.getAttribute('data-id')

    if (!id) return

    const recordData = {
        record: {
            artist: event.target['artist'].value,
            album: event.target['album'].value,
            genre: event.target['genre'].value,
            condition: event.target['condition'].value,
            printYear: event.target['printYear'].value
        },
    }
    updateRecord(recordData, id)
        .then(onUpdateRecordSuccess)
        .catch(onFailure) 
})

editRecordContainer.addEventListener('click', (event) => {
    event.preventDefault()
    const id = event.target.getAttribute('data-id')
    if(!id) return
    deleteRecord(id)
        .then(onDeleteRecordSuccess)
        .catch(onFailure)
})

createButton.addEventListener('click', () => {
    mainContainer.classList.add('hide')
    createContainer.classList.remove('hide')
})

createContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    const recordData = {
        record: {
            artist: event.target['artist'].value,
            album: event.target['album'].value,
            genre: event.target['genre'].value,
            condition: event.target['condition'].value,
            printYear: event.target['printYear'].value
        },
    }
    createRecord(recordData)
        .then(onCreateRecordSuccess)
        .catch(onFailure)
})

homeButton.addEventListener('click', () => {
    indexContainer.classList.remove('hide')
    mainContainer.classList.add('hide')
    createContainer.classList.add('hide')
})

//Comment actions
showRecordContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    const id = event.target.getAttribute('data-id')
    const commentData = {
        comment: {
            body: event.target['body'].value,
            recordId: id
        }
    }
    createComment(commentData)
        .then(onCreateCommentSuccess)
        .catch(onFailure)
})

// showRecordContainer.addEventListener('click', (event) => {
//     event.preventDefault()
//     const id = event.target.getAttribute('data-id')
//     const commentData = {
//         comment: {
//             recordId: id
//         }
//     }
//     deleteComment(commentData, id)
//         .then(onDeleteCommentSuccess)
//         .catch(onFailure)
// })