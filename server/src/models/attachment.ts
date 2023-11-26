import { model, Schema } from "mongoose";
import { IAttachment } from "../types/attachment";

export const attachmentSchema: Schema = new Schema<IAttachment>({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: ["File", "Link"],
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

const Attachment = model<IAttachment>("Attachment", attachmentSchema);

export default Attachment;