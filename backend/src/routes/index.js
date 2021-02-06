import Email from './email.js';
import Product from './product.js';

export default (app) => {
    app.use('/email', Email);
    app.use('/product', Product);
}