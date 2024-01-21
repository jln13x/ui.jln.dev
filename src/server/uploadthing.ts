import { createUploadthing, type FileRouter } from "uploadthing/next";

const _ = createUploadthing();

export const fileRouter = {} satisfies FileRouter;

export type OurFileRouter = typeof fileRouter;
