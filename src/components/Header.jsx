import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(135deg, #6b46c1 0%, #e53e3e 100%)", // Matches View's background gradient
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)", // Consistent shadow
        padding: "1rem 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontSize: "1.2rem", // Matches View's heading size
            fontWeight: "700",
            letterSpacing: "1px",
            textTransform: "uppercase", // Consistent with View's filter labels
            color: "#ffffff", // White for contrast
          }}
        >
          <span style={{ color: "#ffffff" }}>Shop</span>
          <span style={{ color: "#d8bfd8" }}>Now</span> {/* Subtle purple shade from View */}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ border: "none", color: "#ffffff" }} // White toggle for visibility
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto"
            style={{
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Link to="/add">
              <Button
                style={{
                  backgroundColor: "#6b46c1", // Purple from View's buttons
                  border: "none",
                  color: "#ffffff",
                  padding: "5px 10px", // Smaller padding like View's buttons
                  borderRadius: "15px", // Rounded like View
                  fontSize: "0.75rem", // Matches View's button text
                  fontWeight: "600",
                  textTransform: "uppercase", // Consistent with View
                  boxShadow: "0 2px 6px rgba(107, 70, 193, 0.3)", // Shadow from View
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#553c9a"; // Darker purple hover from View
                  e.target.style.boxShadow = "0 4px 12px rgba(107, 70, 193, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#6b46c1";
                  e.target.style.boxShadow = "0 2px 6px rgba(107, 70, 193, 0.3)";
                }}
              >
                Add Products
              </Button>
            </Link>
            <Link to="/">
              <Button
                style={{
                  backgroundColor: "#875692", // Alternate purple from View
                  border: "none",
                  color: "#ffffff",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  boxShadow: "0 2px 6px rgba(49, 130, 206, 0.3)", // Shadow from View's Details button
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#8968cd"; // Lighter purple hover from View
                  e.target.style.boxShadow = "0 4px 12px rgba(49, 130, 206, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#875692";
                  e.target.style.boxShadow = "0 2px 6px rgba(49, 130, 206, 0.3)";
                }}
              >
                View Products
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;