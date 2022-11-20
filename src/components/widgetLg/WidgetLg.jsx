import { useEffect, useState } from 'react';
// import TimeAgo from 'timeago-react';
import './widgetLg.css';

export default function WidgetLg() {
  const user = JSON.parse(sessionStorage?.getItem('persist:user'))?.userInfo;
  const currentUser = user && JSON.parse(user);
  const TOKEN = currentUser?.token;
  const URL = 'https://e-comerce-api-a37q.vercel.app'

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`${URL}/api/orders/`, {
          method: 'GET', headers: { Authorization: `Bearer ${TOKEN}` },
        });
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        if (error) {
         
          console.log(error);
        }
      }
    };
    getOrders();
  }, [TOKEN]);
  const Button = ({ type }) => {
    return <button className={'widget-lg__button ' + type}>{type}</button>;
  };
  return (
    <div className="widget-lg">
      <h3 className="widget-lg__title">Latest transactions</h3>
      <table className="widget-lg__table">
        <thead className="widget-lg__tr">
          <tr>
            <th className="widget-lg__th">Customer</th>
            <th className="widget-lg__th">Date</th>
            <th className="widget-lg__th">Amount</th>
            <th className="widget-lg__th">Status</th>
          </tr>
        </thead>
        <tbody>
          { orders?.length === 0 ? <tr style={{ color:"red" }}><td> No Orders Yet</td></tr> :
            orders?.slice(0, 6)?.map((order) => {
            return (
              <tr className="widget-lg-tr" key={order._id}>
                <td className="widget-lg__user"><span className="widget-lg__name">{order.userId}</span></td>
                <td className="widget-lg__date">{/* <TimeAgo datetime={`${order.createdAt}`} /> */}</td>
                <td className="widget-lg-amount">${order.amount}</td>
                <td className="widget-lg__status"><Button type={order.status} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
