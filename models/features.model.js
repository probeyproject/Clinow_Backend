import db from "../db/db.js";


export const addFeatureModel = async (featureName, description, featureLogoUrl, featureLink, featureStatus, parentFeatureId) => {
    try {
        const result = await db.query(
            "INSERT INTO features (feature_name, description, feature_logo, feature_link, feature_status, parent_feature_id) VALUES (?, ?, ?, ?, ?, ?)",
            [featureName, description, featureLogoUrl, featureLink, featureStatus, parentFeatureId]
        );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(`Error in adding feature: ${error.message}`);
    }
};


export const getFeatureModel=async()=>{
    try {
        const [result]=await db.query("select * from features")
        return result
    } catch (error) {
        throw new Error(`Error in getting feature ${error.messagea}`)
    }
}

export const getFeatureByIdModel=async(featureId)=>{
    try {
        const [result]=await db.query("select * from features where feature_id=?",[featureId])
        return result
    } catch (error) {
        throw new Error(`Error in getting feature ${error.message}`)
    }
}

export const updateFeatureModel=async(featureId,featureName,description,featureLogoUrl,featureLink,featureStatus,parentFeatureId)=>{
    try {

        const [result]=await db.query("update features set feature_name=?,description=?,feature_logo=?,feature_link=?,feature_status=?,parent_feature_id=? where feature_id=?",[featureName,description,featureLogoUrl,featureLink,featureStatus,parentFeatureId,featureId])
        return result
        
    } catch (error) {
        throw new Error(`Error in updating feature ${error.message}`)
    }
}

export const deleteFeatureModel=async(featureId)=>{
    try {
        const [result]=await db.query("delete from features where feature_id=?",[featureId])
        return result
    } catch (error) {
        throw new Error(`Error in deleting features ${error.message}`)
    }
}
