import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://us-central1-test1-304600.cloudfunctions.net/userdata");
      res
      .json()
      .then( res => {setUserData(res)});
    }

    fetchData();
  }, []);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://us-central1-test1-304600.cloudfunctions.net/chartdata");
      res
      .json()
      .then( res => {setChartData(res)});
    }

    fetchData();
  }, []);


  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Water Waste</p>
                      <Card.Title as="h4">{userData.WaterUsage}L</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last Month
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">CO2 Emission</p>
                      <Card.Title as="h4">{userData.CarbonEmission}L</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last Month
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Land Use</p>
                      <Card.Title as="h4">{userData.LandUsage} Acres</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last Month
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Methane Emission</p>
                      <Card.Title as="h4">{userData.MethaneEmission}L</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last Month
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Enviromental Impact</Card.Title>
                <p className="card-category">Last month performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "week1",
                        "week2",
                        "week3",
                        "week4"
                      ],
                      series: [
                        chartData.map(data => data.CarbonEmission),
                        chartData.map(data => data.LandUsage),
                        chartData.map(data => data.MethanEmission),
                        chartData.map(data => data.WaterUsage)
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  CarbonEmission
                  <i className="fas fa-circle text-danger"></i>
                  LandUsage
                  <i className="fas fa-circle text-warning"></i>
                  MethanEmission
                  <i className="fas fa-circle text-primary"></i>
                  WaterUsage
                </div>
                <hr></hr>
                {/* <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">REDUCE YOUR CARBON FOOTPRINT</Card.Title>
                <p className="card-category">Join the companies below in the footprint-reduction movement </p>
              </Card.Header>
              <Card.Body>
                <p><a href="https://hmgroup.com/sustainability/circular-and-climate-positive/recycling/">Visit H&M!</a></p>
                <p><a href="https://www.thenorthface.com/about-us/responsibility/product/clothes-the-loop.html">Visit The North Face!</a></p>
                <p><a href="https://www.patagonia.com/our-footprint/recycled-polyester.html">Visit Patagonia!</a></p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
