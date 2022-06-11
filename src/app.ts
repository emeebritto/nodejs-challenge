import express from "express";
import dotenv from "dotenv";
import { router } from "./router";
dotenv.config();

export class App {
  private server: express.Application;
  private port: number | string;

  constructor() {
    this.server = express();
    this.port = process.env.port || 3000;
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(express.json());
  }

  private router() {
    this.server.use(router);
  }

  startup(callback?: (() => void)) {
    this.server.listen(this.port, () => {
      if (callback) callback()
    });
  }
}
