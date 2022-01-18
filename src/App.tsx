import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import axios from "axios";

import "./index.scss"

import { Card } from "./components/card";

interface CardProps {
  name: string;
  nutritions: {
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;
    sugar: number;
  }
}

interface CartItem {
  name?: string;
  quant: number;
}

function App() {
  const [dataItem, setData] = useState<CardProps[]>([] as any);
  const [cartItens, setCartItens] = useState<CartItem[]>([] as any);

  useEffect(() => {
    axios
      .get("https://www.fruityvice.com/api/fruit/all")
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  const onAdd = (product: CartItem) => {
    const exist = cartItens.find((item) => item.name === product.name);
    if (exist) {
      setCartItens(
        cartItens.map((item) =>
          item.name === product.name ? { ...exist, quant: exist.quant + 1 } : item
        )
      );
    } else {
      setCartItens([...cartItens, { ...product, quant: 1 }]);
    }
  };

  const onRemove = (product: CartItem) => {
    const exist = cartItens.find((item) => item.name === product.name);
    if (exist?.quant === 1) {
      setCartItens(cartItens.filter((item) => item.name !== product.name));
    } else {
      setCartItens(
        cartItens.map((item) =>
          item.name === product.name ? { ...exist, quant: item.quant - 1} : item
        )
      );
    }
  };

  const onDelete = (product: CartItem) => {
    const exist = cartItens.find((item) => item.name === product.name);
    if (exist) {
      setCartItens(cartItens.filter((item) => item.name !== product.name));
    }
  };

  return (
    <div className="container">
      <div className="card-list">
        {dataItem.map(item => (
          <Card key={item.name} data={item} onAdd={onAdd} />
        ))}
      </div> 
      <div className="shopping-car">
        <div className="cart-header">
          <h3>Carrinho</h3>
          <button onClick={() => setCartItens([])}>Limpar</button>
        </div>
        {cartItens.map(item => (
          <div className='cart-item'>
            <p key={item.name}>{item.name} - {item.quant}</p>
            <div>
              <button>
                <AiFillPlusCircle className='plus' onClick={() => onAdd(item)} />
              </button>
              <button>
                <AiFillMinusCircle className='minus' onClick={() => onRemove(item)} />
              </button>
              <button>
                <FiTrash2 className="trash" onClick={() => onDelete(item)} />
              </button>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );  
}

export default App;
