export class Profile {
  constructor({
    id = null,
    userId = null,
    username = null,
    name = null,
    site = null,
    bio = null,
    email = null,
    phone = null,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.name = name;
    this.site = site;
    this.bio = bio;
    this.email = email;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
