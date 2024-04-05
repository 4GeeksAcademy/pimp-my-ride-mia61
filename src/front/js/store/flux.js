import { TbFlagSearch } from "react-icons/tb";

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
					body: JSON.stringify({ email: user.email, password: user.password }),
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
					body: JSON.stringify({ email: customer.email, password: customer.password }),
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
					body: JSON.stringify({ first_name: customer.first_name, email: customer.email, password: customer.password, last_name: customer.last_name, address: customer.address, phone: customer.phone }),
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
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ first_name: customer.first_name, email: customer.email, password: customer.password, last_name: customer.last_name, address: customer.address, phone: customer.phone })

				}
				);
				if (response.status !== 201) return false;
				const responseBody = await response.json();
				console.log(responseBody)

				return true;
			},

			deleteCustomer: async (custId) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/customer/delete/" + custId, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("token")
					}
				})
				if (response.status !== 200) return false;
				const responseBody = await response.json();
				console.log(responseBody)
				return true;
			},

			// need to increase security
			getCustomerWorkOrders: async (custId) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/work_orders/customer/" + custId, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						// Authorization: "Bearer " + sessionStorage.getItem("token")
					},
				})
				if (response.status !== 200) return false;
				const responseBody = await response.json();
				console.log(responseBody)
				return true;
			},

			// NEED TO INCREASE SECURITY
			createNewWorkOrder: async (workOrder) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/work-order/new", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({user_id: workOrder.user_id,  customer_id: workOrder.customer_id, wo_stages: workOrder.wo_stages, make: workOrder.make, model: workOrder.model, color: workOrder.color, vin: workOrder.vin, license_plate: workOrder.license_plate})
				})
				if (response.status !== 200) return false;
				const responseBody = await response.json();
				console.log(responseBody)
				return true;
			},

			editWorkOrder: async (workOrder) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/work-order/edit/" + workOrder.id, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({user_id: workOrder.user_id,  customer_id: workOrder.customer_id, wo_stages: workOrder.wo_stages, make: workOrder.make, model: workOrder.model, color: workOrder.color, vin: workOrder.vin, license_plate: workOrder.license_plate})
				})
				if (response.status !== 200) return false;
				const responseBody = await response.json();
				console.log(responseBody)
				return true;

			},

			deleteWorkOrder: async (workOrderId) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/work-order/delete/" + workOrderId, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						// Authorization: "Bearer " + sessionStorage.getItem("token")
					}
				})
				if (response.status !== 200) return false;
				const responseBody = await response.json();
				console.log(responseBody)
				return true;
			},

// in Models: add Date Created as a field, make a fetch that gets all of the orders and then filters based on the date created. Increase sequrity to all of the routes. 



		}
	};
};

export default getState;
