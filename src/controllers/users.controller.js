import { validationResult, body } from 'express-validator';
import bcrypt from 'bcrypt';
import UsersDAO from '../dao/users.dao.js';
import jwt from "jsonwebtoken";
import logger from '../logs/logger.js';
import { sendAccountDeletedForInactivityMail, sendForgotPwMail } from '../mailing/nodemailer.js';
import { decryptData, encryptData } from '../utils/utils.js';
import dotenv from 'dotenv'
import { use } from 'chai';

dotenv.config();
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

export async function getAllUsers(req, res) {
    try {
        const users = await UsersDAO.getAll()

        const userSummary = users.map(user => ({
            first_name: user.first_name,
            email: user.email,
            role: user.role
        }));

        return res.status(200).json(userSummary);
    } catch (error) {
        logger.error("Ocurrió un error retornando todos los usuarios:", error.message);
        return res.status(400).json({ error: error.message });
    }
}

const validateUserInput = [
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').isEmail(),
    body('age').isInt({ min: 1 }),
    body('password').isLength({ min: 6 }),
];

export async function register(req, res) {
    logger.info("Registrando nuevo usuario...")
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error("Ocurrió un error registrando un nuevo usuario")
        return res.status(400).json({ error: errors.array() });
    }

    const { first_name, last_name, email, age, password } = req.body;

    try {
        const emailUsed = await UsersDAO.getByEmail(email);

        if (emailUsed) {
            logger.error('Email en uso')
            return res.status(400).json({ error: 'El email está en uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UsersDAO.add(first_name, last_name, age, email, hashedPassword);
        logger.info("Nuevo usuario registrado")
        return res.redirect("/sessions/login");
    } catch (error) {
        logger.error("Error in user registration:", error.message);
        return res.status(500).redirect("/sessions/register");
    }
}

export { validateUserInput };

const validateLoginInput = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
];

export async function login(req, res) {
    logger.info("User logging in...")
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error("Ocurrió un error iniciando sesión")
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    try {

        const user = await UsersDAO.getByEmail(email);

        if (!user) {
            logger.error("El email es inválido")
            return res.status(400).json({ error: 'Email inválido' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            let token = jwt.sign({ id: user._id }, 'secret_jwt', { expiresIn: '1h' });

            res.cookie("jwt", token, {
                signed: true,
                httpOnly: true,
                maxAge: 1000 * 60 * 60
            });
            return res.redirect("/products");
        } else {
            logger.error("Password inválido")
            return res.status(400).json({ error: 'Password inválido' });
        }
    } catch (error) {
        logger.error("Error in user login:", error.message);
        return res.status(500).redirect("/sessions/login");
    }
}

export { validateLoginInput };

export async function logout(req, res) {
    try{
        const user = req.user
        user.last_connection = new Date().toISOString();
        await UsersDAO.update(user._id, user)
    }catch (error) {
        logger.error("Error logging the last connection:", error.message);
    }

    logger.info("User logging out")
    res.clearCookie("jwt");
    res.status(200).redirect("/sessions/login");
}

export const validateEmailInput = [
    body('email').isEmail()
];

export async function resetPwRequest(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error("Email inválido")
        return res.status(400).json({ error: errors.array() });
    }

    logger.info("Solicitando cambio de contraseña...")

    try {
        const { email } = req.body
        const user = await UsersDAO.getByEmail(email)
        if (!user) {
            logger.error("Email no registrado")
            return res.status(400).json({ error: "Email no registrado" });
        }
        const userId = user._id.toString()
        const requestDateString = Date.now().toString()
        const dataToEncrypt = `${userId}@${requestDateString}`
        const encryptedIdAndDate = encryptData(dataToEncrypt, ENCRYPTION_KEY)
        const encryptedToken = encryptedIdAndDate.encryptedData
        const iv = encryptedIdAndDate.iv

        const resetPwLink = `http://localhost:8080/sessions/resetPw/${encodeURIComponent(encryptedToken)}/${encodeURIComponent(iv)}`;

        const success = await sendForgotPwMail(email, resetPwLink)
        if (success) {
            logger.info("Mail enviado")
            return res.status(200).json({ message: "Chequea tu mail para continuar con el cambio de contraseña" })
        }
    } catch (error) {
        logger.error("Error solicitando el cambio de contraseña");
        return res.status(500).json({ error: "Error solicitando el cambio de contraseña: " });
    }
}

export const validatePasswordInput = [
    body('password').isLength({ min: 6 })
]

export async function resetPw(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error("La contraseña debe contener 6 o más caracteres")
        return res.status(400).json({ error: errors.array() });
    }

    logger.info("Reiniciando contraseña...")

    try {
        const { password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = req.params.token;
        const iv = req.params.iv;

        const decryptedToken = decryptData(token, ENCRYPTION_KEY, iv)
        const [userId, requestDateString] = decryptedToken.split('@');

        const requestDate = new Date(parseInt(requestDateString));

        const currentTime = new Date();
        const timeDiff = Math.abs(currentTime - requestDate);
        const diffInHours = Math.floor(timeDiff / (1000 * 60 * 60));

        if (diffInHours >= 1) {
            logger.error("El link de reinicio de contraseña expiró")
            return res.status(400).json({ error: "El link de reinicio de contraseña expiró" });
        } else {
            const success = await UsersDAO.update(userId, { password: hashedPassword })
            if (success) {
                logger.info("Contraseña actualizada con éxito")
                return res.status(200).redirect("/sessions/login")
            }
        }
    } catch (error) {
        logger.error("Error cambiando la contraseña");
        return res.status(500).redirect("/sessions/requestResetPw");
    }

}

export async function toggleUserRole(req, res) {
    logger.info("Cambiando el rol del usuario")
    const user = await UsersDAO.getByID(req.params.uid)
    if (!user) {
        logger.error("No se encontró usuario para cambiar de rol")
        return res.status(401).json({ error: "No se encontró usuario para cambiar de rol" })
    }

    if (user.role == "admin") {
        logger.error("El usuario no aplica para cambio de rol")
        return res.status(400).json({ error: "El usuario no aplica para cambio de rol" })
    }

    // Acá estaría dado el caso de que los documentos importados tienen determinado nombre
    const requiredDocuments = ['identificacion.txt', 'domicilio.txt', 'estadoDeCuenta.txt'];
    const uploadedDocuments = user.documents.map(doc => doc.name);
    const hasAllDocuments = requiredDocuments.every(doc => uploadedDocuments.includes(doc));
    if (user.role === 'user' && !hasAllDocuments) {
        logger.error('El usuario no ha terminado de procesar su documentación')
        return res.status(400).json({ error: 'El usuario no ha terminado de procesar su documentación' });
    }

    const newRole = user.role == "user" ? "premium" : "user"
    const success = await UsersDAO.update(user._id, { role: newRole })
    if (success) {
        logger.info("Rol actualizado con éxito")
        res.status(200).json({ message: "Rol actualizado con éxito" })
    }

}

export async function uploadFiles(req, res) {
    try {
        const userId = req.params.uid;
        const user = await UsersDAO.getByID(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (!user.documents) {
            user.documents = [];
        }

        const files = req.files;
        if (files.documents) {
            files.documents.forEach(file => {
                user.documents.push({ name: file.originalname, reference: file.path });
            });
            const success = await UsersDAO.update(userId, user)
            if (success) {
                logger.info("Documentos subidos exitosamente")
                res.status(200).json({ message: 'Documentos subidos exitosamente' });
            }
        }
        if(files.profile){
            logger.info("Imágen de perfil subida")
            res.status(200).json({ message: 'Imágen de perfil subida exitosamente' });
        }
        if(files.product){
            logger.info("Imágen de producto subida")
            res.status(200).json({ message: 'Imágen de producto subida exitosamente' });
        }


    } catch (error) {
        logger.error('Error subiendo documentos:', error.message);
        res.status(500).json({ error: 'Error subiendo documentos' });
    }
}

export async function deleteInactiveUsers(req, res) {
    const TWO_DAYS_IN_MS = 2 * 24 * 60 * 60 * 1000; // Dos días en milisegundos
    const TEN_MINUTES_IN_MS = 10 * 60 * 1000; // 10 minutos en milisegundos

    try {
        const users = await UsersDAO.getAll();
        const now = Date.now();

        const inactiveUsers = users.filter(user => {
            const lastConnection = new Date(user.last_connection).getTime();
            return now - lastConnection > TEN_MINUTES_IN_MS;
        });

        for (const user of inactiveUsers) {
            await sendAccountDeletedForInactivityMail(user.email, user.first_name);
            await UsersDAO.delete(user._id);
        }

        logger.info(`Deleted ${inactiveUsers.length} inactive users.`);
        return res.status(200).json({ message: `Deleted ${inactiveUsers.length} inactive users.` });
    } catch (error) {
        logger.error("Error deleting inactive users:", error.message);
        return res.status(500).json({ error: error.message });
    }
}