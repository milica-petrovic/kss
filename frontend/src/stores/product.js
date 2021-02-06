import { observable, action, makeObservable } from 'mobx';
import { getProducts, submit } from '../endpoints/index';

class Products {
    loading=false;
    products=[];
    cart=[];
    constructor() {
        makeObservable(this, {
            loading: observable,
            products: observable,
            cart: observable,
            getProducts: action,
            setCart: action,
            submit: action
        })
    }
    setCart(newCart) {
        this.cart = [...newCart];
    }
    getProducts() {
        this.loading = true;
        getProducts()
        .then(({data}) => {
            this.products = data;
        })
        .catch((e) => console.error(e))
        .finally(() => {
            this.loading = false;
        })
    }

    submit(data) {
        this.loading = true;
        console.log('here');
        submit(data)
        .then(() => alert('Mail sent'))
        .catch((e) => console.error(e))
        .finally(() => {
            this.loading = false;
        })
    }
}

export default new Products();