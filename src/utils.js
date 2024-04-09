import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

export function permissions_middleware(required_role) {
    return function(req, res, next) {
        if(req.user && req.user.role === required_role){
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    }
}

export default dirname(__filename);