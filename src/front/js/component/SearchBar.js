import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext"

export const SearchBar = () => {
    const { store, actions } = useContext(Context)
    const [query, setQuery] = useState("")
    useEffect(() => {
        actions.getCustomers()
    }, [])

    return (
        <div>
            <form className="d-flex" role="search">
                <input className="form-control me-2" onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search" aria-label="Search" />

            </form>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Results
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <table className="table table-striped">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="row">First Name</th>
                                        <th scope="row">Last Name</th>
                                        <th scope="row">Email</th>
                                        <th scope="row">Phone</th>
                                        <th scope="row">Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store.customers && store.customers.filter(item => item.id == query || item.first_name == query || item.last_name == query || item.phone == query || item.email == query || item.adress == query || item.first_name + item.last_name == query).map((customer, index) => {
                                        return (

                                            <tr>

                                                <td>{customer.first_name}</td>


                                                <td>{customer.last_name}</td>


                                                <td>{customer.email}</td>


                                                <td>{customer.phone}</td>


                                                <td>{customer.address}</td>
                                            </tr>

                                        )
                                    }

                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}