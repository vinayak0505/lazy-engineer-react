export const getCurrentDate = () => {
	return getFormattedDate(new Date());
};

export const getFormattedDate = (date: Date) => {
	return date.toLocaleDateString();
};

export const dateAddDays = (date: Date, days: number) => {
	return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};

export const inputDateFormat = (date: Date | string) => {
	if (typeof date === 'string') {
		date = new Date(date);
	}
	return date.toLocaleDateString().split('/').reverse().join('-');
};
