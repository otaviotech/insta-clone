// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.sendStatus(500);
};
