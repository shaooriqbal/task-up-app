// src/schemas/project.schema.ts
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Person } from "./person.schema";

export enum ProjectCategory {
    WEB = "Web",
    MOBILE = "Mobile",
    DESKTOP = "Desktop",
}

export enum TechStack {
    NODE = "Node.js",
    NEST = "NestJS",
    REACT = "React",
    ANGULAR = "Angular",
    FLUTTER = "Flutter",
}

export enum ClientCategory {
    ENTERPRISE = "Enterprise",
    SMALL_BUSINESS = "Small Business",
    STARTUP = "Startup",
}

@Schema({ timestamps: true })
export class Project extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ enum: ProjectCategory })
    category: ProjectCategory;

    @Prop({ type: [{ type: Types.ObjectId, ref: Person.name }] })
    persons: Person[];

    @Prop({ type: [String], enum: TechStack })
    techStack: TechStack[];

    @Prop({ enum: ClientCategory })
    clientCategory: ClientCategory;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
