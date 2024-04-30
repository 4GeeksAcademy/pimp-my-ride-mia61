import React from 'react';
import "../../styles/Card.css";
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>GET BACK ON THE ROAD</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://media.istockphoto.com/photos/car-mechanic-with-computer-picture-id1125646126?k=6&m=1125646126&s=170667a&w=0&h=SWkWqKH9ixhUOKjYgghch6BOgwBATFSbZ0Df1YBRi7o='
              text='Streamlined Communication'
              description='Our app provides a centralized platform for seamless communication between car owners, mechanics, and service providers. Say goodbye to endless phone calls and miscommunication. With our intuitive interface, customers can easily track repair progress, and receive real-time updates on their vehicle status, all in one place.'
              // label='Adventure'
              // label='Reason-1'
              path="/services"
            />
            <CardItem
              src='https://images.unsplash.com/photo-1517524206127-48bbd363f3d7'
              text='Transparency and Accountability'
              description='We prioritize transparency and accountability in every step of the repair process. Our app empowers customers with detailed insights into the status of their repairs, including time estimates and service history. By providing access to this information, we aim to build trust and confidence in our users, ensuring they feel informed and in control throughout the repair journey.'
              // label='Luxury'
              // label='Reason-2'
              path="/services"
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://images.unsplash.com/photo-1636761358760-101cabeeb699'
              text='Time and Money Savings'
              description='Time is precious, and so is money. Our app is designed to save users both. By streamlining the repair process and reducing unnecessary delays, we help users get back on the road faster. With our app, car repairs are not only hassle-free but also cost-effective.'
              // label='Mystery'
              // label='Reason-3'
              path="/services"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;