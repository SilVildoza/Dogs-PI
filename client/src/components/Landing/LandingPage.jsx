import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){
    return (
        // <>
        // <div className='landing-cont'>
        //     <section className='full-pg'>
        //         <div className='full-inner'>

                    <div className='bgImg'>
                        <h1 className='titulo'>Find your next Best Friend today!</h1>
                        {/* <h1>Welcome</h1> */}
                        <Link to = '/home'>
                            <button className='entrar'>ENTER</button>
                        </Link>
                    </div>
        //         </div>
        //     </section>
        // </div>
        // </>
    )
}