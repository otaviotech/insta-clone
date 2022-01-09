import { Profile } from './profile';

export class User {
  constructor({
    id = null,
    name = null,
    email = null,
    password = null,
    createdAt = null,
    updatedAt = null,
    profiles = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.profiles = profiles.map((p) => new Profile(p));
  }
}
