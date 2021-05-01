export interface Document {
  _id: string;
  name: string;
  updatedBy: string;
  updatedDate: Date;
  content: string;
}

export interface FullDocument extends Document {
  history: Document[];
}
