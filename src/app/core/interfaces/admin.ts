export interface AdminData {
  email    : string,
  password : string
}

export interface AdminInterface {
  idToken      : string,
  email        : string,
  refreshToken : string,
  expiresIn    : string,
  localId      : string
}