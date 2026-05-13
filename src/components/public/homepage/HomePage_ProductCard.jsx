import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { Heart, Eye } from "react-bootstrap-icons";

// Import your API helper
import { getAllProducts } from "../../../api/productApi";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getAllProducts();
        
        // --- DEBUG LOGS ---
        console.log("Full API Response:", res);
        console.log("Product Data pulled:", res.data);
        
        if (res.data.length === 0) {
          console.warn("Backend returned 200 OK, but the product list is empty []");
        }
        // ------------------

        setProducts(res.data);
      } catch (error) {
        // --- ERROR LOGS ---
        console.error("Error pulling products from SuK backend:");
        if (error.response) {
          console.error("Data:", error.response.data);
          console.error("Status:", error.response.status);
          setError(`Backend Error: ${error.response.status}`);
        } else if (error.request) {
          console.error("Request made but no response received");
          setError("No response from server. Check if Django is running.");
        } else {
          console.error("Error Message:", error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-2 text-muted uppercase font-bold text-xs">Fetching SuK Inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Connection Issue</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5 fw-bold">Explore Our Products</h2>

        {products.length === 0 ? (
          <div className="text-center py-5 border rounded bg-white">
            <p className="text-muted">No active products found in the database.</p>
          </div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="position-relative h-100 shadow-sm border-0">
                  
                  {/* NEW Badge */}
                  {product.is_new && (
                    <span
                      className="badge bg-success position-absolute"
                      style={{ top: "15px", left: "15px", zIndex: 10 }}
                    >
                      NEW
                    </span>
                  )}

                  {/* Action Icons */}
                  <div
                    className="position-absolute d-flex flex-column gap-2"
                    style={{ top: "15px", right: "15px", zIndex: 10 }}
                  >
                    <Button variant="white" className="shadow-sm rounded-circle p-2 bg-white">
                      <Heart size={16} className="text-danger" />
                    </Button>
                    <Button variant="white" className="shadow-sm rounded-circle p-2 bg-white">
                      <Eye size={16} />
                    </Button>
                  </div>

                  {/* Product Image - Field names adjusted for typical Django Serializer names */}
                  <Card.Img
                    variant="top"
                    src={product.product_image || product.main_image} 
                    style={{
                      height: "220px",
                      objectFit: "contain",
                      padding: "20px",
                      backgroundColor: "#f8f9fa"
                    }}
                  />

                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-dark truncate" style={{ fontSize: "15px" }}>
                      {product.name}
                    </Card.Title>

                    <div className="mt-auto">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        {/* Displaying prices based on your screenshot's field names */}
                        <span className="text-success fw-bold fs-5">
                          ₦{Number(product.discounted_price || product.final_price || product.price).toLocaleString()}
                        </span>

                        {product.discounted_price && product.price > product.discounted_price && (
                          <span className="text-muted text-decoration-line-through small">
                            ₦{Number(product.price).toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="mb-3 text-warning small">
                        ⭐⭐⭐⭐⭐
                        <span className="text-muted ms-1">({product.review_count || 0})</span>
                      </div>

                      <Button
                        variant="warning"
                        className="w-100 text-dark fw-bold rounded-3 py-2"
                      >
                        🛒 Add to cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

export default ProductSection;