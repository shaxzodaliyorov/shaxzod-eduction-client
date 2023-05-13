import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import USER from "../services/users/User";
const AdminUsersComponent = () => {
  const { user } = useSelector((state) => state.AuthLogin);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    USER.GETALLUSERS(user._id).then((res) => setUsers(res));
  }, [user]);

  return (
    <>
      <div className="row py-2">
        <div className="col-6">
          <h3>Barcha Kurslar</h3>
        </div>
        <div className="col-6 text-end">
          <button className="btn btn-sm btn-success">Add course</button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>ismi</th>
                <th>familyasi</th>
                <th>emaili</th>
                <th>profile</th>
                <th>bio</th>
                <th>Davlat </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => {
                return (
                  <tr className="table-active ">
                    <td>{index + 1}</td>
                    <td className={item.isadmin ? "table-success" : ""}>
                      {item.isadmin ? "Admin" : "Student"}
                    </td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>
                      <img
                        src={item.profilepic}
                        width="40"
                        height="40"
                        alt=""
                      />
                    </td>
                    <td>{item.aboutme}</td>
                    <td>{item.country}</td>
                    <td>
                      <button className="btn btn-sm btn-info" disabled>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-sm  btn-danger" disabled>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUsersComponent;
