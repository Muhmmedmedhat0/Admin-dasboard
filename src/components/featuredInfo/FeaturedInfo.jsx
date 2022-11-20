import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import './featuredInfo.css';

export default function FeaturedInfo() {
const user = JSON.parse(sessionStorage?.getItem('persist:user'))?.userInfo;
const currentUser = user && JSON.parse(user);
  const TOKEN = currentUser?.token;
  
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const URL = 'https://e-comerce-api-a37q.vercel.app'

  useEffect(() => {
    const getIncome = async () => {
      try {
        const response = await fetch(`${URL}/api/orders/income`,{
            method: 'GET', headers: { Authorization: `Bearer ${TOKEN}` }
          }
        );
        const data = await response.json();
        setIncome(data);
        setPerc((response.data[1]?.total * 100) / response.data[0]?.total - 100);
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, [TOKEN]);
  return (
    <div className="featured">
      <div className="featured-item">
        <span className="featured-item__title">Revanue</span>
        <div className="featured-money">
          <span className="featured-money__count">$ { income ?  income[1]?.total : 0} </span>
          <span className="featured-money__rate"> % {Math.floor(perc)}
            {perc <= 0 ? (<ArrowDownward className="featured__icon negative" />) : (<ArrowUpward className="featured__icon" />)}
          </span>
        </div>
        <span className="featured__sub">Compared to last month</span>
      </div>
      <div className="featured-item">
        <span className="featured-item__title">Sales</span>
        <div className="featured-money">
          <span className="featured-money__count">$4,415</span>
          <span className="featured-money__rate">-1.4 <ArrowDownward className="featured__icon negative" /></span>
        </div>
        <span className="featured__sub">Compared to last month</span>
      </div>
      <div className="featured-item">
        <span className="featured-item__title">Cost</span>
        <div className="featured-money">
          <span className="featured-money__count">$2,225</span>
          <span className="featured-money__rate">+2.4 <ArrowUpward className="featured__icon" /></span>
        </div>
        <span className="featured__sub">Compared to last month</span>
      </div>
    </div>
  );
}
