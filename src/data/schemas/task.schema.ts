import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import {Document, PipelineStage, Types} from "mongoose";
import {Project} from "./project.schema";

export enum taskCategory {
    ENTERPRISE = "Enterprise",
    SMALL_BUSINESS = "Small Business",
    STARTUP = "Startup",
}

export enum status {
    Draft = "Draft",
    InProgress = "In Progress",
    Completed = "Completed",
}

@Schema({ timestamps: true })
export class Task extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ enum: taskCategory })
    category: taskCategory;

    @Prop({ type: { type: Types.ObjectId, ref: Project.name } })
    project: Project;

    @Prop({  enum: status })
    status: status;

    @Prop()
    estimatedDate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
