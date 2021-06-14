process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';


import express from 'express';
import passport from 'passport';

import Routes from '@interfaces/routes.interface';
import DB from './databases';
import ErrorMiddleware from './middlewares/error.middleware';

class App {
    public app: express.Application;
    public port: string | number;
    public env: string;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development';

        //
        this.connect2Database();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.info(`=================================`);
            console.info(`======= ENV: ${this.env} =======`);
            console.info(`🚀 App listening on the port ${this.port}`);
            console.info(`=================================`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(passport.initialize());
    }

    private connect2Database() {
        DB.sequelize.sync({ force: false });
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/api/', route.router);
        })
    }

    private initializeErrorHandling() {
        this.app.use(ErrorMiddleware);
    }
}

export default App;