const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: undefined,
			localStorageChecked: undefined
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

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

			fetchPrivateEndpoint: async () => {
				const store = getStore();
				const response = await fetch (
					process.env.BACKEND_URL + "/api/private", {
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						}
					}
				);
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
