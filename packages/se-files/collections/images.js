const imageS3Store = (
  new FS.Store.S3('images', !Meteor.isServer ? undefined : {
    region: 'sa-east-1',
    accessKeyId: Meteor.settings.credentials.S3.accessKeyId,
    secretAccessKey: Meteor.settings.credentials.S3.secretAccessKey,
    bucket: 'se-edu',
  })
);

// const imageS3Store = new FS.Store.FileSystem('images', { path: '~/Desktop/cfs/images' });

FS.Images = new FS.Collection('images', {
  stores: [imageS3Store],
  filter: {
    maxSize: 50 * 1024 * 1024,
    allow: {
      contentTypes: ['image/jpeg', 'binary/octet-stream'],
      extensions: ['jpeg', 'jpg', 'png'],
    },
  },
});

FS.Images.allow({
  insert() {
    return true;
  },

  update() {
    return true;
  },

  remove() {
    return true;
  },

  download() {
    return true;
  },
});
