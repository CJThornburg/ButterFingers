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

export const thunkCreateFriendRelationship = (toUser) => async (dispatch) => {
    const response = await fetch(`/api/friends/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            toUser
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(postFriends(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }

}

const GET_FRIENDS = "FRIENDS/GET_ALL"
const POST_FRIENDS = "FRIENDS/NEW"


const getFriends = (friendsData) => {
    return {
        type: GET_FRIENDS,
        friendsData
    }
}

const postFriends = (newFriendship) => {
    return {
        type: POST_FRIENDS,
        newFriendship ,
    };
};



let initialState = {}



export default function reducer(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
        case GET_FRIENDS:
            newState = { ...action.friendsData.Friends }
            return newState

        case POST_FRIENDS:
            newState[action.newFriendship.id] = action.newFriendship
            return newState


        default:
            return state;
    }


}
