import React, { useState, useEffect } from "react";

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
} from "react-bootstrap";

function TableList() {
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
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Environmental Impact</Card.Title>
                <p className="card-category">
                  You can save the world
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Week</th>
                      <th className="border-0">Water waste</th>
                      <th className="border-0">CO2 Emission</th>
                      <th className="border-0">Land Use</th>
                      <th className="border-0">Methane Emission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      chartData.map((data, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{data.WaterUsage}</td>
                            <td>{data.CarbonEmission}</td>
                            <td>{data.LandUsage}</td>
                            <td>{data.MethanEmission}</td>
                          </tr>
                        )
                      })
                    }

                    {/* <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr> */}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
