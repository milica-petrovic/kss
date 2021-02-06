import express from 'express';
import EmailService from '../services/email.js';

const router = express.Router();

router.post('/', async ({body}, res) => {
    try {
        const { email, firstName, lastName, phoneNumber, address, cart } = body;
        console.log(body);
        await EmailService.send({ email, subject:'Order received', text: `You have a new order from ${firstName} ${lastName}. Email contact is ${email}. Address is ${address}. Phone number is ${phoneNumber}. Total amount = ${cart.reduce((acc,a) => acc+a.price,0)}`}, true);

        await EmailService.send({ email, subject:'Order received', text: `You have a new order from ${firstName} ${lastName}. Email contact is ${email}. Address is ${address}. Phone number is ${phoneNumber}. Total amount = ${cart.reduce((acc,a) => acc+a.price,0)}`});
        return res.status(200).send({message: 'Success'});
    } catch (e) {
        return res.status(400).send({
            message: e.toString()
        })
    }
})

export default router;