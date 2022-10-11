const getRecipientEmail = (users, userLoggedIn) =>
	users?.filter((userToFilier) => userToFilier !== userLoggedIn?.email)[0];

export default getRecipientEmail;
