import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Form, Table, Container, Row, Col, Carousel, Card, Button, NavDropdown, FormControl } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav'
import logo from './logo.svg';
import './App.css';

const AppNavBar = ({ currentPage, homeClickFunction, dataClickFunction, contactClickFunction }) =>
  <Navbar bg="light" expand="lg">
    <Navbar.Brand onClick={homeClickFunction}>{"IIT Covid Dashboard - " + currentPage}</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link onClick={homeClickFunction}>Home</Nav.Link>
        <Nav.Link onClick={dataClickFunction}>Complete Data</Nav.Link>
        <Nav.Link href="https://www.iit.edu/COVID-19">University COVID-19 Page</Nav.Link>
        <Nav.Link onClick={dataClickFunction}>See the Data</Nav.Link>
        <Nav.Link href="https://github.com/jschmitz2/iit-covid-dashboard">Source Code</Nav.Link>
        <Nav.Link onClick={contactClickFunction}>Contact</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Home",
    };

    this.goHome = this.goHome.bind(this);
    this.goData = this.goData.bind(this);
    this.goContact = this.goContact.bind(this);
  }

  goHome() {
    this.setState({ currentPage: "Home" });
  }

  goData() {
    this.setState({ currentPage: "Data" });
  }

  goContact() {
    this.setState({ currentPage: "Contact" })
  }

  render() {
    if (this.state.currentPage == "Home") {
      return Home(this.goHome, this.goData, this.goContact)
    } else if (this.state.currentPage == "Data") {
      return <Data homeClickFunction={this.goHome} dataClickFunction={this.goData} contactClickFunction={this.goContact} />
    } else if (this.state.currentPage == "Contact") {
      return Contact(this.goHome, this.goData, this.goContact)
    }
  }
}

const Home = (homeClickFunction, dataClickFunction, contactClickFunction) =>
  <div className="Home">
    <AppNavBar
      currentPage="Home"
      homeClickFunction={homeClickFunction}
      dataClickFunction={dataClickFunction}
      contactClickFunction={contactClickFunction}
    />
    <Container>
      <h1>The Unofficial IIT COVID-19 Dashboard</h1>
      <h3>Presented by the smoldering corpse of AEPKS</h3>
      <br />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <StatsCarousel
            currentSlide="Start"
          />
        </Col>
      </Row>
      <hr />
      <br />
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Cases by Location</h2>
          <br />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 2 }}>
          <h5>Institutional Housing</h5>
        </Col>
        <Col md={{ span: 4 }}>
          <h5>Greek Housing</h5>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 2, offset: 2 }}>
          {CaseNumberBox({
            cases: 100,
            location: "McCormick Student Village",
            start_date: "8/24",
            end_date: "9/01"
          })}
          <br />
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 100,
            location: "State Street Village",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Phi Kappa Sigma",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Delta Tau Delta",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 2, offset: 2 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Kacek Hall",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Gunsalus Hall",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Alpha Sigma Alpha",
            start_date: "8/24",
            end_date: "9/01"
          })}
          <br />
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Kappa Phi Delta",
            start_date: "8/24",
            end_date: "9/01"
          })}
          <br />
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 2, offset: 2 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Carmen Hall",
            start_date: "8/24",
            end_date: "9/01"
          })}
          <br />
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Pi Kappa Phi",
            start_date: "8/24",
            end_date: "9/01"
          })}
          <br />
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Triangle",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
      </Row>
    </Container>
  </div>


class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeClickFunction: props.homeClickFunction,
      dataClickFunction: props.dataClickFunction,
      contactClickFunction: props.contactClickFunction,
      locationFilter: "All",
      weekFilter: "All"
    }
  }
  
  StudentSampleData = [
    [
      0,
      "2020-08-24",
      "2020-09-01",
      3,
      0,
      5,
      0
    ],
    [
      1,
      "2020-09-01",
      "2020-09-08",
      0,
      0,
      5,
      0
    ]
  ]

  FacultySampleData = [
    [
      0,
      "2020-08-24",
      "2020-09-01",
      3,
      0,
      5,
      0
    ],
    [
      1,
      "2020-09-01",
      "2020-09-08",
      0,
      0,
      5,
      0
    ]
  ]



  GreekSampleData = [
    [
      0,
      "2020-08-24",
      "2020-09-01",
      "Phi Kappa Sigma",
      3,
      0,
      5,
      0
    ],
    [
      1,
      "2020-09-01",
      "2020-09-08",
      "Phi Kappa Sigma",
      0,
      0,
      5,
      0
    ]
  ]

  InstitutionalSampleData = [
    [
      0,
      "2020-08-24",
      "2020-09-01",
      "McCormick Student Village",
      3,
      0,
      5,
      0
    ],
    [
      1,
      "2020-09-01",
      "2020-09-08",
      "McCormick Student Village",
      0,
      0,
      5,
      0
    ]
  ]


  render() {
    return (
      <div className="Data">
        <AppNavBar
          currentPage="Data"
          homeClickFunction={this.homeClickFunction}
          dataClickFunction={this.dataClickFunction}
          contactClickFunction={this.contactClickFunction}
        />
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>Week by Week Data</h1>
            <br />
            <h2>Overall Statistics</h2>
            <br />
            <hr />
            <h3>Student Population</h3>
            <PopulationDataTable
              table="student"
              data={this.StudentSampleData}
            />
            <hr />
            <h3>Faculty Population</h3>
            <PopulationDataTable
              table="faculty"
              data={this.FacultySampleData}
            />
            <hr />
            <h3>Institutional Housing Statistics</h3>
            <LocationDataTable
              table="institutional"
              data={this.InstitutionalSampleData} />
            <hr />
            <h3>Greek Housing Statistics</h3>
            <LocationDataTable
              table="greek"
              data={this.GreekSampleData} />
            <hr />
          </Col>
        </Row>
      </div>
    )
  }
}

const Contact = (homeClickFunction, dataClickFunction, contactClickFunction) =>
  <div className="Contact">
    <AppNavBar
      currentPage="Contact"
      homeClickFunction={homeClickFunction}
      dataClickFunction={dataClickFunction}
      contactClickFunction={contactClickFunction}
    />
    <Container>
      <br />
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>About This Page</h1>
          <p>This page was created for the Illinois Tech student community. Currently, the university only offers data in weekly emails to students, staff, and faculty.</p><br />
          <h1>Sources of Data</h1>
          <p>Data is obtained from weekly emails sent out by the Illinois Tech administration. The data is manually processed into a spreadsheet, which the webapp reads. Click "See the Data" if you're interested in this. If you have other data or information, please reach out. </p><br />
          <h1>Project Author</h1>
          <p>This project was built is maintained by Justin Schmitz. Please direct all inquiries to jschmitz2@hawk.iit.edu.</p><br />
          <h1>Forking for Other Universities</h1>
          <p>If you're intersted in forking this software for your own university, and would like some help setting things up, please reach out. Doubtless my school isn't the only one witout a useful dashboard, and this information can do social good. </p><br />
        </Col>
      </Row>

    </Container>
  </div>

class PopulationDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: props.table,
      data: props.data,
      start_filter: "2020-08-01",
      end_filter: "2020-09-01"
    }

    this.update_start_filter_state = this.update_start_filter_state.bind(this);
    this.update_end_filter_state = this.update_end_filter_state.bind(this);
    this.process_data_to_table = this.process_data_to_table.bind(this);
  }

  process_data_to_table() {
    let data = this.state.data;
    let jsx_data = [];
    for (const row of data) {
      let date = row[1];
      if (date >= this.state.start_filter && date <= this.state.end_filter) {
        let row_data = [];
        for (const val of row) {
          row_data.push(<td>{val}</td>)
        }
        jsx_data.push(<tr>{row_data}</tr>);
      }
    }
    return jsx_data;
  }

  update_start_filter_state(event) {
    this.setState({ start_filter: event.target.value });
  }
  update_end_filter_state(event) {
    this.setState({ end_filter: event.target.value });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <Col>
              <Form.Label>Start Date Range</Form.Label>
              <Form.Control type="date" value={this.start_filter} onChange={this.update_start_filter_state} />
            </Col>
            <Col>
              <Form.Label>End Date Range</Form.Label>
              <Form.Control type="date" value={this.end_filter} onChange={this.update_end_filter_state} />
            </Col>
          </Form.Row>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Week</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>New Cases</th>
              <th>New Deaths</th>
              <th>Total Cases</th>
              <th>Total Deaths</th>
            </tr>
          </thead>
          {this.process_data_to_table()}
        </Table>
      </div>
    )
  }
}

class LocationDataTable extends Component {
  constructor(props) {
    super(props);

    let locations = [];

    if (props.table == "greek") {
      locations = [
        "All",
        "Phi Kappa Sigma",
        "Delta Tau Delta",
        "Triangle",
        "Pi Kappa Phi",
        "Alpha Sigma Alpha",
        "Kappa Phi Delta"
      ]
    } else if (props.table == "institutional") {
      locations = [
        "All",
        "McCormick Student Village",
        "State Street Village",
        "Kacek Hall",
        "Gunsalus Hall",
        "Carmen Hall"
      ]
    }

    this.state = {
      table: props.table,
      data: props.data,
      locations: locations,
      location_filter: "All",
      start_filter: "2020-08-01",
      end_filter: "2021-09-01"
    }

    this.process_locations_to_dropdown = this.process_locations_to_dropdown.bind(this);
    this.process_data_to_table = this.process_data_to_table.bind(this);
    this.update_location_filter_state = this.update_location_filter_state.bind(this);
    this.update_start_filter_state = this.update_start_filter_state.bind(this);
    this.update_end_filter_state = this.update_end_filter_state.bind(this);

  }

  process_data_to_table() {
    let data = this.state.data;
    let jsx_data = [];
    for (const row of data) {
      let date = row[1];
      let location = row[3];
      if (this.state.location_filter == "All" || location == this.state.location_filter) {
        // Check if locations are all, and if not, make sure they match 
        if (date >= this.state.start_filter && date <= this.state.end_filter) {
          let row_data = [];
          for (const val of row) {
            row_data.push(<td>{val}</td>)
          }
          jsx_data.push(<tr>{row_data}</tr>);
        }
      }
    }
    return jsx_data;
  }

  update_location_filter_state(event) {
    this.setState({ location_filter: event.target.value });
  }

  update_start_filter_state(event) {
    this.setState({ start_filter: event.target.value });
  }
  update_end_filter_state(event) {
    this.setState({ end_filter: event.target.value });
  }

  process_locations_to_dropdown() {
    let locations = this.state.locations;
    const location_dropdown = [];
    for (const location of locations) {
      location_dropdown.push(<option value={location}>{location}</option>)
    };
    return location_dropdown;
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <Col>
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                custom
                onChange={this.update_location_filter_state}
              >{this.process_locations_to_dropdown()}
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Start Date Range</Form.Label>
              <Form.Control type="date" value={this.start_filter} onChange={this.update_start_filter_state} />
            </Col>
            <Col>
              <Form.Label>End Date Range</Form.Label>
              <Form.Control type="date" value={this.end_filter} onChange={this.update_end_filter_state} />
            </Col>
          </Form.Row>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Week</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Location</th>
              <th>New Cases</th>
              <th>New Deaths</th>
              <th>Total Cases</th>
              <th>Total Deaths</th>
            </tr>
          </thead>
          {this.process_data_to_table()}
        </Table>
      </div >
    )
  }
}

const CarouselStatsItem = ({ value, population, type, date_start, date_end, body_text }) =>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={"http://localhost:8000/number_image/" + value}
      alt={"New" + population + " " + type + " from " + date_start + " to " + date_end}
    />
    <Carousel.Caption>
      <h3>New {population} {type} from {date_start} to {date_end}</h3>
      <p>{body_text}</p>
    </Carousel.Caption>
  </Carousel.Item>


class StatsCarousel extends Component {
  render() {
    return (
      <Carousel>
        {CarouselStatsItem({
          value: "100",
          population: "Student",
          type: "Deaths",
          date_start: "8/24",
          date_end: "9/01",
          body_text: "That's a lot of damage. ~Phil Swift"
        })}
        {CarouselStatsItem({
          value: "25",
          population: "Faculty",
          type: "Cases",
          date_start: "8/24",
          date_end: "9/01",
          body_text: "That's a lot of damage. ~Phil Swift"
        })}
        {CarouselStatsItem({
          value: "14",
          population: "Student",
          type: "Cases",
          date_start: "8/24",
          date_end: "9/01",
          body_text: "That's a lot of damage. ~Phil Swift"
        })}
      </Carousel>
    )
  }
}

const CaseNumberBox = ({ cases, location, start_date, end_date }) =>
  <Card style={{ width: '10rem' }}>
    <Card.Body>
      <Card.Title>{cases}</Card.Title>
      <Card.Subtitle>{location}</Card.Subtitle>
      <Card.Text>{"New cases from " + start_date + " to " + end_date}</Card.Text>
    </Card.Body>
  </Card>


export default App;


// Sources:

// Generating images with the info: 
// https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas