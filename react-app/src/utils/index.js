export const getLevel = (exp) => {

    // TODO this is just a place holder, want to make one a bit more dynamic
    // TODO like doesn't double and is endless
    if (exp < 200) {
        return 0
    } else if(exp < 400) {
        return 1
    } else if(exp < 800) {
        return 2
    }
    else if(exp < 1600) {
        return 3
    }
    else if(exp < 3200) {
        return 4
    }
    else if(exp < 6400) {
        return 5
    }
    else if(exp < 12800) {
        return 6
    }
    else if(exp < 25600) {
        return 7
    }
    else if(exp < 51200) {
        return 8
    }
    else if(exp < 102400) {
        return 9
    }
    else if(exp < 204500) {
        return 10
    }
    else if(exp < 409600) {
        return 11
    }
    else if(exp < 819200) {
        return 12
    }
    else if(exp < 1638400) {
        return 13
    }
    else if(exp < 3276800) {
        return 14
    }
    else if(exp < 6553600) {
        return 15
    }
    else if(exp < 13107200) {
        return 16
    }


}


export const jsTimeFormatter =() => {
    const currentDate = new Date();


    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    const formattedDate = `${daysOfWeek[currentDate.getUTCDay()]}, ${currentDate.getUTCDate()} ${monthsOfYear[currentDate.getUTCMonth()]} ${currentDate.getUTCFullYear()} ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}:${currentDate.getUTCSeconds()} GMT`;


    return formattedDate

}



export const jsDMYDateFormatter = (dateString) => {

    console.log(dateString)
    if (!dateString) {
        return dateString
    }

    const dateParts = dateString.split(" "); // Split the string by spaces

const day = dateParts[1]; // Get the day part (e.g., "18")
const month = dateParts[2]; // Get the month part (e.g., "Aug")
const year = dateParts[3]; // Get the year part (e.g., "2023")

const formattedDate = `${day} ${month} ${year}`;

return formattedDate
}



export const disablePaste = (e) => {
    // !!!! cheat cheating anti-cheat
    e.preventDefault(); // no cheating >:(
  };
// pairs with :
// onPaste={(e)=> disablePaste(e)}
// on input fields attributes
