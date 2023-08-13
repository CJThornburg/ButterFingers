export const thunkGetAllProfiles = () => async (dispatch) => {
    const response = await fetch("/api/users", {
        headers: {
            "Content-Type": "application/json",
        },
    });


    if (response.ok) {
        const usersData = await response.json();

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
            newState = { ...state };
            newState = { ...action.usersData.Users }
            return newState


        default:
            return state;
    }


}
