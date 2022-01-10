import R from 'ramda';
import { appLogger } from '../../logger';

const adaptRequestForLogging = (expressReq) => ({
  ...R.pick(
    [
      'headers',
      'method',
      'url',
      'httpVersion',
      'body',
      'cookies',
      'path',
      'protocol',
      'query',
      'hostname',
      'ip',
      'params',
      'rid',
    ],
    expressReq,
  ),
});

const adaptLogTags = (expressReq) => ({
  userAgent: expressReq.headers['user-agent'],
});

export const adapt = (controller) => async (expressReq, expressRes) => {
  const req = {
    body: expressReq.body,
  };

  try {
    const { statusCode, data, error } = await controller.handle(req);
    return expressRes.status(statusCode).json({ data, error });
  } catch (error) {
    appLogger.error({
      err: error,
      extra: {
        request: adaptRequestForLogging(expressReq),
      },
      tags: adaptLogTags(expressReq),
    });
    return expressRes.sendStatus(500);
  }
};
