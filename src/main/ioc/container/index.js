import awlix from 'awilix';
import { registerDataLayer } from './data';
import { registerPresentationLayer } from './presentation';
import { registerInfraLayer } from './infra';

const container = awlix.createContainer();

registerPresentationLayer(container);
registerDataLayer(container);
registerInfraLayer(container);

export { container };
