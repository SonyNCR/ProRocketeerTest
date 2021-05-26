import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Post from "./Models/Post";
import { strings } from "./Localization/Localization";
import axios from "axios";
import { useState,useEffect } from "react";
import QueryParam from "./Models/QueryParam";
import { useHistory,useParams } from "react-router-dom";
import CSS from 'csstype';

function Edit() {
  let { id } = useParams<QueryParam>();
  const [post, setPost] = useState<Post>();
  const history = useHistory();
  const rowStyle:CSS.Properties = {
    margin: "10px"
  };
  const btnStyle:CSS.Properties = {
    float: "right"
  };
  const labelStyle:CSS.Properties = {
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
          <h2>{strings.editPost}</h2>
        </Col>
      </Row>
      <Form onSubmit={(event) => {
        event.preventDefault();
        axios.put(`http://jsonplaceholder.typicode.com/posts/${id}`, post)
          .then(response => {
            if (response.statusText === "OK") {
              history.push(`/`)
            }
          });
      }}>
        <Form.Group as={Row} style={rowStyle}>
          <Form.Label column md="2" style={labelStyle}>{strings.postTitle}</Form.Label>
          <Col>
            <Form.Control type="text" value={post?.title} onChange={(event) => {
              let updatedPost: Post = {
                id: post?.id ?? 1,
                userId: post?.userId ?? 1,
                title: event.target.value,
                body:post?.body ?? ""
              }
              setPost(updatedPost);
            }} placeholder={strings.postTitle}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={rowStyle}> 
          <Form.Label column md="2" style={labelStyle}>{strings.postBody}</Form.Label>
          <Col>
            <Form.Control type="text" value={post?.body} onChange={(event) => {
              let updatedPost: Post = {
                id: post?.id ?? 1,
                userId: post?.userId ?? 1,
                title: post?.title ?? "",
                body:event.target.value
              }
              setPost(updatedPost);
            }} placeholder={strings.postBody} />
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
              {strings.save}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Edit;
