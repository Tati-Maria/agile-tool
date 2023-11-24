import {model, Schema} from 'mongoose';
import {IUserStory} from "../types/user-story";

const userStorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    acceptanceCriteria: [{
        type: String,
        required: false,
    }],
    estimationPoints: {
        type: Number,
        required: false,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: false,
    }],
}, {timestamps: true});

//on delete cascade for project and tasks
//reminder: tasks are not deleted when user story is deleted
userStorySchema.pre<IUserStory>("deleteOne", {document: true, query: false}, async function () {
    const userStory = this as IUserStory;
    await userStory.model("Project").updateOne({_id: userStory.project}, {$pull: {userStories: userStory._id}});
    await userStory.model("Task").deleteMany({userStory: userStory._id});
});

const UserStory = model('UserStory', userStorySchema);
export default UserStory;