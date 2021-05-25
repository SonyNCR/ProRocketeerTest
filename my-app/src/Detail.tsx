import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useParams,useHistory } from "react-router-dom";
import QueryParam from "./Models/QueryParam";
import Post from "./Models/Post";
import { strings } from "./Localization/Localization";
import axios from "axios";
import CSS from 'csstype';

function Detail() {
  let { id } = useParams<QueryParam>();
  const [post, setPost] = useState<Post>();
  const history = useHistory();
  const fieldStyle:CSS.Properties = {
    float: "left",
    textAlign: "left"
  };
  const backBtnStyle:CSS.Properties = {
    float: "left",
    marginTop: "10px"
  };
  useEffect(() => {
    axios.get<Post>(`http://jsonplaceholder.typicode.com/posts/${id}`).then((response) => setPost(response.data));
  }, [id]);
  return (
    <Container>
      <Row>
        <Col>
          <h2>{strings.postDetail}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={fieldStyle}>
            <strong>{strings.userId}: </strong>{post?.userId}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={fieldStyle}>
            <strong>{strings.id}: </strong>{post?.id}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={fieldStyle}>
            <strong>{strings.title}: </strong>{post?.title}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={fieldStyle}>
            <strong>{strings.body}: </strong>{post?.body}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="secondary" style={backBtnStyle} onClick={() => {
              history.push("/");
            }}>
              {strings.back}
            </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
