export const adapt = (controller) => async (expressReq, expressRes) => {
  const req = {
    body: expressReq.body,
  };

  try {
    const { statusCode, data, error } = await controller.handle(req);
    return expressRes.status(statusCode).json({ data, error });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return expressRes.sendStatus(500);
  }
};
