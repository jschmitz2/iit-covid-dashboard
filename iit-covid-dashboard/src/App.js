import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Form, Table, Container, Row, Col, Carousel, Card, Spinner } from "react-bootstrap";
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
      data: {
        student_population: [],
        faculty_population: [],
        ins_housing: [],
        greek_housing: []
      },
      data_loaded: false
    };

    this.goHome = this.goHome.bind(this);
    this.goData = this.goData.bind(this);
    this.goContact = this.goContact.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var xhr = new XMLHttpRequest();
    var status = false;
    xhr.open("GET", "http://www.iit.wtf:8000/data", false);
    // xhr.open("GET", "http://localhost:8000/data", false);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({ data: JSON.parse(xhr.responseText), data_loaded: true });
          status = true;
        } else {
          console.error(xhr.statusText);
        }
      }
    }.bind(this);
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
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
    if (this.state.currentPage === "Home" && this.state.data_loaded) {
      return <Home homeClickFunction={this.goHome} dataClickFunction={this.goData} contactClickFunction={this.goContact} data={this.state.data} />
    } else if (this.state.currentPage === "Data" && this.state.data_loaded) {
      return <Data homeClickFunction={this.goHome} dataClickFunction={this.goData} contactClickFunction={this.goContact} data={this.state.data} />
    } else if (this.state.currentPage === "Contact") {
      return Contact(this.goHome, this.goData, this.goContact);
    } else {
      return LoadingScreen();
    }
  }
}

const LoadingScreen = () =>
  <div>
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeClickFunction: props.homeClickFunction,
      dataClickFunction: props.dataClickFunction,
      contactClickFunction: props.contactClickFunction,
      student_population: props.data.student_population,
      faculty_population: props.data.faculty_population,
      ins_housing: props.data.ins_housing,
      greek_housing: props.data.greek_housing,
      locationFilter: "All",
      weekFilter: "All",
      newTotal: "new",
      casesDeaths: "cases"
    }
    this.getLocationCaseTotal = this.getLocationCaseTotal.bind(this);
    this.updateNewTotalState = this.updateNewTotalState.bind(this);
    this.updateCasesDeathsState = this.updateCasesDeathsState.bind(this);
    this.getPopulationCaseTotal = this.getPopulationCaseTotal.bind(this);
  }

  getLocationCaseTotal(location, list_kword, query, type) {
    // Location: institution name. list_kword: "ins" or "greek". query: "total" or "new". type: "cases" or "deaths".
    let list = null;
    if (list_kword === "ins") {
      list = this.state.ins_housing;
    } else {
      list = this.state.greek_housing;
    }

    for (let row of list) {
      if ((row.week === row.max_week) && row.location === location) {
        if (query === "total") {
          if (type === "cases") {
            return {
              "cases": row.total_cases,
              "location": row.location,
              "start_date": row.start_date,
              "end_date": row.end_date,
              "query": query,
              "type": type
            }
          } else {
            return {
              "cases": row.total_deaths,
              "location": row.location,
              "start_date": row.start_date,
              "end_date": row.end_date,
              "query": query,
              "type": type
            }
          }
        } else {
          if (type === "cases") {
            return {
              "cases": row.new_cases,
              "location": row.location,
              "start_date": row.start_date,
              "end_date": row.end_date,
              "query": query,
              "type": type
            }
          } else {
            return {
              "cases": row.new_deaths,
              "location": row.location,
              "start_date": row.start_date,
              "end_date": row.end_date,
              "query": query,
              "type": type
            };
          }
        }
      }
    }

    return {
      "cases": 0,
      "location": location,
      "start_date": "2020-01-01",
      "end_date": "2020-12-01",
      "query": query,
      "type": type
    }
  }

  updateNewTotalState(event) {
    this.setState({ newTotal: event.target.value });
  }

  updateCasesDeathsState(event) {
    this.setState({ casesDeaths: event.target.value });
  }

  getPopulationCaseTotal(population, query, type, key) {
    // population: "STUDENT" or "FACULTY".  query: "total" or "new". type: "cases" or "deaths".
    let list = null;
    if (population === "STUDENT") {
      list = this.state.student_population;
    } else {
      list = this.state.faculty_population;
    }

    // let quotes = [
    //   "\"We must reopen in the fall with an on-campus experience.\" ~Alan Cramb",
    //   "\"They are all in close proximity to each other (definitely not 6 feet apart) and not wearing masks.\""
    //   "\"When I walked into my supposedly clean dorm room, there was hair everywhere. There was dried pasta on the floor. There was dirt everywhere. There was rust and mold in my shower.\""
    // ] 

    let cases;
    let start_date = "2020-12-31";
    let end_date;
    let body_text = "Placeholder body text";

    for (let row of list) {
      if ((row.week === row.max_week) && (row.pop === population)) {
        if (query === "total") {
          for (let first_row of list) {
            if (first_row.start_date < start_date) {
              start_date = first_row.start_date;
            }
          }
          end_date = row.end_date;
          if (type === "cases") {
            cases = row.total_cases;
            break;
          } else {
            cases = row.total_deaths;
            break;
          }
        } else { // New
          start_date = row.start_date;
          end_date = row.end_date;
          if (type === "cases") {
            cases = row.new_cases;
            break;
          } else {
            cases = row.new_deaths;
            break;
          }
        }
      }
    }

    let return_val = {
      "cases": cases,
      "population": population,
      "start_date": start_date,
      "end_date": end_date,
      "query": query,
      "type": type,
      "body_text": body_text,
      "key": key
    }
    return return_val;
  }

  render() {

    let radioStyle = {
      textAlign: "center",
      verticalAlign: "center"
    };


    let slides = [
      this.getPopulationCaseTotal("STUDENT", "total", "cases", 0),
      this.getPopulationCaseTotal("STUDENT", "new", "cases", 1),
      this.getPopulationCaseTotal("FACULTY", "total", "cases", 2),
      this.getPopulationCaseTotal("FACULTY", "new", "cases", 3)
    ];

    return <div className="Home">
      <AppNavBar
        currentPage="Home"
        homeClickFunction={this.state.homeClickFunction}
        dataClickFunction={this.state.dataClickFunction}
        contactClickFunction={this.state.contactClickFunction}
      />
      <Container>
        <h1>The Unofficial IIT COVID-19 Dashboard</h1>
        <h3>"Without students on our campus and in our housing, we are not financially viable." ~Alan Cramb</h3>
        <br />
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <StatsCarousel
              currentSlide="Start"
              slides={slides}
            />
          </Col>
        </Row>
        <hr />
        <br />
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h2>Cases and Deaths By Location</h2>
            <br />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 2 }}>
            <Form>
              <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                custom
                onChange={this.updateNewTotalState}
              >
                <option
                  value="new"
                >New
                </option>
                <option
                  value="total"
                >Total
                </option>
              </Form.Control>
            </Form>
          </Col>
          <Col md={{ span: 4 }}>
            <Form>
              <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                custom
                onChange={this.updateCasesDeathsState}
              >
                <option
                  value="cases"
                >Cases
                </option>
                <option
                  value="deaths"
                >Deaths
                </option>
              </Form.Control>
            </Form>
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
            {CaseNumberBox(this.getLocationCaseTotal("McCormick Student Village", "ins", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
          <Col md={{ span: 2 }}>
            {CaseNumberBox(this.getLocationCaseTotal("State Street Village", "ins", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
          <Col md={{ span: 2 }}>
            {CaseNumberBox(this.getLocationCaseTotal("Phi Kappa Sigma", "greek", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
          <Col md={{ span: 2 }}>
            {CaseNumberBox(this.getLocationCaseTotal("Delta Tau Delta", "greek", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 2, offset: 2 }}>
            {CaseNumberBox(this.getLocationCaseTotal("Kacek Hall", "ins", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
          <Col md={{ span: 2 }}>
            {CaseNumberBox(this.getLocationCaseTotal("Gunsalus Hall", "ins", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
          <Col md={{ span: 2 }}>
            {CaseNumberBox(this.getLocationCaseTotal("Alpha Sigma Alpha", "greek", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
          <Col md={{ span: 2 }}>
            {CaseNumberBox(this.getLocationCaseTotal("Kappa Phi Delta", "greek", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 2, offset: 2 }}>
            {CaseNumberBox(this.getLocationCaseTotal("Carmen Hall", "ins", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
          <Col md={{ span: 2, offset: 2 }}>
            {CaseNumberBox(this.getLocationCaseTotal("Pi Kappa Phi", "greek", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
          <Col md={{ span: 2 }}>
            {CaseNumberBox(this.getLocationCaseTotal("Triangle", "greek", this.state.newTotal, this.state.casesDeaths))}
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  }

}

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeClickFunction: props.homeClickFunction,
      dataClickFunction: props.dataClickFunction,
      contactClickFunction: props.contactClickFunction,
      student_population: props.data.student_population,
      faculty_population: props.data.faculty_population,
      ins_housing: props.data.ins_housing,
      greek_housing: props.data.greek_housing,
      locationFilter: "All",
      weekFilter: "All"
    }
  }

  render() {
    return (
      <div className="Data">
        <AppNavBar
          currentPage="Data"
          homeClickFunction={this.state.homeClickFunction}
          dataClickFunction={this.state.dataClickFunction}
          contactClickFunction={this.state.contactClickFunction}
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
              data={this.state.student_population}
            />
            <hr />
            <h3>Faculty Population</h3>
            <PopulationDataTable
              table="faculty"
              data={this.state.faculty_population}
            />
            <hr />
            <h3>Institutional Housing Statistics</h3>
            <LocationDataTable
              table="institutional"
              data={this.state.ins_housing} />
            <hr />
            <h3>Greek Housing Statistics</h3>
            <LocationDataTable
              table="greek"
              data={this.state.greek_housing} />
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
          <p>This project is maintained by Justin Schmitz. Please direct all inquiries to justin@iit.wtf.</p><br />
          <h1>Forking for Other Universities</h1>
          <p>If you're intersted in forking this software for your own university, and would like some help setting things up, please reach out. Doubtless my school isn't the only one without a useful dashboard, and this information can do social good. </p><br />
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
      start_filter: "2020-01-01",
      end_filter: "2020-12-31"
    }

    this.update_start_filter_state = this.update_start_filter_state.bind(this);
    this.update_end_filter_state = this.update_end_filter_state.bind(this);
    this.process_data_to_table = this.process_data_to_table.bind(this);
  }

  process_data_to_table() {
    let data = this.state.data;
    let data_headers = [
      "week",
      "start_date",
      "end_date",
      "new_cases",
      "new_deaths",
      "total_cases",
      "total_deaths"
    ]
    let jsx_data = [];
    for (const row of data) {
      let date = row.start_date;
      if (date >= this.state.start_filter && date <= this.state.end_filter) {
        let row_data = [];
        for (let header of data_headers) {
          row_data.push(<td>{row[header]}</td>)
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

    if (props.table === "greek") {
      locations = [
        "All",
        "Phi Kappa Sigma",
        "Delta Tau Delta",
        "Triangle",
        "Pi Kappa Phi",
        "Alpha Sigma Alpha",
        "Kappa Phi Delta"
      ]
    } else if (props.table === "institutional") {
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
    let data_headers = [
      "week",
      "start_date",
      "end_date",
      "location",
      "new_cases",
      "new_deaths",
      "total_cases",
      "total_deaths"
    ]
    for (const row of data) {
      let date = row.start_date;
      let location = row.location;
      if (this.state.location_filter === "All" || location === this.state.location_filter) {
        if (date >= this.state.start_filter && date <= this.state.end_filter) {
          let row_data = [];
          for (let header of data_headers) {
            row_data.push(<td>{row[header]}</td>)
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

const CarouselStatsItem = ({ cases, population, type, start_date, end_date, body_text, key }) => {
  let width = window.innerWidth;
  let heading_text = "New " + population.toLowerCase() + " " + type + "\nFrom " + start_date + " to " + end_date;

  return (
    <Carousel.Item key={key}>
      <img
        className="d-block w-100"
        src={"http://www.iit.wtf:8000/number_image/" + cases + "/" + heading_text}
        alt={heading_text}
      />
      {/* <Carousel.Caption>
        <h1 style={{position: "relative", top: 0}}>{cases}</h1>
        <p>{heading_text}</p>
      </Carousel.Caption> */}
    </Carousel.Item>
  )
}


class StatsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: props.slides
    }

    this.render_slides = this.render_slides.bind(this);
  }

  render_slides() {
    let slides = [];
    for (let slide_key in this.state.slides) {
      let slide = this.state.slides[slide_key];
      slides.push(CarouselStatsItem(slide));
    }
    return slides;
  }

  render() {
    return (
      <Carousel>
        {this.render_slides()}
      </Carousel>
    )
  }
}

const CaseNumberBox = ({ cases, location, start_date, end_date, query, type }) => {
  if (cases === 0) {
    return (
      <Card style={{ width: '10rem' }}>
        <Card.Body>
          <Card.Title>{cases}</Card.Title>
          <Card.Subtitle>{location}</Card.Subtitle>
          <Card.Text>No cases reported as of 2020-09-01</Card.Text>
        </Card.Body>
      </Card>
    )
  } else {
    return (
      <Card style={{ width: '10rem' }}>
        <Card.Body>
          <Card.Title>{cases}</Card.Title>
          <Card.Subtitle>{location}</Card.Subtitle>
          <Card.Text>{capitalizeFirstLetter(query) + " " + type + " from " + start_date + " to " + end_date}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export default App;


// Sources:

// Generating images with the info: 
// https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas