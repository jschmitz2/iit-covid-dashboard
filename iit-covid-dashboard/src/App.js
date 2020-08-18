import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Form, Container, Row, Col, Carousel, Card, Button, NavDropdown, FormControl } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav'
import logo from './logo.svg';
import './App.css';

class AppNavBar extends Component {
  render() {
    return (
      <Navbar fixed="top" bg="light" expand="lg">
        <Navbar.Brand href="#home">IIT Covid Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Actions of Administration</Nav.Link>
            <NavDropdown title="Extra" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">See the Data</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Source Code</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Contact</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <AppNavBar
          currentPage="Home"
        />
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <StatsCarousel
                currentSlide="Start"
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

class StatsCarousel extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/E2oToUjOuVY/hqdefault.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>IIT Student cases since Aug. 24th</h3>
            <p>More text here. </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/E2oToUjOuVY/hqdefault.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/E2oToUjOuVY/hqdefault.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
  }
}



let value = 15;
let location = "McCormick Student Village";
let info = "Additional body information. Perhaps more text?";

class NumberBox extends Component {
  // Default Values
  constructor(props) {
    super(props);
    console.log(value);
    console.log(location);
    console.log(info);
    this.state = {
      value: value,
      location: location,
      info: info
    }
  }


  render() {
    console.log(this);

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.state.value}</Card.Title>
          <Card.Subtitle>{this.state.location}</Card.Subtitle>
          <Card.Text>{this.state.info}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default Home;


// Sources:

// Generating images with the info: 
// https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas