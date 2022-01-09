import { Profile } from './profile';

export class User {
  constructor({
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt,
    profiles,
  } = {}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.profiles = profiles?.map((p) => new Profile(p));
  }
}
