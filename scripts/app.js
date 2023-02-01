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

// DOM variable declarations
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

// This code binds the signUp api call to a Sign Up button
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

// This code binds the signIn api call to a Sign In button
signInContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    homeButton.removeAttribute('style')
    createButton.removeAttribute('style')
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

// This delegates the different buttons in the index container to either 'show' or 'delete'
indexContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')
    const target = event.target.getAttribute('id')
	if (!id) return
    while (showRecordContainer.firstChild) {
        showRecordContainer.removeChild(showRecordContainer.firstChild)
    }
    // condition for show button 
    if (target === 'show-button') {
        showRecord(id)
            .then((res) => res.json())
            .then((res) => {onShowRecordSuccess(res.record)})
            .then(showContainer(showRecordContainer))
            .then(hideContainer(indexContainer))
            .catch(onFailure)
    // condition for delete button
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

// This delegates the different buttons in the show container to either 'edit' or 'add comment' or 'delete comment'
showRecordContainer.addEventListener('click', (event) => {
    event.preventDefault()
    // condition for edit record button
    if (event.target.classList.contains('btn-update')) {
        const id = event.target.getAttribute('data-id')
        if (!id) return
        showRecord(id)
            .then((res) => res.json())
            .then((res) => {onEditButtonClick(res.record)})
            .then(showContainer(editRecordContainer))
            .then(hideContainer(showRecordContainer))
            .catch(onFailure)
    // condition for delete comment button click
    } else if (event.target.classList.contains('btn-delete-comment')) {
        const commentId = event.target.getAttribute('data-comment')
        const recordId = event.target.getAttribute('data-id')
        const commentData = {
            comment: {
                recordId: recordId
            }
        }
        deleteComment(commentData, commentId)
            .then(onDeleteCommentSuccess)
            .then(indexRecord)
            .then((res) => (res.json()))
            .then((res) => onIndexRecordsSuccess(res.records))
            .then(showContainer(indexContainer))
            .then(hideContainer(showRecordContainer))
            .catch(onFailure)
    // condition for add comment button
    } else if (event.target.classList.contains('btn-create')) {
        const id = event.target.getAttribute('data-id')
        const commentBox = document.getElementById('comment-form')
        const commentData = {
            comment: {
                body: commentBox.value,
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
            .catch(onFailure)
    }
})

// this binds the button in the update container to the 'update' functions
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

// this handles the showing and hiding of containers when the 'create' button is clicked
createButton.addEventListener('click', () => {
    showContainer(createContainer)
    hideContainer(indexContainer)
    hideContainer(showRecordContainer)
    hideContainer(editRecordContainer)
    messageContainer.innerText = ''
})

// this binds the button in the create container to the 'create' api call
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

// this handles the showing and hiding of containers when the 'home' button is clicked
homeButton.addEventListener('click', () => {
    showContainer(indexContainer)
    hideContainer(createContainer)
    hideContainer(showRecordContainer)
    hideContainer(editRecordContainer)
    messageContainer.innerText = ''
    indexRecord()
        .then((res) => (res.json()))
        .then((res) => onIndexRecordsSuccess(res.records))
        .catch(onFailure)
})