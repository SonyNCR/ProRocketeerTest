import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Post from "./Models/Post";
import { Link, useHistory } from "react-router-dom";
import { strings } from "./Localization/Localization";
import axios from "axios";
import CSS from 'csstype';

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const newBtnStyle: CSS.Properties = {
    float: "right",
    margin: "5px"
  };
  const history = useHistory();
  const tableRows = posts.map((post) => (
    <tr key={post.id}>
      <td>{post.userId}</td>
      <td>
        <Link to={`/detail/${post.id}`}>{post.id}</Link>
      </td>
      <td>{post.title}</td>
      <td>{post.body}</td>
      <td>
        {/* <Link to={`/edit/${post.id}`}>✎</Link> */}
        <Button variant="primary" onClick={()=>{history.push(`/edit/${post.id}`)}}>✎</Button>
      </td>
      <td><Button variant="danger" onClick={() => {
        axios.delete(`http://jsonplaceholder.typicode.com/posts/${post.id}`)
          .then(response => {
            if (response.statusText === "OK") {
              setPosts(posts.filter(item => item.id !== post.id));
            }
        })
      }}>✘</Button></td>
    </tr>
  ));
  useEffect(() => {
    axios.get<Post[]>("http://jsonplaceholder.typicode.com/posts").then((response) => setPosts(response.data));
  }, []);
  return (
    <div>
      <div style={newBtnStyle}>
        <Button variant="primary" onClick={() => {
          history.push(`/create`);
        }}>{strings.createNew}</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{strings.userId}</th>
            <th>{strings.id}</th>
            <th>{strings.title}</th>
            <th>{strings.body}</th>
            <th>{strings.edit}</th>
            <th>{strings.delete}</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    </div>
  );
}

export default Home;
