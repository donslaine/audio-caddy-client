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

const signUpContainer = document.getElementById('sign-up-container')
const signInContainer = document.getElementById('sign-in-container')
const showRecordContainer = document.getElementById('show-record-container')
const indexContainer = document.getElementById('index-container')
const editRecordContainer = document.getElementById('edit-record-container')
// const commentContainer = document.getElementById('comment-container')
const createButton = document.getElementById('create-button')
const authContainer = document.getElementById('auth-container')
const createContainer = document.getElementById('create-container')
const homeButton = document.getElementById('home-button')
// const mainContainer = document.getElementById('main-container')
// const deleteButton = document.getElementById('delete-button')
// const updateRecordButton = document.getElementById('update-record')
// const deleteRecordButton = document.getElementById('')

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
        .then(hideContainer(authContainer))
        .then(showContainer(indexContainer))
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
        .then(showContainer(showRecordContainer))
        .then(hideContainer(indexContainer))
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
        .then(showContainer(editRecordContainer))
        .then(hideContainer(showRecordContainer))
		.then((res) => {
			onEditButtonClick(res.record)
		})
		.catch(onFailure)
})

editRecordContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    while (editRecordContainer.firstChild) {
        editRecordContainer.removeChild(editRecordContainer.firstChild)
    }
    let target = event.target.getAttribute('id')
    // if (target === 'update-form') {
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
    // } 
})

// editRecordContainer.addEventListener('click', (event) => {
//     event.preventDefault()
//     let target = event.target.getAttribute('id')
//     if (target === 'delete-button') {
//         const id = event.target.getAttribute('data-id')
//         if(!id) return
//         deleteRecord(id)
//             .then(onDeleteRecordSuccess)
//             .then(indexRecord)
//             .then((res) => (res.json()))
//             .then((res) => onIndexRecordsSuccess(res.records))
//             .then(showContainer(indexContainer))
//             .then(hideContainer(editRecordContainer))
//             .catch(onFailure)
//     }
// })

createButton.addEventListener('click', () => {
    showContainer(createContainer)
    hideContainer(indexContainer)
    // hideContainer(showRecordContainer)
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
    hideContainer()
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

// var button = document.getElementById('button');
//     button.addEventListener('click', function(e) {
//         var target = e.target;
//        switch(target.id) { ///check which button was clicked by id
//               case 'button1':
//                     // do something
//                     break;
//                 case 'button2':
//                     // do something
//                     break;
//                 case 'button3':
//                     // do something
//                     break;
//                 case 'button4':
//                     // do something
//                     break;
//                     default:
//                     // do something
//                     break;
//        }
//     });