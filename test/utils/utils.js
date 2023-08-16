// javascript new date() is not accurate to the millisecond

exports.compareDatesIgnoringMilliseconds = (date1, date2) => {
    const roundedDate1 = new Date(date1);
    roundedDate1.setMilliseconds(0);

    const roundedDate2 = new Date(date2);
    roundedDate2.setMilliseconds(0);

    return roundedDate1.getTime() === roundedDate2.getTime();
}
