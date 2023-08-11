



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
        return null
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
    const response = await fetch("api/texts", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    // console.log(response)

    if (response.ok) {
        const textData = await response.json();
        // console.log("DATA BEFORE PASSING TO ACTION", userReviewsData)
        if (textData.errors) {
            return;
        }

        dispatch(getTexts(textData));
    }
}



const POST_Text = "TEXTS/PostText";
const GET_Texts = "TEXTS/GET_ALL"
const DELETE_TEXT = "TEXTS/delete";








const postText = (newText) => {
    return {
        type: POST_Text,
        newText,
    };
};


const getTexts = (TextsData) => {
    return {
        type: GET_Texts,
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
        case GET_Texts:

            newState = { ...action.TextsData.texts }

            return newState




        // case POST_Text:
        //         // !!! NEED TO FIX THIS
        //     return { user: action.payload };


        case DELETE_TEXT:
            console.log(newState)
            // delete newState.texts[action.textId]

            return newState

        default:
            return state;
    }


}
