import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Progressbar from "./component/Progressbar"
// import { Link } from "react-router-dom";
import { GenerateProgressbar } from "./GenerateProgressbar";

const NewWorkOrder = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    vin_number: "",
    licence_plate: "",
    text_area: "",
  });
  
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [progressbarSteps, setProgressbarSteps] = useState([]);

  // Defining vechicle models for each make:
  const vechicleModels = {
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
  };

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
    setMakes(fetchedMakes);
  }, []);

  useEffect(() => {
    if (selectedMake) {
      setModels(vechicleModels[selectedMake] || []);
    } else {
      setModels([]);
    }
  }, [selectedMake]);

  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
    setSelectedModel("");
    setSelectedYear("");
  };


  
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const years = Array.from({ length: 30 }, (_, index) =>
    (new Date().getFullYear() + 1 - index).toString()
  );

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setUploadedImages([
            ...uploadedImages,
            ...newImages.slice(0, 12 - uploadedImages.length),
          ]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting Form", formData);
  };

  // Function to handle input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  

  const handleProcessWorkOrder = async (event) => {
    const { first_name, last_name, email, phone_number, address } = formData;

    if (!first_name || !last_name || !email || !phone_number || !address) {
      alert("Please fill out all required fields");
      return;
  }

      const success = await actions.createNewWorkOrder({
        
        make: selectedMake,
        model: selectedModel,
        color: selectedColor, 
         

      });
      if (success) {
         alert("Work Order Created Successfully!");
      } else {
          alert("something went wrong");
      }
  }


  // const handleProgressbarChange = (event) => {
  //   setProgressbarSteps(event.target.value);
  // };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="row input-group mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="first_name"
              placeholder="First name *"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="last_name"
              placeholder="Last name *"
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="phone_number"
              placeholder="Phone number *"
              onChange={handleChange}
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
              value={selectedMake}
            >
              <option value="" selected disabled>
                Select Make
              </option>
              {makes.map((make, index) => (
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
              disabled={!selectedMake}
            >
              <option value="" selected disabled>
                Select Model
              </option>
              {models.sort().map((model, index) => (
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
              disabled={!selectedMake || !models.length}
              onChange={handleYearChange}
              value={selectedYear}
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="licence_plate"
              placeholder="Licence plate *"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="color"
              placeholder="Color *"
              onChange={handleChange}
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
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="inputGroupFileAddon04"
          >
            Upload
          </button>
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
                  src={image}
                  alt={`Uploaded Preview ${index}`}
                />
                <button
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
            placeholder="Enter text"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3"></div>

        <div>
          <GenerateProgressbar onSelectedStagesChange={setFormData} progressStages={formData.progressStages} />
          <label htmlFor="progressbar">
            {/* Repair stages to Generate Progressbar: */}
          </label>
          {/* <textarea
            id="progressbar"
            name="progressbar"
            onChange={handleProgressbarChange}
            value={progressbarSteps}
            required
          /> */}
        </div>

        <div>
          <button 
          type="submit" className="btn btn-primary"
          onClick={handleProcessWorkOrder}>
            Create new order
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewWorkOrder;
