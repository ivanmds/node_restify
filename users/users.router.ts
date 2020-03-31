import { Router } from '../common/router';
import * as restify from 'restify';
import { User } from './users.model'

class UsersRouter extends Router {

    applyRoutes(application: restify.Server) {
        application.get('/users', (req, resp, next) => {

            User.find().then(users => {
                resp.send(users);
                return next();
            });

        });

        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(user => {

                if (user) {
                    resp.send(user);
                }
                else {
                    resp.send(404);
                }

                return next();
            });

        });
    }
}

export const usersRouter = new UsersRouter();