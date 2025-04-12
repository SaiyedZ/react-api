import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const [category] = useState(["Makeup", "Men", "Female", "Electronics"]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  const getInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    try {
      const addProduct = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (addProduct.ok) {
        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/"), 2200); 
      } else {
        toast.error("Failed to add product.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #6b46c1 0%, #e53e3e 100%)",
        padding: "0",
      }}
    >
      <ToastContainer />
      <Row className="w-100" style={{ maxWidth: "600px", margin: "0" }}>
        <Col
          xs={12}
          className="p-5"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Form onSubmit={submitProduct}>
            <Row className="gy-4">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label
                    style={{
                      fontWeight: "600",
                      color: "#2d3748",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Product Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="e.g., Premium Headphones"
                    onChange={getInput}
                    required
                    style={{
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#edf2f7",
                      padding: "14px",
                      fontSize: "0.95rem",
                      color: "#1a202c",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label
                    style={{
                      fontWeight: "600",
                      color: "#2d3748",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Price (₹)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="e.g., 2999"
                    onChange={getInput}
                    required
                    min="0"
                    style={{
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#edf2f7",
                      padding: "14px",
                      fontSize: "0.95rem",
                      color: "#1a202c",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label
                    style={{
                      fontWeight: "600",
                      color: "#2d3748",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Category
                  </Form.Label>
                  <Form.Select
                    name="category"
                    onChange={getInput}
                    required
                    style={{
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#edf2f7",
                      padding: "14px",
                      fontSize: "0.95rem",
                      color: "#1a202c",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <option value="">Choose a category</option>
                    {category.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label
                    style={{
                      fontWeight: "600",
                      color: "#2d3748",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Image URL
                  </Form.Label>
                  <Form.Control
                    type="url"
                    name="image"
                    placeholder="e.g., https://example.com/product.jpg"
                    onChange={getInput}
                    required
                    style={{
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#edf2f7",
                      padding: "14px",
                      fontSize: "0.95rem",
                      color: "#1a202c",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label
                    style={{
                      fontWeight: "600",
                      color: "#2d3748",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={4}
                    placeholder="Tell us about the product..."
                    onChange={getInput}
                    required
                    style={{
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#edf2f7",
                      padding: "14px",
                      fontSize: "0.95rem",
                      color: "#1a202c",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                      resize: "vertical",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-5 d-flex justify-content-start">
              <Button
                type="submit"
                style={{
                  backgroundColor: "#e53e3e",
                  border: "none",
                  borderRadius: "50px",
                  padding: "12px 40px",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  boxShadow: "0 5px 15px rgba(229, 62, 62, 0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#c53030")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#e53e3e")
                }
              >
                Submit Product
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProduct;