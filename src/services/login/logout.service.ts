export async function logoutService() {
    await localStorage.removeItem("loginAccessToken");
    await localStorage.removeItem("loginAccessTokenExpiration");
    await localStorage.removeItem("menu");
} 