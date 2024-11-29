import db from "../db/db.js";

export const checkFeaturePermission = (featureName, action) => {
    return async (req, res, next) => {
        const userId = req.user.id; // Assume req.user is populated after JWT authentication
        try {
            const [userRoles] = await db.query(
                `SELECT role_id FROM users WHERE user_id = ?`, 
                [userId]
            );
            if (userRoles.length === 0) {
                return res.status(403).json({ message: 'Access Denied: No roles assigned.' });
            }

            const roleIds = userRoles.map((role) => role.role_id);
            const [permissions] = await db.query(
                `SELECT * FROM permissions p 
                 JOIN features f ON p.feature_id = f.feature_id 
                 WHERE p.role_id IN (?) AND (f.feature_name = ? OR f.parent_feature_id IN 
                 (SELECT feature_id FROM Features WHERE feature_name = ?))`, 
                [roleIds, featureName, featureName]
            );

            if (permissions.length > 0 && permissions.some((perm) => perm[`can_${action}`])) {
                return next();
            } else {
                return res.status(403).json({ message: 'Access Denied: Insufficient permissions.' });
            }
        } catch (error) {
            console.error('Permission check error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};
