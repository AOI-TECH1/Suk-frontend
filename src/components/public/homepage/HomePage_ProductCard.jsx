import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Heart, Eye } from "react-bootstrap-icons";

// Import your API helper
import { getAllProducts } from "../../../api/productApi";

function ProductSection() {
  // 1. Create state to hold the info pulled from backend
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Pull the info when the component loads
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getAllProducts();
        // Django returns the data in res.data
        setProducts(res.data);
      } catch (error) {
        console.error("Error pulling products from SuK backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  // 3. Show a spinner while the info is being pulled
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-2">Loading SuK Products...</p>
      </div>
    );
  }

  return (
    <section className="py-5 bg-light">
      <Container>
        {/* Section Title */}
        <h2 className="text-center mb-4">Explore Our Products</h2>

        <Row>
          {products.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="position-relative h-100 shadow-sm">
                
                {/* NEW Badge - checking the field from your Django model */}
                {product.is_new && (
                  <span
                    className="badge bg-success position-absolute"
                    style={{ top: "10px", left: "10px", zIndex: 10 }}
                  >
                    NEW
                  </span>
                )}

                {/* Icons */}
                <div
                  className="position-absolute d-flex flex-column gap-2"
                  style={{ top: "10px", right: "10px", zIndex: 10 }}
                >
                  <Button variant="light" size="sm">
                    <Heart size={16} />
                  </Button>
                  <Button variant="light" size="sm">
                    <Eye size={16} />
                  </Button>
                </div>

                {/* Product Image - pulling from 'main_image' (Cloudinary URL) */}
                <Card.Img
                  variant="top"
                  src={product.main_image} 
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    padding: "15px"
                  }}
                />

                <Card.Body>
                  {/* Product Name */}
                  <Card.Title style={{ fontSize: "16px" }}>
                    {product.name}
                  </Card.Title>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-success fw-bold">
                       ₦{Number(product.final_price).toLocaleString()}
                    </span>

                    {/* Only show old price if a discount exists */}
                    {product.price > product.final_price && (
                      <span className="text-muted text-decoration-line-through ms-2">
                         ₦ {Number(product.price).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="mb-2 text-warning">
                    ⭐⭐⭐⭐⭐
                    <span className="text-muted ms-1">
                      ({product.review_count || 0})
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <Button
                    variant="warning"
                    className="w-100 text-white rounded-pill"
                  >
                    🛒 Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ProductSection;