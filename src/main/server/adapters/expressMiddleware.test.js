import { jest } from '@jest/globals';
import { adaptMiddleware } from './expressMiddleware';

describe('ExpressMiddlewareAdapter', () => {
  const makeSut = () => {
    const middlewareStub = {
      handle: jest.fn(() => ({ statusCode: 200 })),
    };

    const loggerStub = {
      errorWithRequest: jest.fn(),
    };

    const expressResStub = {
      status: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    };
    const expressNextFnStub = jest.fn();

    const sut = adaptMiddleware(middlewareStub, loggerStub);

    const validInput = {
      body: { some: 'prop', other: 'prop' },
      headers: { authorization: 'Bearer <token>' },
    };

    return {
      sut,
      middlewareStub,
      loggerStub,
      expressResStub,
      expressNextFnStub,
      validInput,
    };
  };
  it('should pass the correct values', async () => {
    const {
      sut,
      middlewareStub,
      expressResStub,
      expressNextFnStub,
      validInput,
    } = makeSut();

    await sut(validInput, expressResStub, expressNextFnStub);

    expect(middlewareStub.handle).toHaveBeenCalledWith({
      body: { some: 'prop', other: 'prop' },
      headers: { authorization: 'Bearer <token>' },
    });
  });

  it('should send the statusCode and the error if statusCode and error are returned from middleware', async () => {
    const {
      sut,
      middlewareStub,
      loggerStub,
      expressResStub,
      expressNextFnStub,
      validInput,
    } = makeSut();

    middlewareStub.handle.mockImplementationOnce(() => ({
      statusCode: 401,
      error: new Error('Any Error'),
    }));

    await sut(validInput, expressResStub, expressNextFnStub);

    expect(expressResStub.status).toHaveBeenCalledWith(401);
    expect(expressResStub.json).toHaveBeenCalledWith(new Error('Any Error'));
    expect(loggerStub.errorWithRequest).toHaveBeenCalledWith(
      new Error('Any Error'),
      validInput,
    );
  });

  it('should send the statusCode if only statusCode is returned from middleware', async () => {
    const {
      sut,
      middlewareStub,
      expressResStub,
      expressNextFnStub,
      validInput,
    } = makeSut();

    middlewareStub.handle.mockImplementationOnce(() => ({
      statusCode: 401,
    }));

    await sut(validInput, expressResStub, expressNextFnStub);

    expect(expressResStub.sendStatus).toHaveBeenCalledWith(401);
    expect(expressResStub.status).not.toHaveBeenCalled();
    expect(expressResStub.json).not.toHaveBeenCalled();
  });

  it('should inject values into the request if any provided from middleware', async () => {
    const {
      sut,
      middlewareStub,
      expressResStub,
      expressNextFnStub,
      validInput,
    } = makeSut();

    middlewareStub.handle.mockResolvedValueOnce({
      injectReq: {
        user: { id: 1 },
      },
    });

    await sut(validInput, expressResStub, expressNextFnStub);

    expect(expressNextFnStub).toHaveBeenCalled();
    expect(validInput.user).toEqual({ id: 1 });
  });
});
