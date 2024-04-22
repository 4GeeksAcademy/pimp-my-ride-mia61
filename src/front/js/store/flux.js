import { TbFlagSearch } from "react-icons/tb";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            isLoggedIn: false,
            customerWorkOrders: [],
            customers: [],
            customerId: sessionStorage.getItem("customerId") || null,
            orders: [],
            vehicleModels: {
                Acura: ["ILX", "MDX", "RDX", "RLX", "TLX"],
                "Alfa Romeo": ["Giulia", "Stelvio"],
                "Aston Martin": ["DB11", "DBS Superleggera", "Vantage"],
                Audi: [
                    "A3",
                    "A4",
                    "A5",
                    "A6",
                    "A7",
                    "A8",
                    "Q3",
                    "Q5",
                    "Q7",
                    "Q8",
                    "TT",
                    "R8",
                ],
                Bentley: ["Bentayga", "Continental GT", "Flying Spur", "Mulsanne"],
                BMW: [
                    "2 Series",
                    "3 Series",
                    "4 Series",
                    "5 Series",
                    "7 Series",
                    "8 Series",
                    "X1",
                    "X2",
                    "X3",
                    "X4",
                    "X5",
                    "X6",
                    "X7",
                    "Z4",
                    "iX",
                    "i4",
                    "i5",
                    "i7",
                    "XM",
                ],
                Buick: ["Enclave", "Encore", "Encore GX", "Envision", "LaCrosse", "Regal"],
                Cadillac: ["CT4", "CT5", "CT6", "Escalade", "XT4", "XT5", "XT6"],
                Chevrolet: [
                    "Camaro",
                    "Corvette",
                    "Malibu",
                    "Silverado",
                    "Suburban",
                    "Tahoe",
                    "Traverse",
                ],
                Chrysler: ["300", "Pacifica", "Voyager"],
                Dodge: ["Challenger", "Charger", "Durango", "Grand Caravan", "Journey"],
                Ferrari: [
                    "488 GTB",
                    "488 Spider",
                    "812 Superfast",
                    "F8 Tributo",
                    "Portofino",
                    "Roma",
                    "SF90 Stradale",
                ],
                Fiat: ["500", "500X", "500L", "124 Spider", "Tipo"],
                Ford: [
                    "Escape",
                    "Explorer",
                    "F-150",
                    "Focus",
                    "Mustang",
                    "Ranger",
                    "Transit",
                ],
                Genesis: ["G70", "G80", "G90"],
                GMC: [
                    "Acadia",
                    "Canyon",
                    "Sierra 1500",
                    "Sierra 2500HD",
                    "Sierra 3500HD",
                    "Terrain",
                    "Yukon",
                    "Yukon XL",
                ],
                Honda: ["Accord", "Civic", "CR-V", "Fit", "HR-V", "Pilot"],
                Hyunday: [
                    "Accent",
                    "Elantra",
                    "Ioniq",
                    "Kona",
                    "Nexo",
                    "Palisade",
                    "Santa Fe",
                    "Sonata",
                    "Tucson",
                    "Veloster",
                    "Venue",
                ],
                Infinity: ["Q50", "Q60", "Q70", "QX50", "QX60", "QX80"],
                Jaguar: ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XE", "XF", "XJ"],
                Jeep: [
                    "Cherokee",
                    "Compass",
                    "Gladiator",
                    "Grand Cherokee",
                    "Renegade",
                    "Wrangler",
                ],
                Kia: [
                    "Forte",
                    "Optima",
                    "Rio",
                    "Sorento",
                    "Soul",
                    "Sportage",
                    "Stinger",
                    "Telluride",
                ],
                Lamborghini: ["Aventador", "Huracán", "Urus"],
                "Land Rover": [
                    "Defender",
                    "Discovery",
                    "Discovery Sport",
                    "Range Rover",
                    "Range Rover Evoque",
                    "Range Rover Sport",
                    "Range Rover Velar",
                ],
                Lexus: ["ES", "GS", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "UX"],
                Lincoln: [
                    "Aviator",
                    "Continental",
                    "Corsair",
                    "MKC",
                    "MKT",
                    "MKZ",
                    "Nautilus",
                    "Navigator",
                ],
                Lotus: ["Evora", "Elise", "Exige"],
                Maserati: [
                    "Ghibli",
                    "Levante",
                    "Quattroporte",
                    "GranTurismo",
                    "GranCabrio",
                ],
                Mazda: [
                    "Mazda2",
                    "Mazda3",
                    "Mazda6",
                    "MX-5 Miata",
                    "CX-3",
                    "CX-30",
                    "CX-5",
                    "CX-9",
                ],
                McLaren: ["GT", "570S", "570GT", "600LT", "720S", "Speedtail"],
                "Mercedes-Benz": [
                    "A-class",
                    "C-class",
                    "E-class",
                    "S-class",
                    "GLA",
                    "GLC",
                    "GLE",
                    "GLS",
                ],
                MINI: [
                    "Cooper",
                    "Cooper S",
                    "Clubman",
                    "Countryman",
                    "Convertible",
                    "Hardtop",
                    "John Cooper Works",
                ],
                Mitsubishi: [
                    "Eclipse Cross",
                    "Mirage",
                    "Outlander",
                    "Outlander Sport",
                    "Lancer",
                ],
                Nissan: [
                    "Altima",
                    "Armada",
                    "Frontier",
                    "Kicks",
                    "Leaf",
                    "Maxima",
                    "Murano",
                    "Pathfinder",
                    "Rogue",
                    "Sentra",
                    "Titan",
                    "Versa",
                ],
                Porshe: ["911", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera"],
                Ram: ["1500", "2500", "3500"],
                "Rolls-Royce": ["Phantom", "Ghost", "Wraith", "Dawn", "Cullinan"],
                Subaru: [
                    "Ascent",
                    "Crosstrek",
                    "Forester",
                    "Impreza",
                    "Legacy",
                    "Outback",
                    "WRX",
                ],
                Tesla: [
                    "Model S",
                    "Model 3",
                    "Model X",
                    "Model Y",
                    "Roadster",
                    "Cybertruck",
                ],
                Toyota: [
                    "4Runner",
                    "Avalon",
                    "Camry",
                    "Corolla",
                    "Crown",
                    "GR86",
                    "Highlander",
                    "Prius",
                    "RAV4",
                    "Sequoia",
                    "Sienna",
                    "Tacoma",
                    "Tundra",
                ],
                Volkswagen: [
                    "Arteon",
                    "Atlas",
                    "Beetle",
                    "Golf",
                    "Jetta",
                    "Passat",
                    "Taos",
                    "Tiguan",
                    "Touareg",
                ],
                Volvo: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
            },
            token: undefined,
            sessionStorageChecked: !!sessionStorage.getItem("token")
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
                    token: responseBody.access_token,
                    isLoggedIn: true
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
                    token: undefined,
                    customerId: undefined
                });
                sessionStorage.removeItem("token"); 
                sessionStorage.removeItem("customerId");
                setStore({isLoggedIn: false});
                
                console.log("Logged out:", getStore().token)
            },

            logInCustomer: async (customerCredentials) => {
                const response = await fetch(`${process.env.BACKEND_URL}/api/customer/login`, {
                    method: "POST",
                    body: JSON.stringify(customerCredentials),
                    headers: { "Content-Type": "application/json" }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStore({
                        token: data.access_token,
                        customerId: data.customer_id,
                        isLoggedIn: true
                    });
                    sessionStorage.setItem("token", data.access_token);
                    sessionStorage.setItem("customerId", data.customer_id);
                    return true;
                } else {
                    console.error("Login failed with status:", response.status);
                    return false;
                }
            },

            verifyCustomer: ({access_token, customer_id, ...args}) => {
                setStore({
                    token: access_token,
                    customerId: customer_id
                });
                sessionStorage.setItem("token", access_token);
                sessionStorage.setItem("customerId", customer_id);
            },

            checkStorage: () => {
               const token = sessionStorage.getItem("token", undefined)  
                const customer_id = sessionStorage.getItem("customerId", undefined)
                setStore({
                    token: token,
                    customerId: customer_id
                });
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

            // getCustomers: async (custId) => {
            getCustomers: async () => {

                const response = await fetch(process.env.BACKEND_URL + "/api/customers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.token
                    },
                })
                if (response.status !== 200) return false;
                const responseBody = await response.json();
                // setStore({ customers: responseBody.customers })
                console.log(responseBody)
                setStore({ customers: responseBody })
                return true;
            },

            getCustomerById: async (custId) => {
                if (!custId) {
                    console.error("Customer ID is undefined.");
                    return false;
                }
                // const response = await fetch(`${process.env.BACKEND_URL}/api/customer/${custId}`, {
                const response = await fetch(`${process.env.BACKEND_URL}/api/user/get-customer/${custId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    },
                });

                if (!response.ok) {
                    console.error('Failed to fetch customer data:', response.status);
                    return false;
                }

                const responseBody = await response.json();

                
                // return true
                return responseBody
            },


            getCurrentCustomer: async () => {
                const response = await fetch(`${process.env.BACKEND_URL}/api/current-customer`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    },
                });

                if (!response.ok) {
                    console.error('Failed to fetch customer data:', response.status);
                    return false;
                }

                const responseBody = await response.json();

                return responseBody
            },



            editCustomer: async (customer) => {
                const response = await fetch(
                    process.env.BACKEND_URL + "/api/customer/edit/" + customer.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`

                    },
                    body: JSON.stringify({ first_name: customer.first_name, email: customer.email, password: customer.password, last_name: customer.last_name, address: customer.address, phone: customer.phone })

                }
                );
                if (response.status !== 201) return false;
                const responseBody = await response.json();
                console.log(responseBody)

                return true;
            },

            editCustomerbyCustomer: async (customer) => {
                const response = await fetch(
                    process.env.BACKEND_URL + "/api/customer/edit-by-customer", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ first_name: customer.first_name, email: customer.email, last_name: customer.last_name, address: customer.address, phone: customer.phone })

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

            sendPasswordResetEmail: async (email, role ) => {
                const response = await fetch(process.env.BACKEND_URL + "/api/forgotpassword", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, role })
                });
                if (!response.ok) {
                    console.error("Failed to send password reset email with status:", response.status);
                    return false;
                }
                const data = await response.json();
                console.log("Password reset email sent:", data.msg);
                return true;
            },

            resetPassword: async (token, newPassword) => {
                const url = `${process.env.BACKEND_URL}/api/reset-password?token=${encodeURIComponent(token)}`;
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ new_password: newPassword })
                    });
                    const data = await response.json(); // Always parse the JSON to handle the response correctly
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}, message: ${data.message}`);
                    }
                    console.log("Password reset successful:", data.message);
                    return {status: true, role: data.role};
                } catch (error) {
                    console.error("Failed to reset password:", error.message || error);
                    return {status: false, role: data.role};
                }
            },

            getCustomerWorkOrders: async (custId) => {
                const response = await fetch(process.env.BACKEND_URL + "/api/work_orders/customer/" + custId, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                    },
                })
                if (response.status !== 200) return false;
                const responseBody = await response.json();
                console.log(responseBody)
                return true;
            },

            getCustomerWorkOrdersByCustomer: async () => {
                console.log("I'm running")
                const response = await fetch(process.env.BACKEND_URL + "/api/work_orders/customer", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                    },
                })
                if (response.status !== 200) return false;
                const responseBody = await response.json();
                setStore({ customerWorkOrders: responseBody })
                return true;
            },



            createNewWorkOrder: async (workOrder) => {
                let data = JSON.stringify({ customer_id: workOrder.customer_id, wo_stages: workOrder.wo_stages, make: workOrder.make, model: workOrder.model, year: workOrder.year, color: workOrder.color, vin: workOrder.vin, license_plate: workOrder.license_plate, comments: workOrder.comments })
                let formData = new FormData();
                formData.append("data", data);
                console.log(">>> 🍎 image:", workOrder.images);
                for (let i = 0; i < workOrder.images.length; i++) {
                    formData.append("file", workOrder.images[i]);
                }

                const response = await fetch(process.env.BACKEND_URL + "/api/work-order/new", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                    },
                    body: formData
                })
                if (response.status !== 201) return false;
                const responseBody = await response.json();
                console.log(responseBody)
                return true;
            },

            editWorkOrder: async (workOrder) => {
                const response = await fetch(process.env.BACKEND_URL + "/api/work-order/edit/" + workOrder.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                    },
                    body: JSON.stringify({ user_id: workOrder.user_id, customer_id: workOrder.customer_id, wo_stages: workOrder.wo_stages, make: workOrder.make, model: workOrder.model, color: workOrder.color, vin: workOrder.vin, license_plate: workOrder.license_plate })
                })
                if (response.status !== 200) return false;
                const responseBody = await response.json();
                console.log(responseBody)
                return true;

            },

            deleteWorkOrder: async (workOrderId) => {
                const store = getStore()
                const response = await fetch(process.env.BACKEND_URL + "/api/work-order/delete/" + workOrderId, {
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

            getAllWorkOrders: async () => {
                const response = await fetch(process.env.BACKEND_URL + "/api/work-order/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                    }
                })
                if (response.status !== 200) return false;
                const responseBody = await response.json();
                setStore({orders: responseBody.work_orders})
                return true;
            },

            getWorkOrderById: async (workOrderId) => {
                const response = await fetch(process.env.BACKEND_URL + "/api/work_orders/customer/" + workOrderId, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                    },
                })
                if (response.status !== 200) return false;
                const responseBody = await response.json();
                console.log(responseBody)
                return true;
            },
        }
    };
};

export default getState;