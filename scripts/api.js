import { bank } from './tokenBank.js'

//User actions
export const signUp = (data) => {
    return fetch(`https://audio-caddy-server.onrender.com/sign-up`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

export const signIn = (data) => {
	return fetch(`https://audio-caddy-server.onrender.com/sign-in`, {
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
    return fetch(`https://audio-caddy-server.onrender.com/records`, {
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
    return fetch(`https://audio-caddy-server.onrender.com/records`, {
        headers: {
            'Authorization': `Bearer ${bank.userToken}`
        }
    })
}

export const showRecord = (id) => {
    return fetch(`https://audio-caddy-server.onrender.com/records/${id}`, {
        headers: {
            'Authorization': `Bearer ${bank.userToken}`
        }
    })
}

export const updateRecord = (data, id) => {
    return fetch(`https://audio-caddy-server.onrender.com/records/${id}`, {
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
    return fetch(`https://audio-caddy-server.onrender.com/records/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${bank.userToken}`
        }
    })
}

//comment actions
export const createComment = (data) => {
    return fetch(`https://audio-caddy-server.onrender.com/comments`, {
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
    return fetch(`https://audio-caddy-server.onrender.com/comments/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bank.userToken}`
        },
        body: JSON.stringify(data)
    })
}