import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import NewWorkOrder from "../component/NewWorkOrder";
import OrderHistory from "../component/OrderHistory";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const orders = [
    {
      first_name: "John",
      last_name: "Doe",
      make: "Toyota",
      model: "Camry",
      color: "Red",
      vin: "12345678901234567",
      licence_plate: "ABC123",
      status: "Car Accepted",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      make: "Honda",
      model: "CR-V",
      color: "Blue",
      vin: "98765432109876543",
      licence_plate: "XYZ789",
      status: "Car Accepted",
    },
  ];

  return (
    <div>
      <div className="text-center mt-5">
        <NewWorkOrder />
      </div>
      <div className="text-center mt-5">
        <OrderHistory orders={orders} />
      </div>
    </div>
  );
};
