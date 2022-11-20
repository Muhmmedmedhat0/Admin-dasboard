import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./userList.css";

export default function UserList() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
 
  return (
    <div className="container-fluid">
      <Sidebar />
      <div className="user-list">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Img</th>
              <th scope="col">status</th>
              <th scope="col">email</th>
              <th scope="col">transaction</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((person, i) => (
                <tr key={person.id}>
                  <th scope="row">{i}</th>
                  <td>{person.id}</td>
                  <td>
                    <div className="user-list-item">
                      <img
                        className="user-list-img"
                        src={person.avatar}
                        alt={person.username}
                        loading="lazy"
                        width={32}
                        height={32}
                      />
                    </div>
                  </td>
                  <td>{person.username}</td>
                  <td>{person.status}</td>
                  <td>{person.email}</td>
                  <td>{person.transaction}</td>
                  <td>
                    <>
                      <Link to={`/user/${person.id}`}>
                        <button className="user-list__edit">Edit</button>
                      </Link>
                      <DeleteOutline
                        className="user-list__delete"
                        onClick={() => handleDelete(person.id)}
                      />
                    </>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
