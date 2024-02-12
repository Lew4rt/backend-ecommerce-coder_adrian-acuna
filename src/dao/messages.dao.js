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
                    console.log('Message saved:', savedMessage);
                })
                .catch(error => {
                    console.error('Error saving message:', error);
                });
        } catch (err) {
            console.error('Error saving message:', error);
        }
    }
}

export default MessagesDao;

