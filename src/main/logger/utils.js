import R from 'ramda';

export const adaptRequestForLogging = (expressReq) => ({
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

export const adaptLogTags = (expressReq) => ({
  userAgent: expressReq.headers['user-agent'],
});
