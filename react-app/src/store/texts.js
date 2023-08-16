



export const thunkDeleteText = (textId) => async (dispatch) => {
    let response = await fetch(`/api/texts/${textId}`, {
        method: "DELETE"
    });
    response = await response.json()

    dispatch(deleteText(textId)
    )
    return response
}




export const thunkCreateText = (name, typingText) => async (dispatch) => {
    const response = await fetch(`/api/texts/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            typingText,
        }),
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(postText(data))
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


export const thunkGetAllTexts = () => async (dispatch) => {
    const response = await fetch("/api/texts", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const textData = await response.json();
        if (textData.errors) {
            return;
        }

        dispatch(getTexts(textData));
    }
}





export const thunkEditText = (name, typingText, textId) => async (dispatch) => {
    const response = await fetch(`/api/texts/${textId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            typingText,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editText(data));
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




const POST_TEXT = "TEXTS/PostText";
const GET_TEXT = "TEXTS/GET_ALL"
const DELETE_TEXT = "TEXTS/delete";
const EDIT_TEXT = "TEXTS/edit"


const editText = (editText) => {
    return {
        type: EDIT_TEXT,
        editText,
    };
};




const postText = (newText) => {
    return {
        type: POST_TEXT,
        newText,
    };
};


const getTexts = (TextsData) => {
    return {
        type: GET_TEXT,
        TextsData
    }
}

const deleteText = (textId) => {
    return {
        type: DELETE_TEXT,
        textId,
    };
};




let initialState = {}


export default function reducer(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
        case GET_TEXT:
            newState = { ...state };
            newState = { ...action.TextsData.texts }
            return newState

        case POST_TEXT:
            newState = { ...state };

            newState[action.newText.id] = action.newText
            return newState;


        case EDIT_TEXT:
            newState = { ...state };
            newState[action.editText.id] = action.editText
            return newState

        case DELETE_TEXT:
            newState = { ...state };

            delete newState[action.textId]
            return newState

        default:
            return state;
    }


}
