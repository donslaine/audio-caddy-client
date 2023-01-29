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
    onDeleteCommentSuccess,
    showContainer,
    hideContainer,
} from './ui.js'

const messageContainer = document.getElementById('message-container')
const signUpContainer = document.getElementById('sign-up-container')
const signInContainer = document.getElementById('sign-in-container')
const showRecordContainer = document.getElementById('show-record-container')
const indexContainer = document.getElementById('index-container')
const editRecordContainer = document.getElementById('edit-record-container')
const createButton = document.getElementById('create-button')
const authContainer = document.getElementById('auth-container')
const createContainer = document.getElementById('create-container')
const homeButton = document.getElementById('home-button')

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
        .then(hideContainer(authContainer))
        .then(showContainer(indexContainer))
        .catch(onFailure)
})

indexContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')
    const target = event.target.getAttribute('id')
	if (!id) return
    while (showRecordContainer.firstChild) {
        showRecordContainer.removeChild(showRecordContainer.firstChild)
    }
    if (target === 'show-button') {
        showRecord(id)
            .then((res) => res.json())
            .then((res) => {onShowRecordSuccess(res.record)})
            .then(showContainer(showRecordContainer))
            .then(hideContainer(indexContainer))
            .catch(console.error)
    } else if (target === 'delete-button') {
        deleteRecord(id)
            .then(onDeleteRecordSuccess)
            .then(indexRecord)
            .then((res) => (res.json()))
            .then((res) => onIndexRecordsSuccess(res.records))
            .then(showContainer(indexContainer))
            .then(hideContainer(editRecordContainer))
            .catch(onFailure)
    }
})

showRecordContainer.addEventListener('click', (event) => {
    const id = event.target.getAttribute('data-id')
    if (!id) return
    showRecord(id)
		.then((res) => res.json())
        .then((res) => {onEditButtonClick(res.record)})
        .then(showContainer(editRecordContainer))
        .then(hideContainer(showRecordContainer))
		.catch(console.error)
})

editRecordContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    while (editRecordContainer.firstChild) {
        editRecordContainer.removeChild(editRecordContainer.firstChild)
    }
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
        .then(indexRecord)
        .then((res) => (res.json()))
        .then((res) => onIndexRecordsSuccess(res.records))
        .then(showContainer(indexContainer))
        .then(hideContainer(editRecordContainer))
        .catch(onFailure)
})

createButton.addEventListener('click', () => {
    showContainer(createContainer)
    hideContainer(indexContainer)
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
        .then(indexRecord)
        .then((res) => (res.json()))
        .then((res) => onIndexRecordsSuccess(res.records))
        .then(showContainer(indexContainer))
        .then(hideContainer(createContainer))
        .catch(onFailure)
})

homeButton.addEventListener('click', () => {
    showContainer(indexContainer)
    if (createContainer.classList[0] !== 'hide') {
        hideContainer(createContainer)
    } else if (showRecordContainer.classList[0] !== 'hide') {
        hideContainer(showRecordContainer)
    } else if (editRecordContainer.classList[0] !== 'hide') {
        hideContainer(editRecordContainer)
    }
    messageContainer.innerText = ''
    indexRecord()
        .then((res) => (res.json()))
        .then((res) => onIndexRecordsSuccess(res.records))
        .catch(onFailure)
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
        .then(indexRecord)
        .then((res) => (res.json()))
        .then((res) => onIndexRecordsSuccess(res.records))
        .then(showContainer(indexContainer))
        .then(hideContainer(showRecordContainer))
        .catch(console.error)
})