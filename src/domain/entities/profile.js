export class Profile {
  constructor({
    id,
    userId,
    username,
    name,
    site,
    bio,
    email,
    phone,
    createdAt,
    updatedAt,
    followers,
    following,
  } = {}) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.name = name;
    this.site = site;
    this.bio = bio;
    this.email = email;
    this.phone = phone;
    this.followers = followers?.map((f) => new Profile(f));
    this.following = following?.map((f) => new Profile(f));
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
