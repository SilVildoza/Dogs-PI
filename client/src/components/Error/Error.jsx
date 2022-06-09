import  React  from 'react';
import error from '../../img/error.gif';
import { useHistory } from "react-router-dom";
import './Error.css';

export default function Error(){
  const history = useHistory();

  return (
      <div>
        <div>
          <img src={error} alt='Not found' className='errorImg' />
        </div>
          <button className="volver" onClick={() => history.goBack()}>BACK</button>
      </div>
  )
} 