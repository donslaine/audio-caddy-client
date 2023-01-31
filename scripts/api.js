import { bank } from './tokenBank.js'

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
            'Authorization': `Bearer ${bank.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const indexRecord = () => {
    return fetch(`http://localhost:8000/records`, {
        headers: {
            'Authorization': `Bearer ${bank.userToken}`
        }
    })
}

export const showRecord = (id) => {
    return fetch(`http://localhost:8000/records/${id}`, {
        headers: {
            'Authorization': `Bearer ${bank.userToken}`
        }
    })
}

export const updateRecord = (data, id) => {
    return fetch(`http://localhost:8000/records/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bank.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const deleteRecord = (id) => {
    return fetch(`http://localhost:8000/records/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${bank.userToken}`
        }
    })
}

//comment actions
export const createComment = (data) => {
    return fetch(`http://localhost:8000/comments`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bank.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const deleteComment = (data, id) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bank.userToken}`
        },
        body: JSON.stringify(data)
    })
}