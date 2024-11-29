import db from "../db/db.js";

const messageModel = {
    async createMessage(conversationId, senderId, message) {
      try {
        const newMessage = await db.query(
          `INSERT INTO messages (conversation_id, sender_id, message, seen) 
           VALUES (?, ?, ?, ?) 
           RETURNING *`,
          [conversationId, senderId, message, false]
        );
        return newMessage[0];
      } catch (error) {
        console.error("Error creating message:", error);
        throw error;
      }
    },
  
    async getMessages(senderId, receiverId) {
      try {
        // Find the conversation ID
        const [conversationResult] = await db.query(
          `SELECT id FROM conversations 
           WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)`,
          [senderId, receiverId, receiverId, senderId]
        );
    
        // If no conversation exists, return null
        if (conversationResult.length === 0) return null;
    
        // Get the conversationId
        const conversationId = conversationResult[0].id;
    
        // Fetch all messages for the conversation
        const [messages] = await db.query(
          `SELECT * FROM messages WHERE conversation_id = ? ORDER BY timestamp ASC`,
          [conversationId]
        );
    
        // Return the conversation ID and the list of messages
        return { conversationId, messages };
      } catch (error) {
        console.error("Error getting messages:", error);
        throw error;
      }
    }
    ,
  
    async updateMessageSeen(messageId) {
      try {
        await db.query(
          `UPDATE messages SET seen = true WHERE id = ?`,
          [messageId]
        );
      } catch (error) {
        console.error("Error updating message seen:", error);
        throw error;
      }
    }

  };

  export default messageModel;