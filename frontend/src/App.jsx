import React, { useEffect, useState } from 'react';
import { useStores } from './stores/index';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const img = require('./download.png').default;
const Product = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content:center;
    margin: 10px 10px 10px 10px;
    padding: 5px 5px 5px 5px;
    justify-content: center;
    align-items: center;
    width:300px;

`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;

`

const StyledImg = styled.img`
    height: 30px;
    width: 30px;
`

const Cart = styled.div`
    width: 20%;
    height: 20%;
    position: absolute;
    top: 0;
    right: 0;
`
const StyledRow1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    border: 3px solid blue;
    width:200px;
    height:100px;
    border-radius:50px;
    padding: 10px 10px 10px 10px;
    margin: 5px 5px;
    background-color: lightblue;
    color:red;
`

const App = () => {
return (
    <Router>
      <div>
        <nav>
          
            <StyledRow>
              <Link to="/">Home</Link>
            
              <Link to="/cart">Cart</Link>
            </StyledRow>
          
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Home /> 
          </Route>
          <Route exact path="/cart">
            <CartApp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
        }
const Home = observer(() => {
    const { productStore } = useStores();
    const { products, loading, cart } = productStore;
    const [items, setItems] = useState([]);
        useEffect(() => {
        productStore.getProducts();
    }, [])
    return !products.length ? <h1>Loading</h1> : <>
    <StyledRow>
        <div></div>
        <div>Added Items:<b> {cart.length}</b> </div>
    </StyledRow>
    {products.map(product => (<Product key={product.id}>
        <StyledImg src={img}  />
        <StyledRow1>
        <div>Name: {product.name}</div>
        <div>Code: {product.code}</div>
        <div>Price: {product.price}</div>
        <div>Weight: {product.weight} kg</div>
        </StyledRow1>
        <div>
            <span>
                <button onClick={() => {productStore.setCart([...cart,product])}}>
                Add to cart
                </button>
            </span>
            <span>
                <button onClick={() => {const index = cart.findIndex(item => item.id === product.id); if(index > -1) cart.splice(index,1); productStore.setCart([...cart])}}>
                    Remove
                </button>
            </span>
        </div>
        <div></div>
    </Product>))}
    </>
});

const CartApp = observer(() => {
    const { productStore } = useStores();
    const { cart } = productStore;
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [address, setAddress] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    console.log(cart);
    return (<Product>
    <h1>
        Cart
        </h1>
        {cart.map((product, index) => (<Product key={index}>
        <StyledImg src={img}  />
        <div>Name: {product.name}</div>
        <div>Code: {product.code}</div>
        <div>Price: {product.price}</div>
        <div>Weight: {product.weight} kg</div>
        <div>
            <span>
                <button onClick={() => {const index = cart.findIndex(item => item.id === product.id); if(index > -1) cart.splice(index,1); productStore.setCart([...cart])}}>
                    Remove
                </button>
            </span>
        </div>
        <div></div>
    </Product>))}
        <div>
           <div>Total products in cart: {cart.length}</div> 
           <div>Total amount to be paid:<b> {cart.reduce((acc,a) => acc + a.price, 0)}</b> $</div>
        </div>
        <form>

            <div><input value={email} onChange={(e) =>setEmail(e.target.value)} type="text" name="email" placeholder="email"></input></div>
            <div><input value={firstName} onChange={(e) =>setFirstName(e.target.value)} type="text" name="firstName" placeholder="firstName"></input></div>
            <div><input value={lastName} onChange={(e) =>setLastName(e.target.value)} type="text" name="lastName" placeholder="lastName"></input></div>
            <div><input value={phoneNumber} onChange={(e) =>setPhoneNumber(e.target.value)} type="number" name="phoneNumber" placeholder="phoneNumber"></input>
</div>
<div>            <input type="text" value={address} onChange={(e) =>setAddress(e.target.value)} name="address" placeholder="address"></input>
</div>
<div><button disabled={cart.length === 0} onClick={(e) => 
    {
        e.preventDefault(); 
        productStore.submit({email, firstName, lastName, phoneNumber, address, cart})
        }}>Submit</button></div>
        </form>
    </Product>)
})
export default App;