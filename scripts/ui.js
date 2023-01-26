import { store } from './store.js'

const messageContainer = document.querySelector('#message-container')
const authContainer = document.querySelector('#auth-container')
const indexContainer = document.querySelector('#index-container')
const showRecordContainer = document.querySelector('#show-record-container')
const editRecordContainer = document.querySelector('#edit-record-container')

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
    store.userToken = userToken
    authContainer.classList.add('hide')
    indexContainer.classList.remove('hide')
}

//Record
export const onIndexRecordsSuccess = (records) => {
    records.forEach((record) => {
        const div = document.createElement('div')
        div.classList.add('record-card')
        div.innerHTML = `
            <h3>
                ${record.artist} ${record.album}
            </h3>
            <button type="button" class="btn show-btn" data-id="${record._id}">Show Record</button>
        `
        indexContainer.appendChild(div)
    })
}

export const onShowRecordSuccess = (record) => {
    indexContainer.classList.add('hide')
    showRecordContainer.classList.remove('hide')
    const div = document.createElement('div')
    div.classList.add('show-card')
    div.innerHTML = `
            <h2>Record</h2>
            <h3>${record.artist} ${record.album}</h3>
            <h3>${record.genre} ${record.condition}</h3>
            <h3>${record.printYear} ${record.owner}</h3>
            <p>${record.comments}</p>
            <button type="button" class="btn btn-update" data-id="${record._id}">Edit Record</button>
    `
    showRecordContainer.appendChild(div)
}

export const onEditButtonClick = (record) => {
    showRecordContainer.classList.add('hide')
    editRecordContainer.classList.remove('hide')
    const div = document.createElement('div')
    div.classList.add('edit-card')
    div.innerHTML = `
        <form data-id="${record._id}">
            <input class="form-control" type="text" name="artist" value="${record.artist}">
            <input class="form-control" type="text" name="album" value="${record.album}">
            <input class="form-control" type="text" name="genre" value="${record.genre}">
            <input class="form-control" type="number" name="printYear" value="${record.printYear}">
            <button type="submit" class="btn btn-update">Update Record</button>
        </form>    
            <button type="button" class="btn btn-delete">Delete Record</button>
    `
    editRecordContainer.appendChild(div)
}

export const onUpdateRecordSuccess = () => {
    messageContainer.innerText = 'You have successfully updated a Record'
}

export const onDeleteRecordSuccess = () => {
    messageContainer.innerText = 'You have successfully deleted a Record'
}



// ${record.genre} ${record.condition}
// ${record.printYear} ${record.owner}
// ${record.comments}

// <button type="button" class="btn btn-delete">Delete Record</button>