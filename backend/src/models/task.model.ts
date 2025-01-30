import { TaskPriorityEnum, TaskPriorityEnumType, TaskStatusEnum, TaskStatusEnumType } from '@enums/task.enum';
import { generateTaskCode } from '@utils/text.util';
import mongoose, { Document, Schema } from 'mongoose';

export interface TaskDocument extends Document {
  taskCode: string;
  title: string;
  description: string;
  project: mongoose.Types.ObjectId;
  workspace: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId | null;
  status: TaskStatusEnumType;
  priority: TaskPriorityEnumType;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const TaskSchema = new Schema<TaskDocument>(
  {
    taskCode: {
      type: String,
      required: true,
      trim: true,
      default: generateTaskCode()
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enums: Object.values(TaskStatusEnum),
      required: true,
      default: TaskStatusEnum.TODO
    },
    priority: {
      type: String,
      enums: Object.values(TaskPriorityEnum),
      required: false
    },
    dueDate: {
      type: Date,
      required: false
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    deleted: {
      type: Boolean,
      default: false
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);
export default TaskModel;
