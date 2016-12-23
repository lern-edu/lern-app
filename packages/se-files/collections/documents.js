const documentS3Store = (
  new FS.Store.S3('documents', !Meteor.isServer ? undefined : {
    region: 'sa-east-1',
    accessKeyId: Meteor.settings.credentials.S3.accessKeyId,
    secretAccessKey: Meteor.settings.credentials.S3.secretAccessKey,
    bucket: 'se-edu',
  })
);

// const documentS3Store = new FS.Store.FileSystem('documents', { path: '~/Desktop/cfs/documents' });

FS.Documents = new FS.Collection('documents', {
  stores: [documentS3Store],
  filter: {
    maxSize: 10 * 1024 * 1024,
    allow: {
      contentTypes: ['application/pdf'],
      extensions: ['pdf'],
    },
  },
});

FS.Documents.allow({
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
