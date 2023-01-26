import { store } from './store.js'

//User actions
export const signUp = (data) => {
    return fetch(`http://localhost:8000/sign-up`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

export const signIn = (data) => {
	return fetch(`http://localhost:8000/sign-in`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

//Record actions
export const createRecord = (data) => {
    return fetch(`http://localhost:8000/records`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const indexRecord = () => {
    return fetch(`http://localhost:8000/records`, {
        headers: {
            'Authorization': `Bearer ${store.userToken}`
        }
    })
}

export const showRecord = (id) => {
    return fetch(`http://localhost:8000/records/${id}`, {
        headers: {
            'Authorization': `Bearer ${store.userToken}`
        }
    })
}

export const updateRecord = (data, id) => {
    return fetch(`http://localhost:8000/records/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const deleteRecord = (id) => {
    return fetch(`http://localhost:8000/records/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${store.userToken}`
        }
    })
}