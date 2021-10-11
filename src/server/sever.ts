import * as http from "http";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {ApiRoutes} from "./routes/apiRoutes";
export class AppServer {
    public readonly app: express.Express;

    private server: http.Server;
    constructor(){
        this.app = express();
        this.setupBase();
        this.setupRouting();
    }

    /**
     * setup basic express settings
     */
    private setupBase(): void {
        this.app.disable('etag');
        this.app.disable('x-powered-by');
        this.app.set('json spaces', 0);
        this.app.use(bodyParser.json({ limit: '2mb' }));
        this.app.use(cors());
    }



    public listen(port: number): Promise<void> {
        if (this.server !== undefined) {
            return Promise.reject('server already running');
        }

        return new Promise<void>((resolve) => {
            this.server = http.createServer(this.app);
            this.server.listen(port, () => {
                const port = this.getPort();
                console.log(`Node server listening on port: ${port}`);
                resolve();
            });
            this.server.on('error', this.onError.bind(this));
        });
    }

    private onError(error: any): void {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const port = this.getPort();
        switch (error.code) {
            case 'EACCES':
                console.error(`${port} : requires privileges`);
                process.exit(1);
                break;

            case 'EADDRINUSE':
                console.error(`${port} : already in use`);
                process.exit(1);
                break;

            default:
                throw error;
        }
    }

    private getPort(): string | number {
        const address = this.server?.address() || '';
        return typeof address === 'string' ? address : address?.port;
    }

    private setupRouting() {

        this.app.use('/api', new ApiRoutes().router);
    }
}