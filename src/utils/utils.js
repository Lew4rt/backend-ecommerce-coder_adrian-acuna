
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto'

export function permissions_middleware(required_role, optional_required_role = null) {
    return function(req, res, next) {
        if (req.user && (req.user.role === required_role || req.user.role === optional_required_role)) {
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    };
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


export function encryptData(data, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        encryptedData: Buffer.from(encryptedData, 'hex').toString('base64')
    };
}

export function decryptData(encryptedData, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));
    let decryptedData = decipher.update(Buffer.from(encryptedData, 'base64'), 'binary', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}