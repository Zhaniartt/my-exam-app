import requester from './requester'
let recipesService = (() => {

    function loadRooms() {
        return requester.get('appdata', 'rooms', 'kinvey');
    }

    function loadRecipeDetails(recipeId) {
        return requester.get('appdata', 'recipes/' + recipeId, 'kinvey');
    }
    function loadUSer(userId) {
        return requester.get('user', + userId , 'kinvey');
    }

    function createRecipe(name, password, message, creator, service, email) {
   
        let roomData = {
            name,
            password,
            message,
            creator,
            service,
            email
        };
        console.log(roomData)
        return requester.post('appdata', 'rooms', 'kinvey', roomData);
    }
    function messageImport(message , roomId) {
   
        let roomData = {
           message,
           roomId
        };
        console.log(roomData)
        return requester.post('appdata', 'allMssgs', 'kinvey', roomData);
    }

    function deleteMsg(recipeId){
        console.log(recipeId)
        return requester.remove('appdata','allMssgs/' + recipeId, 'kinvey');
    }
    function deleteRooms(roomId){
        return requester.remove('appdata','rooms/' + roomId, 'kinvey');

    }

    return {
        loadRooms,
        loadRecipeDetails,
        createRecipe,
        deleteMsg,
        messageImport,
        loadUSer,
        deleteRooms,
        messageImport
    }
})()
export default recipesService