import {model, Schema} from 'mongoose';

const activitySchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: false,
    },
    entity: {
        type: String,
        required: true,
    },
    entityId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, {timestamps: true});

//purge activity log after 5 days
activitySchema.index({createdAt: 1}, {expireAfterSeconds: 432000});


const Activity = model('Activity', activitySchema);
export default Activity;