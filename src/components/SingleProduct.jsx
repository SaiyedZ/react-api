import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Badge,
  Spinner,
  Form,
  Button,
} from "react-bootstrap";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:3000/reviews?productId=${id}`);
      const data = await res.json();
      setReviews(data.reverse());
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || !reviewer.trim() || rating === 0) return;

    const newReview = {
      productId: Number(id),
      reviewer,
      text: reviewText,
      rating,
    };

    try {
      const res = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      const savedReview = await res.json();
      setReviews([savedReview, ...reviews]);
      setReviewText("");
      setReviewer("");
      setRating(0);
    } catch (err) {
      console.error("Error saving review:", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3000/reviews/${reviewId}`, {
        method: "DELETE",
      });
      setReviews(reviews.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" style={{ color: "#6b46c1" }} />
      </Container>
    );
  }

  return (
    <Container
      fluid
      style={{
        background: "linear-gradient(135deg, #6b46c1 0%, #e53e3e 100%)",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <Row className="w-100 m-0">
        
        <Col xs={12} lg={8} className="mb-4 mb-lg-0">
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "15px",
              padding: "1.5rem",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            
            <Row className="g-4">
              <Col xs={12} className="text-center">
                <div
                  style={{
                    background: "linear-gradient(135deg, #e6e6fa, #d8bfd8)",
                    borderRadius: "15px",
                    padding: "1.5rem",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    maxWidth: "400px",
                    margin: "0 auto",
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
                      width: "100%",
                      maxWidth: "300px",
                      height: "300px",
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
                          "https://via.placeholder.com/300?text=Image+Not+Found")
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col xs={12}>
                <hr
                  style={{
                    borderColor: "#e2e8f0",
                    margin: "1rem 0",
                  }}
                />
                <div className="text-center">
                  <h1
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      color: "#2d3748",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {product.title}
                  </h1>
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
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#718096",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {product.description}
                  </p>
                  <span
                    style={{
                      color: "#e53e3e",
                      fontWeight: "700",
                      fontSize: "0.9rem",
                      display: "block",
                      marginBottom: "1rem",
                    }}
                  >
                    ₹{product.price}
                  </span>
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <div className="d-flex gap-1 me-3">
                      {[...Array(5)].map((_, i) => (
                        <IoIosStar
                          key={i}
                          color={
                            i < Math.round(averageRating) ? "gold" : "#ccc"
                          }
                          size={20}
                        />
                      ))}
                    </div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#718096",
                      }}
                    >
                      {averageRating} / 5 ({totalReviews} reviews)
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
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
                        maxWidth: "150px",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#553c9a")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#6b46c1")
                      }
                    >
                      Add to Cart
                    </Button>
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
                        maxWidth: "150px",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#8968cd")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#875692")
                      }
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

           
            {reviews.length > 0 && (
              <div className="mt-5">
                <div
                  style={{
                    background: "linear-gradient(135deg, #e6e6fa, #d8bfd8)",
                    borderRadius: "15px",
                    padding: "1.5rem",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3
                    style={{
                      color: "#2d3748",
                      fontWeight: "700",
                      fontSize: "1.2rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "1rem",
                    }}
                  >
                    Customer Reviews
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#718096",
                      marginBottom: "1rem",
                    }}
                  >
                    {totalReviews} review{totalReviews !== 1 ? "s" : ""} |
                    Average Rating: <strong>{averageRating}/5</strong>
                  </p>
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        padding: "0.75rem 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ flex: "1 1 70%" }}>
                        <strong
                          style={{
                            color: "#2d3748",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            display: "block",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {review.reviewer}
                        </strong>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.25rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {[...Array(5)].map((_, i) =>
                            i < review.rating ? (
                              <IoIosStar key={i} color="gold" size={16} />
                            ) : (
                              <IoIosStarOutline
                                key={i}
                                color="#ccc"
                                size={16}
                              />
                            )
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#718096",
                            margin: "0",
                          }}
                        >
                          {review.text}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleDeleteReview(review.id)}
                        style={{
                          backgroundColor: "#e53e3e",
                          border: "none",
                          borderRadius: "15px",
                          padding: "5px 10px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          color: "#ffffff",
                          textTransform: "uppercase",
                          boxShadow: "0 2px 6px rgba(229, 62, 62, 0.3)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#c53030")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#e53e3e")
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Col>

       
        <Col xs={12} lg={4}>
          <div
            style={{
              background: "linear-gradient(135deg, #e6e6fa, #d8bfd8)",
              borderRadius: "15px",
              padding: "1.5rem",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              position: "sticky",
              top: "2rem",
            }}
          >
            <h3
              style={{
                color: "#2d3748",
                fontWeight: "700",
                fontSize: "1.2rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "1rem",
              }}
            >
              Leave a Review
            </h3>
            <Form onSubmit={handleReviewSubmit}>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#2d3748",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Your Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={reviewer}
                  onChange={(e) => setReviewer(e.target.value)}
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#edf2f7",
                    padding: "10px",
                    fontSize: "0.85rem",
                    color: "#2d3748",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#2d3748",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Rating
                </Form.Label>
                <div className="d-flex gap-2">
                  {[...Array(5)].map((_, i) => {
                    const currentRating = i + 1;
                    return (
                      <span
                        key={i}
                        onClick={() => setRating(currentRating)}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        style={{ cursor: "pointer", fontSize: "24px" }}
                      >
                        {currentRating <= (hover || rating) ? (
                          <IoIosStar color="gold" />
                        ) : (
                          <IoIosStarOutline color="#ccc" />
                        )}
                      </span>
                    );
                  })}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#2d3748",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Review
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#edf2f7",
                    padding: "10px",
                    fontSize: "0.85rem",
                    color: "#2d3748",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                    resize: "vertical",
                  }}
                />
              </Form.Group>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#6b46c1",
                  border: "none",
                  borderRadius: "15px",
                  padding: "10px 20px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  boxShadow: "0 2px 6px rgba(107, 70, 193, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#553c9a")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#6b46c1")
                }
              >
                Submit Review
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SingleProduct;
