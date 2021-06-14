
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import App from "@/app";

import AuthRoute from "@routes/auth.route";
import ShortURLRoute from "@routes/short-url.route";

const app = new App([new AuthRoute(), new ShortURLRoute()]);

app.listen();