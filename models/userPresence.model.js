import db from "../db/db.js";


export const insertOrUpdatePresenceModel = async (userId, socketId) => {
    try {
        const result = await db.query(
            "INSERT INTO user_presence (user_id, socket_id, status) VALUES (?, ?, 'online') " +
            "ON DUPLICATE KEY UPDATE socket_id = ?, status = 'online', last_active = CURRENT_TIMESTAMP",
            [userId, socketId, socketId]  
        );
        return result; 
    } catch (error) {
        console.error('Error inserting or updating user presence:', error);
        throw error;  
    }
};

export const updateUserPresenceModel=async(socketId)=>{
    try {
        const result=await db.query("UPDATE user_presence SET status = 'offline', last_active = CURRENT_TIMESTAMP WHERE socket_id = ?",[socketId])
        return result
    } catch (error) {
        console.error('Error updating user presence:', error);
        throw error;
    }
}

export const getOnlineUserSocketIdModel=async(receiverId)=>{
    try {
        const [result] = await db.query(
            "SELECT socket_id FROM user_presence WHERE user_id = ? AND status = 'online'",
            [receiverId]
          );
          return result;
    } catch (error) {
        console.error('Error getting online user socket IDs:', error);
        throw error;
    }
}

export const isUserOnline=async(userId)=>{
    try {
        const result = await db.query(
            "SELECT status FROM user_presence WHERE user_id = $1",
            [userId]
          );
          return result.rows.length > 0 && result.rows[0].status === 'online';
    } catch (error) {
        console.error('Error checking user online status:', error);
        throw error;
    }
}