import express, { type Express } from "express";
import Hapi from "hapi";

type Methods = "get";

export default interface HttpServer {
  register(method: Methods, url: string, callback: Function): void;
  listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
  app: Express;

  constructor() {
    this.app = express();
  }

  register(method: Methods, url: string, callback: Function): void {
    this.app[method](url.replace(/\{|\}/g, ""), async (req, res) => {
      const output = await callback(req.params, req.body);

      res.json(output);
    });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}

export class HapiAdapter implements HttpServer {
  server: Hapi.Server;

  constructor() {
    this.server = new Hapi.Server();
  }

  register(method: Methods, url: string, callback: Function): void {
    this.server.route({
      method,
      path: url.replace(/:/g, ""),
      handler: async (req) => {
        // @ts-ignore
        const output = await callback(req.params, req.body);

        return output;
      },
    });
  }

  listen(port: number): void {
    this.server.settings.port = port;
    this.server.start();
  }
}
