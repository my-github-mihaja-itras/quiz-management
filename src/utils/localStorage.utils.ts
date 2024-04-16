export function getLocalStorageItem(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
}

export function setLocalStorageItem(key: string, item: any ) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, item)
  }
}

export function removeLocalStorageItem(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

export function verifyItemLocalStorage() {
    const itemString = getLocalStorageItem('loginAccessToken');
    const timeExpiring = getLocalStorageItem("loginAccessTokenExpiration");
  
    if (!itemString || !timeExpiring) {
      return null;
    }
  
    const now = new Date();
  
    if (now < new Date(timeExpiring)) {
      removeLocalStorageItem('loginAccessToken');
      removeLocalStorageItem("loginAccessTokenExpiration");
    }
  }
  setInterval(verifyItemLocalStorage, 3600000);