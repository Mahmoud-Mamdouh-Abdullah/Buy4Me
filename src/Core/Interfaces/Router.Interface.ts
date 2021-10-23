import { IRouter } from "express";

export interface RouterInterface {
    getPath(): string;

    getRouter(): IRouter;
}