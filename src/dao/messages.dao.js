import logger from "../logs/logger.js";
import messages from "./models/messages.schema.js";

class MessagesDao {
    static async saveMessageToDatabase(user, message) {
        try {
            const newMessage = new messages({
                user: user,
                message: message
            });
            await newMessage.save()
                .then(savedMessage => {
                    logger.info('Message saved:', savedMessage);
                })
                .catch(error => {
                    logger.error('Error saving message:', error);
                });
        } catch (err) {
            logger.error('Error saving message:', error);
        }
    }
}

export default MessagesDao;

