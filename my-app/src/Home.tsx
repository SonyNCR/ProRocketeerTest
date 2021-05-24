import React, { useEffect, useState } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import Post from "./Models/Post";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const tableRows = posts.map((post) => (
    <tr>
      <td>{post.userId}</td>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.body}</td>
    </tr>
  ));
  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  });
  return (
    <div>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Row>
            <Col md={{ span: 1, offset: 11 }}>
              <Button>New +</Button>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User ID</th>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
