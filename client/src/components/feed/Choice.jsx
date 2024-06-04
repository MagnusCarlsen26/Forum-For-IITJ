import React from 'react'
import { useNavigate } from 'react-router-dom'
import { info } from './../../utils/info.js'

const Choice = () => {
    const navigate = useNavigate()
    const onChoose = (choose) => {
        navigate('/feed', { state: choose })
    }

    const cards = info.map(inf => <div className='image-container col-md-4 p-0 position-relative' onClick={() => onChoose(inf.onChoose)}>
        <img src={inf.src} alt={inf.alt} className={inf.className} style={inf.style} />
        <div className="overlay position-absolute top-50 start-50 translate-middle text-white">
            <h1>{inf.choice}</h1>
        </div>
    </div>)

    return (
        <div className="container-fluid">
            <div className="row" >
                {cards}
            </div>
        </div>
    );
};

export default Choice;
