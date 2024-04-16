
export interface PasswordRequestResetDto {
    email: string;
}

export interface PasswordResetDto {
    token: string
    password: string;
}