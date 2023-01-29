import { bank } from './tokenBank.js'

import { 
    indexRecord,
    deleteComment
} from './api.js'

const messageContainer = document.getElementById('message-container')
// const authContainer = document.getElementById('auth-container')
const indexContainer = document.getElementById('index-container')
const showRecordContainer = document.getElementById('show-record-container')
const editRecordContainer = document.getElementById('edit-record-container')
const showCommentContainer = document.getElementById('show-comment-container')
// const mainContainer = document.getElementById('main-container')
// const createContainer = document.getElementById('create-container')

// failure
export const onFailure = (error) => {
    messageContainer.innerHTML = `
        <h3>You've encountered an error:</h3>
        <p>${error}</p>
    `
}

// User
export const onSignUpSuccess = () => {
    messageContainer.innerText = 'You have created a new user! Please Sign in'
}

export const onSignInSuccess = (userToken) => {
    messageContainer.innerHTML = ''
    bank.userToken = userToken
}

// Record/comment
export const commentDeleter = (event) => {
    event.preventDefault()
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
}

export const onIndexRecordsSuccess = (records) => {
    const innerContainer = document.createElement('div')
    while (indexContainer.firstChild) {
        indexContainer.removeChild(indexContainer.firstChild)
    }
    records.forEach((record) => {
        const div = document.createElement('div')
        div.classList.add('record-card')
        div.innerHTML = `
            <h3>${record.artist}</h3>
            <h3>${record.album}</h3>
            <button type="button" id="show-button" class="btn show-btn" data-id="${record._id}">Show Record</button>
            <button type="button" id="delete-button" class="btn btn-delete" data-id="${record._id}">Delete Record</button>
        `
        innerContainer.appendChild(div)
    })
    indexContainer.appendChild(innerContainer)
}

export const onShowRecordSuccess = (record) => {
    const div = document.createElement('div')
    div.classList.add('show-card')
    div.innerHTML = `
        <h2>Record</h2>
        <h3>Artist: ${record.artist}</h3> 
        <h3>Album: ${record.album}</h3>
        <h3>Genre(s): ${record.genre}</h3>
        <h3>Condition: ${record.condition}</h3>
        <h3>Print Year: ${record.printYear}</h3>
        <button type="button" class="btn btn-update" data-id="${record._id}">Edit Record</button>
        <hr>
        <form data-id="${record._id}">
            <input class="comment-form" type="text" name="body" placeholder="comment">
            <button type="submit" id="create-comment" class="btn btn-create">Create Comment</button>
        </form>
    `
    showRecordContainer.appendChild(div)
    const comments = record.comments;
    comments.forEach(element => {
        const comment = document.createElement('p')
        comment.classList.add('comment')
        comment.innerHTML = `
            <p>"${element.body}"</p>
            <button id="delete-comment" class="btn btn-update" data-id="${record._id}" data-comment="${element._id}">Delete</button>
        `
        showCommentContainer.appendChild(comment)
    })
    // const commentDelete = document.getElementById('delete-comment')
    // for (let i = 0; i < commentDelete.length; i++) {
    //     const oneComment = commentDelete[i]
    //     oneComment.addEventListener('click', commentDeleter)
    // }
    // console.log(deleteComment)
    // commentDelete.addEventListener('click', (event) => {
        // const target = event.target.getAttribute('id')
        // event.preventDefault()
        // const commentId = event.target.getAttribute('data-comment')
        // console.log(commentId)
        // const recordId = event.target.getAttribute('data-id')
        // console.log(recordId)
        // const commentData = {
        //     comment: {
        //         recordId: recordId
        //     }
        // }
        // deleteComment(commentData, commentId)
        //     .then(onDeleteCommentSuccess)
        //     .then(indexRecord)
        //     .then((res) => (res.json()))
        //     .then((res) => onIndexRecordsSuccess(res.records))
        //     .then(showContainer(indexContainer))
        //     .then(hideContainer(showRecordContainer))
        //     .catch(onFailure)
    // }
    // })

}

export const onEditButtonClick = (record) => {
    while (editRecordContainer.firstChild) {
        editRecordContainer.removeChild(editRecordContainer.firstChild)
    }
    const div = document.createElement('div')
    div.classList.add('edit-card')
    div.innerHTML = `
        <form data-id="${record._id}" id="update-form">
            <input class="update-form" type="text" name="artist" value="${record.artist}">
            <input class="update-form" type="text" name="album" value="${record.album}">
            <input class="update-form" type="text" name="genre" value="${record.genre}">
            <input class="update-form" type="text" name="condition" value="${record.condition}">
            <input class="update-form" type="number" name="printYear" value="${record.printYear}">
            <button data-id="${record._id}" type="submit" id="update-button" class="btn btn-update">Update Record</button>
        </form>    
    `
    editRecordContainer.appendChild(div)
}

export const onCreateRecordSuccess = () => {
    messageContainer.innerText = 'You have successfully created a Record'
}

export const onUpdateRecordSuccess = () => {
    messageContainer.innerText = 'You have successfully updated a Record'
}

export const onDeleteRecordSuccess = () => {
    messageContainer.innerText = 'You have successfully deleted a Record'
}

export const onCreateCommentSuccess = () => {
    messageContainer.innerText = 'You have successfully created a Comment'
}

export const onDeleteCommentSuccess = () => {
    messageContainer.innerText = 'You have successfully deleted a Comment'
}

export const hideContainer = (container) => {
    container.classList.add('hide')
}

export const showContainer = (container) => {
    container.classList.remove('hide')
}
