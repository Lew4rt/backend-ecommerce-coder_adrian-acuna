import tickets from "./models/ticket.schema.js";
import { v4 as uuidv4 } from 'uuid';

class TicketsDAO {

    static async add(totalAmount, purchaser) {
        try {
            const newTicket = new tickets({
                code: uuidv4(),
                amount: totalAmount,
                purchaser: purchaser,
            })
            await newTicket.save()

            const newTicketId = newTicket._id.toString();
            return newTicketId;
        } catch (error) {
            throw new Error("Error al crear un nuevo ticket: ", error.message)
        }
    }

    static async getById(id) {
        try {
            const ticket = await tickets.findById(id).lean();

            if (!ticket) {
                throw new Error("Ticket not found");
            }

            return ticket;
        } catch (error) {
            throw new Error('Error al buscar ticket por ID: ', error.message);
        }
    }

    static async delete(id) {
        try {
            const result = await tickets.findByIdAndDelete(id);
            return result !== null;
        } catch (err) {
            throw new Error('Failed to delete ticket');
        }
    }
}

export default TicketsDAO;