import './card.css';
import Counter from './Counter';

function Card(props){
    const {title, img, price} = props;

    return(
        <div className="card-item">
            <img className="card-img" src={img} alt={title} />
            <h3 className="card-title">{title}</h3>
            <p className="card-price">$ {price}</p>
            <Counter />
            <button>Comprar</button>
        </div>
    )
}

export default Card;