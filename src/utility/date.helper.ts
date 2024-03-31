export const getCurrentDate = () => {
    return getFormattedDate(new Date());
}

export const getFormattedDate = (date: Date) => {
    return date.toLocaleDateString();
}