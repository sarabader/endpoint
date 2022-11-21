import express from 'express';
import validate from '../middleware/validate';
import { bankSchema, bankSchemaType } from '../zod_schema/bank';

const router = express.Router();
let customer : bankSchemaType[] = [];

router.get('/', validate(bankSchema),(req, res, next) => {
    return res.json(customer);
  });

router.post('/', validate(bankSchema),(req, res, next) => {
    const newCustomer = req.body as bankSchemaType;
    customer.push(newCustomer);
    return res.status(201).json({ message: 'Customer is Added !' });
  });

router.put('/', validate(bankSchema), (req, res, next) => {
    const updatedCustomer = req.body as bankSchemaType;
    const { id } = req.params;
    const updatedList = customer.filter((cust) => {
      return cust.id !== id;
    });
    updatedList.push(updatedCustomer);
    customer = updatedList;

            return res.json({
                message: 'Customer information is Updated !'
            })
  });

router.delete('/', (req, res, next) => {
    const id  = req.params;
    const delCust = customer.filter((cust) => {
      return cust.id !== id;
    });
    customer = delCust;

    return res.json({
      message: 'Customer is deleted !',
    });
  });

export default router;