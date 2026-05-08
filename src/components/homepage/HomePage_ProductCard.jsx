import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from "react-bootstrap";

import { Heart, Eye } from "react-bootstrap-icons";
import camera from "../../assets/images/Canon Camera.png";
import laptop from "../../assets/images/laptop.png";
import boot from "../../assets/images/boot.png";
import gamepad from "../../assets/images/Game-pads.png";


// Temporary Products (will come from backend later)
const sampleProducts = [

  {
    id: 1,
    name: "Canon Camera",
    price: 30000,
    final_price: 25000,
    review_count: 75,
    image: camera,
    is_new: true,
  },

  {
    id: 2,
    name: "Gaming Laptop",
    price:300000,
    final_price: 250000,
    review_count: 42,
    image: laptop,
    is_new: false,
  },

  {
    id: 3,
    name: "Football Boot",
    price: 30000,
    final_price: 25000,
    review_count: 33,
    image: boot,
    is_new: true,
  },

  {
    id: 4,
    name: "Game Controller",
    price: 10000,
    final_price: 8000,
    review_count: 21,
    image: gamepad,
    is_new: false,
  }

];


// Product Section Component
function ProductSection() {

  return (

    <section className="py-5 bg-light">

      <Container>

        {/* Section Title */}
        <h2 className="text-center mb-4">
          Explore Our Products
        </h2>

        <Row>

          {sampleProducts.map((product) => (

            <Col
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >

              <Card className="position-relative h-100 shadow-sm">

                {/* NEW Badge */}
                {product.is_new && (
                  <span
                    className="badge bg-success position-absolute"
                    style={{
                      top: "10px",
                      left: "10px"
                    }}
                  >
                    NEW
                  </span>
                )}

                {/* Icons */}
                <div
                  className="position-absolute d-flex flex-column gap-2"
                  style={{
                    top: "10px",
                    right: "10px"
                  }}
                >

                  <Button variant="light" size="sm">
                    <Heart size={16} />
                  </Button>

                  <Button variant="light" size="sm">
                    <Eye size={16} />
                  </Button>

                </div>

                {/* Product Image */}
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    padding: "15px"
                  }}
                />

                <Card.Body>

                  {/* Product Name */}
                  <Card.Title
                    style={{ fontSize: "16px" }}
                  >
                    {product.name}
                  </Card.Title>

                  {/* Price */}
                  <div className="mb-2">

                    <span className="text-success fw-bold">
                       ₦{product.final_price}
                    </span>

                    {product.price && (
                      <span className="text-muted text-decoration-line-through ms-2">
                         ₦ {product.price}
                      </span>
                    )}

                  </div>

                  {/* Rating */}
                  <div className="mb-2 text-warning">

                    ⭐⭐⭐⭐⭐

                    <span className="text-muted ms-1">
                      ({product.review_count})
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
