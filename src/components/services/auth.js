import requester from './requester'
let auth = (() => {
    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
    }

    // user/login
    function login({username, password}) {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    }

    // user/register
    function register({username, password, password_confirm ,reg_genre, reg_email, reg_fullname}) {
        let userData = {
            username,
            password,
            password_confirm,
            reg_genre,
            reg_email,
            reg_fullname
        };

        return requester.post('user', '', 'basic', userData);
    }

    // user/logout
    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', logoutData);
    }
    function getUserInfo(){
        let data = {
            authtoken: sessionStorage.getItem('userId')
        }
        console.log(data)
        return requester.get('user','','kinvey' , data)
    }

    return {
        login,
        register,
        logout,
        saveSession,
        getUserInfo
    }
})();
export default auth;