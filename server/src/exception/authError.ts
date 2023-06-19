export default class AuthError extends Error {
	status
	errors
	constructor(status: number, message: string, errors = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static UnauthorizedError() {
		return new AuthError(401, 'User not authorized')
	}
	static BadRequest(message = '', errors = []) {
		return new AuthError(400, message, errors)
	}
}
