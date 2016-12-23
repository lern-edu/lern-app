const videoS3Store = (
  new FS.Store.S3('videos', !Meteor.isServer ? undefined : {
    region: 'sa-east-1',
    accessKeyId: Meteor.settings.credentials.S3.accessKeyId,
    secretAccessKey: Meteor.settings.credentials.S3.secretAccessKey,
    bucket: 'se-edu',
  })
);

FS.Videos = new FS.Collection('videos', {
  stores: [videoS3Store],
  filter: {
    maxSize: 500 * 1024 * 1024,
    allow: {
      contentTypes: ['application/mp4'],
      extensions: ['mp4'],
    },
  },
});

FS.Videos.allow({
  insert() {
    return true;
  },

  update() {
    return true;
  },

  download() {
    return true;
  },
});
