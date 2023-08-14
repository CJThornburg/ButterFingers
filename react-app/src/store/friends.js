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


// TODO reduce edits down to one, will need to change backend too, pass in "accept/reject/un-do-reject" so backend can also just have one function to handle all three
export const thunkAcceptFriend = (username) => async (dispatch) => {
    const response = await fetch(`/api/friends/${username}/accept`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addFriend(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};


export const thunkRejectFriend = (username) => async (dispatch) => {
    const response = await fetch(`/api/friends/${username}/reject`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

    });

    if (response.ok) {
        const data = await response.json();
        dispatch(rejectFriend(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const thunkUndoRejectFriend = (username) => async (dispatch) => {
    const response = await fetch(`/api/friends/${username}/undo-reject`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

    });

    if (response.ok) {
        const data = await response.json();
        dispatch(undoRejectFriend(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};




const GET_FRIENDS = "FRIENDS/GET_ALL"
const POST_FRIENDS = "FRIENDS/NEW"
const ADD_FRIEND = "FRIENDS/ADD"
const REJECT_FRIEND = "FRIENDS/REJECT"
const UNDO_REJECT_FRIEND = "FRIENDS/UN_REJECT"

const getFriends = (friendsData) => {
    return {
        type: GET_FRIENDS,
        friendsData
    }
}

const postFriends = (newFriendship) => {
    return {
        type: POST_FRIENDS,
        newFriendship,
    };
};

const addFriend = (acceptFriends) => {
    return {
        type: ADD_FRIEND,
        acceptFriends
    }
}
// TODO think this can also just be add friend cause its doing the same thing
const rejectFriend = (rejectFriends) => {
    return {
        type: REJECT_FRIEND,
        rejectFriends
    }
}

const undoRejectFriend = (undoRejectFriends) => {
    return {
        type: UNDO_REJECT_FRIEND,
        undoRejectFriends
    }
}


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

        case ADD_FRIEND:
            newState[action.acceptFriends.id] = action.acceptFriends
            return newState

        case REJECT_FRIEND:
            newState[action.rejectFriends.id] = action.rejectFriends
            return newState

        case UNDO_REJECT_FRIEND:
            newState[action.undoRejectFriends.id] = action.undoRejectFriends
            return newState

        default:
            return state;
    }


}
