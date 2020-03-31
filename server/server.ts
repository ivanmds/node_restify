import * as restify from 'restify';
import { environment } from '../common/environment';
import { Router } from '../common/router';
const mongoose = require('mongoose');

export class Server {

    application: restify.Server;

    initializeDb() {
        return mongoose.connect(environment.db.url, { useNewUrlParser: true });
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });

                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());

                for (let router of routers) {
                    router.applyRoutes(this.application);
                }

                this.application.get('/hello', (req, resp, next) => {
                    resp.send({ message: 'hello' });
                    return next();
                });

                this.application.listen(environment.server.port, () => {
                    resolve(this.application);
                });

            } catch (error) {
                reject(error);
            }
        });
    };

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() => {
            return this.initRoutes(routers).then(() => this);
        });
    };

}