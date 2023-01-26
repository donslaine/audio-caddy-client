import { store } from './store.js'

const messageContainer = document.querySelector('#message-container')
const authContainer = document.querySelector('#auth-container')
const indexContainer = document.querySelector('#index-container')

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



// ${record.genre} ${record.condition}
// ${record.printYear} ${record.owner}
// ${record.comments}