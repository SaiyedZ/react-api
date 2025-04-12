import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Alert,
  Image,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";

function Update() {
  const [category] = useState(["Makeup", "Men", "Female", "Electronics"]);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setImagePreview(data.image || "");
      } catch (err) {
        setError(err.message);
        toast.error("Error fetching product details");
        console.log("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const getInput = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    if (name === "image") {
      setImagePreview(value);
    }
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    if (!product.title || !product.price || !product.category) {
      setError("Please fill in all required fields");
      toast.warn("Please fill all required fields!");
      return;
    }

    const updatedProduct = {
      ...product,
      price: Math.round(Number(product.price)),
    };

    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) throw new Error("Failed to update product");
      toast.success("Product updated successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to update product.");
      console.log("Error updating product:", err);
    } finally {
      setIsLoading(false);
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
                <Form.Group controlId="productTitle">
                  <Form.Label className="form-label">Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={product.title || ""}
                    placeholder="e.g., Premium Headphones"
                    onChange={getInput}
                    required
                    isInvalid={!product.title && error}
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">
                    Title is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="productPrice">
                  <Form.Label className="form-label">Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={product.price || ""}
                    placeholder="e.g., 2999"
                    onChange={getInput}
                    required
                    min="0"
                    isInvalid={!product.price && error}
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">
                    Price is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="productCategory">
                  <Form.Label className="form-label">Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={product.category || ""}
                    onChange={getInput}
                    required
                    isInvalid={!product.category && error}
                    className="form-control"
                  >
                    <option value="">Choose a category</option>
                    {category.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Category is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="productImage">
                  <Form.Label className="form-label">Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="image"
                    value={product.image || ""}
                    placeholder="e.g., https://example.com/product.jpg"
                    onChange={getInput}
                    className="form-control"
                  />
                </Form.Group>
              </Col>

              {imagePreview && (
                <Col xs={12} className="text-center">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                    onError={() => setImagePreview("")}
                  />
                </Col>
              )}

              <Col xs={12}>
                <Form.Group controlId="productDescription">
                  <Form.Label className="form-label">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={product.description || ""}
                    placeholder="Enter product description"
                    onChange={getInput}
                    className="form-control"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-5 d-flex justify-content-start">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/")}
                disabled={isLoading}
                className="me-3"
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
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
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
                }}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" animation="border" className="me-2" />
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
            </div>
          </Form>

          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setError(null)}
              className="mt-3"
            >
              {error}
            </Alert>
          )}

          {isLoading && !error && (
            <div className="text-center mt-3">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Update;
