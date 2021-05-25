import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Post from "./Models/Post";
import { strings } from "./Localization/Localization";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import CSS from 'csstype';

function Create() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const rowStyle:CSS.Properties = {
    margin: "10px 0"
  };
  const labelStyle:CSS.Properties = {
    textAlign: "left"
  };
  const btnStyle:CSS.Properties = {
    float: "right"
  };
  const backBtnStyle:CSS.Properties = {
    float: "left",
    marginTop: "10px"
  };
  const history = useHistory();
  return (
    <Container>
      <Row>
        <Col>
          <h2>{strings.createPost}</h2>
        </Col>
      </Row>
      <Form onSubmit={(event) => {
        event.preventDefault();
        if (title && body) {
          let post: Post = {
            userId: 1,
            id:1,
            title: title,
            body: body
          };
          axios.post(`http://jsonplaceholder.typicode.com/posts`, post)
            .then(response => {
              if (response.statusText === "Created") {
                history.push(`/`)
              }
            })
        }
      }}>
        <Form.Group as={Row} style={rowStyle}>
          <Form.Label column md="2" style={labelStyle}>{strings.postTitle}</Form.Label>
          <Col>
            <Form.Control type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}} placeholder={strings.postTitle} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={rowStyle}> 
          <Form.Label column md="2" style={labelStyle}>{strings.postBody}</Form.Label>
          <Col>
            <Form.Control type="text" value={body} onChange={(event)=>{setBody(event.target.value)}} placeholder={strings.postBody} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={rowStyle}> 
          <Col>
            <Button variant="secondary" style={backBtnStyle} onClick={() => {
              history.push("/");
            }}>
              {strings.back}
            </Button>
            <Button variant="primary" type="submit" style={btnStyle}>
              {strings.create}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Create;
