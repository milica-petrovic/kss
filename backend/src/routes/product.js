import express from 'express';
import { Product } from '../db/index.js';
import ProductService from '../services/product.js';

const router = express.Router();

router.post('/', async ({body}, res) => {
    try {
        const { name, code, weight, price } = body;
        await ProductService.create({name, code, price, weight});
        return res.status(200).send({message: 'Success'});
    } catch (e) {
        return res.status(400).send({
            message: e.toString()
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const results = await ProductService.findAll();
        return res.status(200).json(results);
    } catch(e) {
        return res.status(400).send({ message: e.toString()})
    }
})
export default router;