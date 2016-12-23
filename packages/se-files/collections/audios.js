const audioS3Store = (
  new FS.Store.S3('audios', !Meteor.isServer ? undefined : {
    region: 'sa-east-1',
    accessKeyId: Meteor.settings.credentials.S3.accessKeyId,
    secretAccessKey: Meteor.settings.credentials.S3.secretAccessKey,
    bucket: 'se-edu',
  })
);

FS.Audios = new FS.Collection('audios', {
  stores: [audioS3Store],
  filter: {
    maxSize: 20000000,
    allow: {
      contentTypes: ['audio/mpeg'],
      extensions: ['mp3'],
    },
  },
});

FS.Audios.allow({
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
