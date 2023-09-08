
export const thunkDeleteText = (scoreId) => async (dispatch) => {
    let response = await fetch(`/api/scores/${scoreId}`, {
        method: "DELETE"
    });
    response = await response.json()

    dispatch(deleteScore(scoreId)
    )
    return response
}







export const thunkCreateScore = (textId, time, mistakes, kpm, runExp, userId) => async (dispatch) => {
    const response = await fetch(`/api/scores/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            textId,
            time,
            mistakes,
            kpm,
            runExp,
            userId
        }),
    });


    // const response2 = await fetch(`/api/KSPMupdate`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });



    if (response.ok ) {
        const data = await response.json();
        dispatch(postScore(data))
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





export const thunkGetAllScores = () => async (dispatch) => {

    const response = await fetch("/api/scores/", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const scoreData = await response.json();
        if (scoreData.errors) {
            return;
        }
        dispatch(getScores(scoreData));
    }
}




// happens after score was submitted
// export const thunkUpdateKSPM = () => async (dispatch) => {
//     const response = await fetch(`/api/KSPMupdate`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(editText(data));
//         return data;
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data.errors;
//         }
//     } else {
//         return ["An error occurred. Please try again."];
//     }
// };




const POST_SCORE = "SCORE/PostText";
const GET_SCORES = "SCORE/GET_ALL"
const DELETE_SCORE = "SCORE/delete";







const postScore = (newScore) => {
    return {
        type: POST_SCORE,
        newScore,
    };
};


const getScores = (ScoresData) => {
    return {
        type: GET_SCORES,
        ScoresData
    }
}

const deleteScore = (scoreId) => {
    return {
        type: DELETE_SCORE,
        scoreId,
    };
};



let initialState = {}
export default function reducer(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
        case GET_SCORES:
            newState = { ...action.ScoresData.Scores }
            return newState

        case POST_SCORE:
            newState[action.newScore.id] = action.newScore
            return newState;


        // case EDIT_TEXT:
        //     newState[action.editScore.id] = action.editScore
        //     return newState
        case DELETE_SCORE:


            delete newState[action.scoreId]
            return newState

        default:
            return state;
    }


}
