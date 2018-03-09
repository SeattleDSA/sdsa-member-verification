import Express from 'express';
import _ from 'lodash';

import auth from './auth';
import memberLookup from './member-lookup';
import errorHandler from './error-handler';

const app = new Express();

app.use(auth);

app.post('/', (request, response) => {
  memberLookup(request.query.email)
    .then((isMember) => {
      response.status(200).json({ isMember });
    }).catch((error) => {
      let queryMissing = !!_.get(error, 'detail', '')
          .match(/^Please provide \'query\'/);

      if((error.status == 400) && queryMissing) {
        response.status(400).json({
          error: "email parameter required"
        });
      } else {
        console.log(error.message, error.stack);

        response.status(500).json({
          error: "an error occurred"
        });
      }
    });
});

app.use(errorHandler);

if(process.env.NODE_ENV != "production") {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`SDSA Member Verification API running in dev mode on port ${port}`);
  });
}

export default app;
