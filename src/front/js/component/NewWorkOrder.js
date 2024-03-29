import React, {useEffect, useState} from 'react'

const NewWorkOrder =() => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');


// Defining vechicle models for each make:
    const vechicleModels ={
        "Acura": ["ILX", "MDX", "RDX", "RLX", "TLX"],
        "Alfa Romeo": ["Giulia", "Stelvio"],
        "Aston Martin": ["DB11", "DBS Superleggera", "Vantage"],
        "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "TT", "R8"],
        "Bentley": ["Bentayga","Continental GT", "Flying Spur", "Mulsanne"],
        "BMW": ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X6", "Z4"],
        "Buick": ["Enclave", "Encore", "Encore GX", "Envision", "LaCrosse", "Regal"],
        "Cadillac": ["CT4", "CT5", "CT6", "Escalade", "XT4", "XT5", "XT6",],
        "Chevrolet": ["Camaro", "Corvette", "Malibu", "Silverado", "Suburban", "Tahoe", "Traverse"],
        "Chrysler": ["300", "Pacifica", "Voyager"],
        "Dodge": ["Challenger", "Charger", "Durango", "Grand Caravan", "Journey"],
        "Ferrari": ["488 GTB", "488 Spider", "812 Superfast", "F8 Tributo", "Portofino", "Roma", "SF90 Stradale"],
        "Fiat": ["500", "500X", "500L", "124 Spider", "Tipo"],
        "Ford": ["Escape", "Explorer", "F-150", "Focus", "Mustang", "Ranger", "Transit"],
        "Genesis": ["G70", "G80", "G90"],
        "GMC": ["Acadia", "Canyon", "Sierra 1500", "Sierra 2500HD", "Sierra 3500HD", "Terrain", "Yukon", "Yukon XL"],
        "Honda": ["Accord", "Civic", "CR-V", "Fit", "HR-V", "Pilot"],
        "Hyunday": ["Accent", "Elantra", "Ioniq", "Kona", "Nexo", "Palisade", "Santa Fe", "Sonata", "Tucson", "Veloster", "Venue"],
        "Infinity": ["Q50", "Q60", "Q70", "QX50", "QX60", "QX80"],
        "Jaguar": ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XE", "XF", "XJ"],
        "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler"],
        "Kia": ["Forte", "Optima", "Rio", "Sorento", "Soul", "Sportage", "Stinger", "Telluride"],
        "Lamborghini": ["Aventador", "Huracán", "Urus"],
        "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
        "Lexus": ["ES", "GS", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "UX"],
        "Lincoln": ["Aviator", "Continental", "Corsair", "MKC", "MKT", "MKZ", "Nautilus", "Navigator"],
        "Lotus": ["Evora", "Elise", "Exige"],
        "Maserati": ["Ghibli", "Levante", "Quattroporte", "GranTurismo", "GranCabrio"],
        "Mazda": ["Mazda2", "Mazda3", "Mazda6", "MX-5 Miata", "CX-3", "CX-30", "CX-5", "CX-9"],
        "McLaren": ["GT", "570S", "570GT", "600LT", "720S", "Speedtail"],
        "Mercedes-Benz": ["A-className", "C-className", "E-className", "S-className", "GLA", "GLC", "GLE", "GLS"],
        "MINI": ["Cooper", "Cooper S", "Clubman", "Countryman", "Convertible", "Hardtop", "John Cooper Works"],
        "Mitsubishi": ["Eclipse Cross", "Mirage", "Outlander", "Outlander Sport", "Lancer"],
        "Nissan": ["Altima", "Armada", "Frontier", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan", "Versa"],
        "Porshe": ["911", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera"],
        "Ram": ["1500", "2500", "3500"],
        "Rolls-Royce": ["Phantom", "Ghost", "Wraith", "Dawn", "Cullinan"],
        "Subaru": ["Ascent", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX"],
        "Tesla": ["Model S", "Model 3", "Model X", "Model Y", "Roadster", "Cybertrack"],
        "Toyota": ["4Runner", "Avalon", "Camry", "Corolla", "Highlander", "Prius", "RAV4", "Sienna", "Tacoma", "Tundra"],
        "Volkswagen": ["Arteon", "Atlas", "Beetle", "Golf", "Jetta", "Passat", "Taos", "Tiguan", "Touareg"],
        "Volvo": ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
        };


    useEffect(() => {
        const fetchedMakes = ["Acura",
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
        "Volvo"];
        setMakes(fetchedMakes);
    }, []);

    useEffect(() => {
        if (selectedMake) {
            setModels(vechicleModels[selectedMake] || []);
        }
        else{
            setModels([]);
        }
    }, [selectedMake])

    const handleMakeChange = (e) => {
        setSelectedMake(e.target.value);
        setSelectedModel('');
        setSelectedYear('');
    };

    const handleYearChange = (e) => {
        selectedYear(e.target.value)
    };

    const years = Array.from({ length: 30 }, (_, index) => (new Date().getFullYear() - index).toString()); // Array of years from current year to 30 years ago


    return (
        <form>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="First name *" aria-label="Fristname" aria-describedby="basic-addon1"/>
                <input type="text" className="form-control" placeholder="Last name *" aria-label="Lastname" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email *" aria-label="Email" aria-describedby="basic-addon1"/>
                <input type="text" className="form-control" placeholder="Phone number *" aria-label="Phone number" maxLength={10} aria-describedby="basic-addon1"/>
            </div>
        
            <div className="input-group mb-3">
                <select className="form-select" aria-label="Make" onChange={handleMakeChange} value={selectedMake}>
                    <option value="" selected disabled>Select Make</option>
                    {makes.map((make, index) => (
                        <option key={index} value={make}>{make}</option>
                    ))}
                </select>

                <select className="form-select" aria-label="Model" disabled={!selectedMake}>
                    <option value="" selected disabled>Select Model</option>
                    {models.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                    ))}
                </select>

                <select className="form-select" aria-label="Year" disabled={!selectedMake || !models.length} onChange={handleYearChange} value={selectedYear}>
                    <option value="" selected disabled>Select Year</option>
                    {years.map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                    ))}
                </select>

                {/* <input type="text" className="form-control" placeholder="" aria-label="Make" aria-describedby="basic-addon2"/>
                <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/> */}
            </div>

            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="VIN Number *" aria-label="VIN" aria-describedby="basic-addon1" maxLength={17} onInput={(e) => { e.target.value = e.target.value.toUpperCase(); }}/>
                <input type="text" className="form-control" placeholder="Licence plate *" aria-label="Licence plate" aria-describedby="basic-addon1"/>
            </div>

            <div class="input-group">
                <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Upload</button>
            </div>

            <div className="input-group">
                <span className="input-group-text">Notes:</span>
                <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>
        </form>
        
    )
}

export default NewWorkOrder;