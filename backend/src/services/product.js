import { Product } from '../db/index.js';
const productDao = {
    findAll,
    create,
    findById,
    deleteById,
    updateProduct
}

function findAll() {
    return Product.findAll();
}

function findById(id) {
    return Product.findByPk(id);
}

function deleteById(id) {
    return Product.destroy({ where: { id } });
}

function create(product) {
    var product = new Product(product);
    return product.save();
}

function updateProduct(product, id) {
    var updateProduct = {
        name: product.name,
        weight: product.weight,
        price: product.price,
        code: product.code
    };
    return Product.update(updateProduct, { where: { id: id } });
}
export default productDao;