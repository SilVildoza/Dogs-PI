import  React  from 'react';
import error from '../../img/error.gif';
import './Error.css';

export default function Error(){
  return (
      <div>
          <img src={error} alt='Not found' className='errorImg' />
      </div>
  )
} 