import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import NewWorkOrder from "../component/NewWorkOrder";
import OrderHistory from "../component/OrderHistory";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const orders = []

	return (
		// <div className="text-center mt-5">
		// 	<NewWorkOrder/>
		// </div>
		<div className="text-center mt-5">
			<OrderHistory orders={orders}/>
		</div>
	);
};
