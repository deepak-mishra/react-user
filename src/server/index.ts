import { AppServer } from './sever';

const app: AppServer = new AppServer();
app.listen(3001).then(() => {
    // server
});
