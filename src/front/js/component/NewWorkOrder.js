import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";
// import Progressbar from "./component/Progressbar"
// import { Link } from "react-router-dom";
import { GenerateWoSteps } from "../component/GenerateWoSteps";
import { SearchBar } from "./SearchBar";

const NewWorkOrder = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context)

  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: ""
  })
  const [makeList, setMakeList] = useState([]);
  const [modelsList, setModelsList] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [license, setLicense] = useState("");
  const [color, setColor] = useState("");

  const [uploadedImages, setUploadedImages] = useState([]);
  const [woStages, setWoStages] = useState([]);
  const [comments, setComments] = useState([]);

  // Defining vechicle models for each make:


  useEffect(() => {
    const fetchedMakes = [
      "Acura",
      "Alfa Romeo",
      "Aston Martin",
      "Audi",
      "Bentley",
      "BMW",
      "Buick",
      "Cadillac",
      "Chevrolet",
      "Chrysler",
      "Dodge",
      "Ferrari",
      "Fiat",
      "Ford",
      "Genesis",
      "GMC",
      "Honda",
      "Hyundai",
      "Infiniti",
      "Jaguar",
      "Jeep",
      "Kia",
      "Lamborghini",
      "Land Rover",
      "Lexus",
      "Lincoln",
      "Lotus",
      "Maserati",
      "Mazda",
      "McLaren",
      "Mercedes-Benz",
      "MINI",
      "Mitsubishi",
      "Nissan",
      "Porsche",
      "Ram",
      "Rolls-Royce",
      "Subaru",
      "Tesla",
      "Toyota",
      "Volkswagen",
      "Volvo",
    ];
    setMakeList(fetchedMakes);
  }, []);

  useEffect(() => {
    if (make) {
      setModelsList(store.vehicleModels[make] || []);
    } else {
      setModelsList([]);
    }
  }, [make]);

  const handleMakeChange = (e) => {
    setMake(e.target.value);
  };

  // const handleYearChange = (e) => {
  //   setYear(e.target.value);
  // };

  const years = Array.from({ length: 30 }, (_, index) =>
    (new Date().getFullYear() + 1 - index).toString()
  );

  const handleImageUpload = (event) => {
    const files = event.target.files;
    console.log(">>> files", files);
    const images = [];
    for (let index = 0; index < files.length; index++) {
      images.push(files.item(index));
    }
    setUploadedImages((prev) => ([
      ...prev,
      ...images
    ]));
    // const newImages = [];
    // console.log(files);
    // for (let i = 0; i < files.length; i++) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     newImages.push(reader.result);
    //     if (newImages.length === files.length) {
    //       setUploadedImages([
    //         ...uploadedImages,
    //         ...newImages.slice(0, 12 - uploadedImages.length),
    //       ]);
    //     }
    //   };
    //   reader.readAsDataURL(files[i]);
    // }
  };

  const handleNewWorkOrder = async (event) => {
    event.preventDefault()
    const success = await actions.createNewWorkOrder({
      customer_id: customer.id,
      wo_stages: woStages,
      make: make,
      model: model,
      year: year,
      color: color,
      vin: vin,
      license_plate: license,
      comments: comments,
      images: uploadedImages
    });
    if (success) {
      await actions.getAllWorkOrders()
      // alert("Work Order Created Successfully!");
    } else {
      alert("something went wrong");
    }

  }



  return (
    <div className="form-container">
      <SearchBar setCustomer={setCustomer} />

      <form onSubmit={handleNewWorkOrder}>
        <div className="row input-group mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={customer.first_name}
              placeholder="First name *"
              onChange={() => setCustomer({ firstName: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={customer.last_name}
              name="last_name"
              placeholder="Last name *"
              onChange={() => setCustomer({ lastName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="row input-group mb-3">
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email *"
              value={customer.email}
              onChange={() => setCustomer({ email: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="phone_number"
              placeholder="Phone number *"
              value={customer.phone}
              onChange={() => setCustomer({ phone: e.target.value })}
              required
            />
          </div>

        </div>
        <div className="row input-group mb-3">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="123 Main St."
              value={customer.address}
              onChange={() => setCustomer({ address: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="row input-group mb-3">
          <div className="col-md-4">
            <select
              className="form-select"
              aria-label="Make"
              onChange={handleMakeChange}
              value={make}
            >
              <option value="" selected disabled>
                Select Make
              </option>
              {makeList.map((make, index) => (
                <option key={index} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              aria-label="Model"
              disabled={!make}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="" selected disabled>
                Select Model
              </option>
              {modelsList.sort().map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              aria-label="Year"
              disabled={!make || !modelsList.length}
              onChange={(e) => setYear(e.target.value)}
              value={year}
            >
              <option value="" selected disabled>
                Select Year
              </option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row input-group mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="vin_number"
              placeholder="VIN Number *"
              maxLength={17}
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              onChange={(e) => setVin(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="license_plate"
              placeholder="License plate *"
              onChange={(e) => setLicense(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="color"
              placeholder="Color *"
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div></div>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile04"
            aria-describedby="inputGroupFileAddon04"
            aria-label="Upload"
            multiple
            onChange={handleImageUpload}
            filename={`${uploadedImages.length > 0 ? uploadedImages.length : "No"} selected file${uploadedImages.length === 1 ? "" : "s"}`}
          />
        </div>
        {/* Conditionally render the preview section */}
        {uploadedImages.length > 0 && (
          <div className="d-flex flex-wrap">
            {uploadedImages.map((image, index) => (
              <div key={index} className="position-relative d-inline-block">
                <img
                  key={index}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    margin: "5px",
                  }}
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Preview ${index}`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setUploadedImages((imageList) =>
                      imageList.filter((_, imageIndex) => imageIndex !== index)
                    )
                  }
                  className="btn btn-outline-danger position-absolute top-0 end-0 m-2"
                  style={{
                    borderRadius: "15%",
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.75rem",
                  }}
                >
                  x
                </button>
              </div>
            ))}
            {/* Render empty preview placeholders if less than 12 images */}
          </div>
        )}

        <div className="mb-3"></div>

        <div className="input-group">
          <span className="input-group-text">Notes:</span>
          <textarea
            className="form-control"
            name="text_area"
            placeholder="Comments"
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3"></div>

        <div>
          <GenerateWoSteps setWoStages={setWoStages} woStages={woStages} />
        </div>

        <div>
          <button
            type="submit" className="btn btn-primary"
            onClick={handleNewWorkOrder}>
            Create new order
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewWorkOrder;

//  for picutrse send 2 fourmat fields,,
//  second request to send a file 

//  Flux and make a new fetch that takes a arr []