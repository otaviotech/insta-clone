import { AppEnv } from '../env';
import { app } from './app';

app.listen(AppEnv.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is ready for requests at port ${AppEnv.PORT}.`);
});
