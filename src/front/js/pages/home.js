import React, { useContext } from "react";
import { Context } from "../store/appContext";
import car from "../../img/car.jpg";
import "../../styles/home.css";
import { Navbar, Nav, NavDropdown, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <div className="header">
        <Container>
          <Row>
            <Col md={12}>
              <div className="header-content">
                <div className="header-left">
                  Call
                  <a href="tel:+15555555555">
                    <strong>+1 (555) 555-5555</strong>
                  </a>
                  Email
                  <a href="mailto:info@info.com">
                    <strong>info@info.com</strong>
                  </a>
                </div>
                <div className="header-right">
                  123 Main St, City, State, Zip
                  <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">
                    <FaGoogle />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Navbar bg="light" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#">Brand</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <NavDropdown title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Service 1</NavDropdown.Item>
                <NavDropdown.Item href="#">Service 2</NavDropdown.Item>
                <NavDropdown.Item href="#">Service 3</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#">Portfolio</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Contact Us</Nav.Link>
              <Button variant="primary">Request Appointment</Button>
              <Button variant="outline-primary">Request Callback</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="main-content">
        <Container className="background-container">
          <Row>
            <Col className="image-container">
              {/* <img src="car.jpg" alt="Car" className="car-image" /> */}
              <div className="login-buttons">
                <Button variant="primary">User Login</Button>
                <Button variant="secondary">Customer Login</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="footer">
        <Container>
          <p>Operation Hours: Mon-Fri: 9am-6pm | Sat-Sun: Closed</p>
        </Container>
      </footer>
    </div>
  );
};

export default Home;

// function home() {
//   return (

//     <div className="home">

//       <div className="header">
//         <Container>
//           <Row>
//             <Col md={12}>
//               <div className="header-content">
//                 <div className="header-left">
//                   Call
//                   <a href="tel:+15555555555">
//                     <strong>+1 (555) 555-5555</strong>
//                   </a>
//                   Email
//                   <a href="mailto:info@info.com">
//                     <strong>info@info.com</strong>
//                   </a>
//                 </div>
//                 <div className="header-right">
//                   123 Main St, City, State, Zip
//                   <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">
//                     <FaGoogle />
//                   </a>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       <Navbar bg="light" expand="lg" className="navbar">
//         <Container>
//           <Navbar.Brand href="#">Brand</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="mr-auto">
//               <Nav.Link href="#">Home</Nav.Link>
//               <NavDropdown title="Services" id="basic-nav-dropdown">
//                 <NavDropdown.Item href="#">Service 1</NavDropdown.Item>
//                 <NavDropdown.Item href="#">Service 2</NavDropdown.Item>
//                 <NavDropdown.Item href="#">Service 3</NavDropdown.Item>
//               </NavDropdown>
//               <Nav.Link href="#">Portfolio</Nav.Link>
//               <Nav.Link href="#">About</Nav.Link>
//               <Nav.Link href="#">Contact Us</Nav.Link>
//               <Button variant="primary">Request Appointment</Button>
//               <Button variant="outline-primary">Request Callback</Button>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <div className="main-content">
//         <Container className="background-container">
//           <Row>
//             <Col calssName="image-container">
//               {/* <img src="car.jpg" alt="Car" className="car-image" /> */}
//               <div className="login-buttons">
//                 <Button variant="primary">User Login</Button>
//                 <Button variant="secondary">Customer Login</Button>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//       <footer className="footer">
//         <Container>
//           <p>Operation Hours: Mon-Fri: 9am-6pm | Sat-Sun: Closed</p>
//         </Container>
//       </footer>
//     </div>
//   );
// }


// export default home;

// export const Home = () => {

//   return (
//     <div>
//       <h1>Landing page </h1>
//     </div>
//   );
// };
