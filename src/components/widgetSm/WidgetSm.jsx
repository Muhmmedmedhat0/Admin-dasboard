import { useEffect, useState } from 'react';
import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { Link } from 'react-router-dom'
export default function WidgetSm() {
  const user = JSON.parse(sessionStorage?.getItem('persist:user'))?.userInfo;
  const currentUser = user && JSON.parse(user);
  const TOKEN = currentUser?.token;
  
  const URL = 'https://e-comerce-api-a37q.vercel.app'

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`${URL}/api/users/?new=true`,{
          method: 'GET',headers: { Authorization: `Bearer ${TOKEN}` }
        });
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        if (error) setError(error)
      }
    };
    getUsers();
  }, [setUsers, TOKEN]);
  return (
    <div className="widget-sm">
      <span className="widget-sm__title">New Join Members</span>
      <ul className="widget-sm-list">
        {error ? <span style={{color:"red", paddingTop: "80px"}}>faild to load</span>: users && users.map((user) => (
              <li className="widget-sm-list__item" key={user._id}>
                <img src={ user.img || 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'}
                  alt={user.userName} className="widget-sm__mg"/>
                <div className="widget-sm__user"> <span className="widget-sm__username">{user.userName}</span></div>
            <button className="widget-sm__button"><Visibility className="widget-sm__icon" />
              <Link to={`user/${user._id}`} className='link'>
                Display
              </Link>
            </button>
              </li>
            ))}
      </ul>
    </div>
  );
}
