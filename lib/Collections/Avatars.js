var avatarsStore = new FS.Store.GridFS("avatars", {
    maxTries: 1
});
Avatars = new FS.Collection("avatars", {
    stores: [avatarsStore]
});