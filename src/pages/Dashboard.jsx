import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { devices } from "../data/devices";

export default function Dashboard() {
  return (
    <Container>
      <h1 className="my-3">Guardian Angel Dashboard</h1>
      <Row>
        {devices.map((device) => (
          <Col md={4} className="mb-3" key={device.id}>
            <Card>
              <Card.Body>
                <Card.Title>{device.name}</Card.Title>
                <Badge bg={device.status === "online" ? "success" : "danger"}>
                  {device.status}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

//.map() runs once per object in the array, returning one <Col><Card>...</Card></Col> per device
//bg={device.status === "online" ? "success" : "danger"} — a ternary picking the Bootstrap badge color based on that device's status: green for online, red for offline.
