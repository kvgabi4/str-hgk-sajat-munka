const increaseDate = (date, days) => {
    return date.getTime() + days*24*60*60*1000;
}

const increaseAndFormatDate = (dateArray, days = 3) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
    return dateArray.map(date => new Date(increaseDate(date, days)).toLocaleDateString('hu', options));
}

module.exports = increaseAndFormatDate
