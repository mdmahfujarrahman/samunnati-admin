const useAuth = () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    let auth;
    let user;
    if(token && userData){
        auth = token;
        user = userData;
    }
    return {auth, user}
}

export default useAuth;