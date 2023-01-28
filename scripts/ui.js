import { bank } from './tokenBank.js'

const messageContainer = document.getElementById('message-container')
const authContainer = document.getElementById('auth-container')
const indexContainer = document.getElementById('index-container')
const showRecordContainer = document.getElementById('show-record-container')
const editRecordContainer = document.getElementById('edit-record-container')
const mainContainer = document.getElementById('main-container')
const createContainer = document.getElementById('create-container')


export const onFailure = (error) => {
    messageContainer.innerHTML = `
        <h3>You've encountered an error:</h3>
        <p>${error}</p>
    `
}

//User
export const onSignUpSuccess = () => {
    messageContainer.innerText = 'You have created a new user! Please Sign in'
}

export const onSignInSuccess = (userToken) => {
    messageContainer.innerHTML = ''
    bank.userToken = userToken
}

//Record
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
            <button type="button" id="delete-button" class="btn show-btn" data-id="${record._id}">Show Record</button>
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
        <button id="delete-comment" class="btn btn-update" data-id="${record._id}">Delete</button>
    `
    div.appendChild(comment)
    })
}

export const onEditButtonClick = (record) => {
    // showRecordContainer.classList.add('hide')
    // editRecordContainer.classList.remove('hide')
    
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
    indexContainer.classList.remove('hide')
    createContainer.classList.add('hide')
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
