import Sequelize from 'sequelize';
const sequelize = new Sequelize('mariadb://root@localhost:3307/store');
sequelize.authenticate().then(() => {
    console.log('Connected to db');
}).catch((err) => {
    console.error(err);
})

export const Product = sequelize.define('products', 
{  
    price: Sequelize.FLOAT, 
    code: Sequelize.STRING, 
    name: Sequelize.STRING, 
    weight: Sequelize.FLOAT
});
sequelize.sync({ force: true})
.then(() => {
    console.log('connected to db2');
})
.catch((e) => console.error(e))

export default sequelize;