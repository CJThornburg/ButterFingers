export const thunkGetAllProfiles = () => async (dispatch) => {
    console.log("in the PROFILES thunk")
    const response = await fetch("/api/users", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response)

    if (response.ok) {
        const usersData = await response.json();
        console.log("DATA BEFORE PASSING TO ACTION", usersData)
        if (usersData.errors) {
            return;
        }

        dispatch(getUsers(usersData));
    }
}







const getUsers = (usersData) => {
    return {
        type: GET_USERS,
        usersData
    }
}





const GET_USERS = "USERS/GET_ALL"



let initialState = {}
export default function reducer(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
        case GET_USERS:
            newState = { ...action.usersData.Users }
            return newState

        // case POST_SCORE:
        //     newState[action.newScore.id] = action.newScore
        //     return newState;


        // // case EDIT_TEXT:
        // //     newState[action.editScore.id] = action.editScore
        // //     return newState
        // case DELETE_SCORE:


        //     delete newState[action.scoreId]
        //     return newState

        default:
            return state;
    }


}
