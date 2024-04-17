
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export function permissions_middleware(required_role) {
    return function(req, res, next) {
        if(req.user && req.user.role === required_role){
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    }
}

export function generateFakeProduct() {
    return {
        _id: uuidv4(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 0, max: 500 }),
        code: faker.number.hex({ min: 0, max: 65535 }),
        stock: faker.number.int({ min: 0, max: 120 }),
    }
}