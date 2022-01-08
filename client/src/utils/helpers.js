const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatDate = (orgDate) => {
    var date = new Date(orgDate);
    let dayName = days[date.getDay()];
    let dayNum = date.getDate().toString();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    return `${dayName},  ${month} ${dayNum}, ${year}`;
}