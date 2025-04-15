import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import "../../src/pagination.css";

function View() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetching products failed:", error);
    }
  };

  const deletePro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Delete failed: ${response.status}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert("Failed to delete the product.");
    }
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Container
      fluid
      style={{
        background: "linear-gradient(135deg, #6b46c1 0%, #e53e3e 100%)",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <Row className="w-100 m-0 align-items-start">
       
        <Col
          xs={12}
          md={3}
          className="p-3 mb-4 mb-md-0"
          style={{
            backgroundColor: "#2d3748",
            borderRadius: "10px",
            boxShadow: "5px 0 20px rgba(0, 0, 0, 0.3)",
            height: "fit-content",
            position: "sticky",
            top: "2rem",
            maxWidth: "280px",
            zIndex: 1,
          }}
        >
          <h3
            style={{
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "1.2rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "1rem",
            }}
          >
            Filter Products
          </h3>
          <Form.Group className="mb-3">
            <Form.Label
              style={{
                fontWeight: "600",
                color: "#ffffff",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Search
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#4a5568",
                padding: "10px",
                fontSize: "0.85rem",
                color: "#ffffff",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label
              style={{
                fontWeight: "600",
                color: "#ffffff",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Category
            </Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#4a5568",
                padding: "10px",
                fontSize: "0.85rem",
                color: "#ffffff",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat} style={{ color: "#1a202c" }}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        
        <Col xs={12} md={9} className="p-3">
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "15px",
              padding: "1.5rem",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              marginLeft: "20px",
            }}
          >
            
            {totalPages > 1 && (
              <Row className="mb-3">
                <Col className="d-flex justify-content-center">
                  <Pagination
                    style={{
                      backgroundColor: "#edf2f7",
                      borderRadius: "10px",
                      padding: "0.25rem",
                      boxShadow: "0 3px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Pagination.Prev
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      style={{
                        borderRadius: "8px",
                        margin: "0 2px",
                        backgroundColor: "#8968cd",
                        color: "#2d3748",
                        padding: "5px 10px",
                      }}
                    />
                    {[...Array(totalPages)].map((_, i) => (
                      <Pagination.Item
                        key={i}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                        style={{
                          borderRadius: "8px",
                          margin: "0 2px",
                          backgroundColor:
                            i + 1 === currentPage ? "#875692" : "#8968cd",
                          color: i + 1 === currentPage ? "#8968cd" : "#875692",
                          border: "none",
                          padding: "5px 10px",
                        }}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      style={{
                        borderRadius: "8px",
                        margin: "0 2px",
                        backgroundColor: "#8968cd",
                        color: "#2d3748",
                        padding: "5px 10px",
                      }}
                    />
                  </Pagination>
                </Col>
              </Row>
            )}

           
            <Row className="gx-3 gy-3 justify-content-center">
              {currentProducts.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #e6e6fa, #d8bfd8)",
                      borderRadius: "15px",
                      padding: "1.5rem",
                      position: "relative",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                      height: "100%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(0, 0, 0, 0.15)";
                      e.currentTarget.style.transform = "rotate(2deg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.transform = "rotate(0deg)";
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        margin: "0 auto 1rem auto",
                        border: "4px solid #6b46c1",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = "scale(1.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/120?text=Image+Not+Found")
                        }
                      />
                    </div>
                    <Badge
                      className="custom-badge" 
                      style={{
                        backgroundColor: "rgb(107, 70, 193) !important", 
                        color: "#ffffff", 
                        padding: "0.2rem 0.4rem",
                        fontSize: "0.65rem",
                        fontWeight: "600",
                        borderRadius: "4px",
                        marginBottom: "0.5rem",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      {product.category}
                    </Badge>
                    <h6
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#2d3748",
                        margin: "0 0 0.25rem 0",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                      }}
                    >
                      {product.title}
                    </h6>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "#718096",
                        margin: "0 0 0.5rem 0",
                        textAlign: "center",
                      }}
                    >
                      {product.description.length > 25
                        ? product.description.substring(0, 25) + "..."
                        : product.description}
                    </p>
                    <span
                      style={{
                        color: "#e53e3e",
                        fontWeight: "700",
                        fontSize: "0.9rem",
                        display: "block",
                        textAlign: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      ₹{product.price}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Link to={`/update/${product.id}`}>
                        <Button
                          style={{
                            backgroundColor: "#6b46c1",
                            border: "none",
                            borderRadius: "15px",
                            padding: "5px 10px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            color: "#ffffff",
                            textTransform: "uppercase",
                            boxShadow: "0 2px 6px rgba(107, 70, 193, 0.3)",
                            transition: "all 0.3s ease",
                            flex: 1,
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#553c9a")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#6b46c1")
                          }
                        >
                          Edit
                        </Button>
                      </Link>
                      <Link to={`/product/${product.id}`}>
                        <Button
                          style={{
                            backgroundColor: "#875692",
                            border: "none",
                            borderRadius: "15px",
                            padding: "5px 10px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            color: "#ffffff",
                            textTransform: "uppercase",
                            boxShadow: "0 2px 6px rgba(49, 130, 206, 0.3)",
                            transition: "all 0.3s ease",
                            flex: 1,
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#8968cd")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#875692")
                          }
                        >
                          Details
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deletePro(product.id)}
                        style={{
                          backgroundColor: "#e53e3e",
                          border: "none",
                          borderRadius: "15px",
                          width: "40px",
                          height: "30px",
                          display: "flex",
                          alignitems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          color: "#ffffff",
                          boxShadow: "0 2px 6px rgba(229, 62, 62, 0.3)",
                          transition: "all 0.3s ease",
                          textTransform: "uppercase",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#c53030")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#e53e3e")
                        }
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default View;