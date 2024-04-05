const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			token: undefined,
			sessionStorageChecked: undefined
		},
		actions: {
			// Use getActions to call a function within a fuction

			logInUser: async (user) => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/user/login", {
						method: "POST",
						body: JSON.stringify({email: user.email, password:user.password}),
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
				sessionStorage.setItem("token", responseBody.access_token);

				return true;
			},

			checkIfTokenInSessionStorage: () => {
				if (sessionStorage.getItem("token")) {
					setStore({
						token: sessionStorage.getItem("token")
					});
				};
				setStore({
					sessionStorageChecked: true
				});
			},


			logUserOut: () => {
				setStore({
					token: undefined
				});
				if (sessionStorage.getItem("token")) {
					sessionStorage.removeItem("token");
				}
				console.log(getStore().token)
			},

			logInCustomer: async (customer) => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/customer/login", {
						method: "POST",
						body: JSON.stringify({email: customer.email, password:customer.password}),
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
				sessionStorage.setItem("token", responseBody.access_token);

				return true;
			},

			signUpCustomer: async (customer) => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/customer/signup", {
						method: "POST",
						body: JSON.stringify({first_name:customer.first_name, email:customer.email, password:customer.password, last_name:customer.last_name, address:customer.address, phone:customer.phone }),
						headers: {
							"Content-Type": "application/json"
						}
					}
				);   
				if (response.status !== 201) return false;
				const responseBody = await response.json();
				console.log(responseBody)

				return true;
			},

			editCustomer: async (customer) => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/customer/edit/" + customer.id, {
						method: "PUT",
						body: JSON.stringify({first_name:customer.first_name, email:customer.email, password:customer.password, last_name:customer.last_name, address:customer.address, phone:customer.phone }),
						headers: {
							"Content-Type": "application/json"
						}
					}
				);   
				if (response.status !== 201) return false;
				const responseBody = await response.json();
				console.log(responseBody)

				return true;
			},

			getAllCustomers: async (customer) => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/customer", {
						method: "GET",
						body: JSON.stringify ({first_name:customer.first_name, email:customer.email, password:customer.password, last_name:customer.last_name, address:customer.address, phone:customer.phone }),
						headers: {
							"Content-Type": "application/json"
						}
					}
				);
			}


		}
	};
};

export default getState;
