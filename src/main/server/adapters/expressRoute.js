import { appLogger } from '../../logger';

export const adapt = (controller) => async (expressReq, expressRes) => {
  const req = {
    body: expressReq.body,
  };

  try {
    const { statusCode, data, error } = await controller.handle(req);
    return expressRes.status(statusCode).json({ data, error });
  } catch (error) {
    appLogger.errorWithRequest(error, expressReq);
    return expressRes.sendStatus(500);
  }
};
