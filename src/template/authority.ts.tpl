
export function clearAuthority(): void {
  return localStorage.removeItem('antd-pro-authority');
}

export function getToken(): string | null {
  return localStorage.getItem('fe-token');
}

export function setToken(authority: string ) {
  return localStorage.setItem('fe-token', authority);
}

export function clearToken(): void {
  return localStorage.removeItem('fe-token');
}

export function setUserInfo(userInfo: any): void {
  return localStorage.setItem('fe-userInfo', JSON.stringify(userInfo));
}
export function getUserInfo(): any {
  const userInfo:any = localStorage.getItem('fe-userInfo');
  return userInfo?JSON.parse(userInfo):null;
}
export function clearUserInfo(): void {
  return localStorage.removeItem('fe-userInfo');
}