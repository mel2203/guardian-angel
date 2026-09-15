import { Container, Row, Col, Card } from "react-bootstrap";
import { devices } from "../data/devices";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate(); //allows navigation between pages
  const authContext = useContext(AuthContext); //whiteboard
  const [activeFilter, setActiveFilter] = useState("all"); //usestate for filtering

  function logout() {
    //global state is false
    authContext.setIsLoggedIn(false);
    navigate("/login");
  }

  const onlineCount = devices.filter(
    (device) => device.status === "online",
  ).length;
  const offlineCount = devices.filter(
    (device) => device.status === "offline",
  ).length;

  //similar to mission 5, if state is all, render all devices, else render only filtered devices
  const filteredDevices =
    activeFilter === "all"
      ? devices
      : devices.filter((device) => device.type === activeFilter);

  const filters = ["all", "camera", "door", "motion"];

  return (
    <>
      {/*for the top part of the dashboard (ie logos and logout button) */}
      <nav className="ga-navbar">
        <div className="ga-logo">
          <img
            src="guardian-angel-logo.png"
            alt="Guardian Angel Logo"
            className="ga-logo-image"
          />
          <span className="ga-logo">Guardian Angel</span>
        </div>
        <button className="btn btn-outline-light btn-sm" onClick={logout}>
          Log Out
        </button>
      </nav>

      {/**wWelcome container to greet user */}
      <Container className="py-4">
        <Row className="mb-4">
          <Col md={12}>
            <div className="welcome-banner">
              <h2 className="welcome-title">Welcome back !</h2>
              <p className="welcome-subtitle">
                View your security status using Guardian Angel.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/*For the online offline count cards */}

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

          {/*Filtering the types of devices */}
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
        {/*Same as mission 6, filters map over all the types, and then example of user presses camera, uonly render cameras*/}

        {/*loops over filtred decices and displays them as cards in column grid
         */}

        <Row>
          {filteredDevices.map((device) => (
            <Col md={4} className="mb-3" key={device.id}>
              <Card className="device-card">
                <div
                  className="device-icon-tile p-0"
                  style={{ overflow: "hidden" }}
                >
                  <img
                    src={device.image}
                    alt={device.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
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

        <Row className="mt-5">
          <Col md={12}>
            <h5
              className="mb-3"
              style={{
                fontSize: "0.95rem",
                color: "var(--ga-ink-soft)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Recent System Events
            </h5>
            <div className="stat-card p-0">
              <ul className="list-group list-group-flush bg-transparent">
                <li
                  className="list-group-item bg-transparent text-light border-bottom border-secondary d-flex justify-content-between align-items-center py-3"
                  style={{ borderColor: "var(--ga-line) !important" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="status-pill online">INFO</span>
                    <span>Front Entry Camera pinged successfully.</span>
                  </div>
                  <span
                    style={{ color: "var(--ga-ink-soft)", fontSize: "0.8rem" }}
                  >
                    2 mins ago
                  </span>
                </li>
                <li className="list-group-item bg-transparent text-light border-0 d-flex justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center gap-3">
                    <span className="status-pill offline">ALERT</span>
                    <span>Back Door Sensor disconnected.</span>
                  </div>
                  <span
                    style={{ color: "var(--ga-ink-soft)", fontSize: "0.8rem" }}
                  >
                    14 mins ago
                  </span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
