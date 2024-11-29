export interface LoginReqBody {
    // user?: string,
    email: string,
    password: string
}

export interface decodedToken {
    id: number,
    iat: number,
    exp: number
}