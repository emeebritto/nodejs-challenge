import express from "express";
import { router } from "./router";
import config from "config";

export class App {
  private server: express.Application;
  private port: number | string;

  constructor() {
    this.server = express();
    this.port = process.env.port || config.get('api.port');
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
