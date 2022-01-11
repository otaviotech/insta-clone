export const adaptMiddleware =
  (middleware, logger) => async (expressReq, expressRes, expressNextFn) => {
    const req = {
      body: expressReq.body,
      headers: expressReq.headers,
    };

    const result = await middleware.handle(req);

    const { statusCode, error, injectReq } = result;

    if (statusCode) {
      if (!error) {
        return expressRes.sendStatus(statusCode);
      }

      expressRes.status(statusCode);
    }

    if (error) {
      logger.errorWithRequest(error, expressReq);
      return expressRes.json(error);
    }

    if (injectReq) {
      Object.assign(expressReq, injectReq);
    }

    return expressNextFn();
  };
