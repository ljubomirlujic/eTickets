export const DateTimeFormater = {
    formatDate,
    formatTime,
    splitDateAndTime

}

function splitDateAndTime(dateTime) {
    const splitedDateTime = dateTime.replace("T", " ");
    return splitedDateTime;
}

function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
        month: "long",
    });
}

function formatDate(dateString) {
    let date = splitDateAndTime(dateString)
    var allDate = date.split(" ");
    var thisDate = allDate[0].split("-");
    var newDate = [thisDate[2], toMonthName(thisDate[1]), thisDate[0]].join(
        " "
    );


    return newDate;
}

function formatTime(dateString) {
    let date = splitDateAndTime(dateString)
    var allDate = date.split(" ");
    var thisTime = allDate[1].split(":");

    var suffix = thisTime[0] >= 12 ? "PM" : "AM";
    var hour = thisTime[0] > 12 ? thisTime[0] - 12 : thisTime[0];
    hour = hour < 10 ? "0" + hour : hour;
    var min = thisTime[1];
    var newTime = hour + ":" + min + suffix;

    return newTime;
}