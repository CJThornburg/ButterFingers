export const thunkGetAllFriends = () => async (dispatch) => {

    const response = await fetch("/api/friends/", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const friendsData = await response.json();
        if (friendsData.errors) {
            return;
        }
        dispatch(getFriends(friendsData));
    }
}


const GET_FRIENDS = "FRIENDS/GET_ALL"



const getFriends = (friendsData) => {
    return {
        type: GET_FRIENDS,
        friendsData
    }
}



let initialState = {}



export default function reducer(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
        case GET_FRIENDS:
            newState = { ...action.friendsData.Friends }
            return newState

        default:
            return state;
    }


}
