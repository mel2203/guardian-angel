import { Container, Row, Col, Card } from "react-bootstrap";
import { devices } from "../data/devices";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [activeFilter, setActiveFilter] = useState("all");

  function logout() {
    authContext.setIsLoggedIn(false);
    navigate("/login");
  }

  const onlineCount = devices.filter((d) => d.status === "online").length;
  const offlineCount = devices.filter((d) => d.status === "offline").length;

  const filteredDevices =
    activeFilter === "all"
      ? devices
      : devices.filter((d) => d.type === activeFilter);

  const filters = ["all", "camera", "door", "motion"];

  return (
    <>
      <nav className="ga-navbar">
        <span className="ga-logo">🛡 Guardian Angel</span>
        <button className="btn btn-outline-light btn-sm" onClick={logout}>
          Log Out
        </button>
      </nav>

      <Container className="py-4">
        <Row className="mb-4">
          <Col md={6}>
            <div className="stat-card stat-online">
              <span className="stat-number">{onlineCount}</span>
              <span className="stat-label">Online</span>
            </div>
          </Col>
          <Col md={6}>
            <div className="stat-card stat-offline">
              <span className="stat-number">{offlineCount}</span>
              <span className="stat-label">Offline</span>
            </div>
          </Col>
        </Row>

        <div className="filter-row mb-4">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-chip ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <Row>
          {filteredDevices.map((device) => (
            <Col md={4} className="mb-3" key={device.id}>
              <Card className="device-card">
                <Card.Img
                  variant="top"
                  src={device.image}
                  alt={device.name}
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title className="mb-0">{device.name}</Card.Title>
                    <span className={`status-pill ${device.status}`}>
                      {device.status}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
