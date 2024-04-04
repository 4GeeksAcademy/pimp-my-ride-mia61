const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			token: undefined,
			localStorageChecked: undefined
		},
		actions: {
			// Use getActions to call a function within a fuction

			logIn: async (body) => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/log-ins", {
						method: "POST",
						body: JSON.stringify(body),
						headers: {
							"Content-Type": "application/json"
						}
					}
				);   
				if (response.status !== 201) return false;
				const responseBody = await response.json();
				setStore({
					token: responseBody.access_token
				});
				localStorage.setItem("token", responseBody.access_token);

				return true;
			},

			checkIfTokenInLocalStorage: () => {
				if (localStorage.getItem("token")) {
					setStore({
						token: localStorage.getItem("token")
					});
				};
				setStore({
					localStorageChecked: true
				});
			},


			logUserOut: () => {
				setStore({
					token: undefined
				});
				if (localStorage.getItem("token")) {
					localStorage.removeItem("token");
				}
				console.log(getStore().token)
			},
			
		}
	};
};

export default getState;
