import { FilesCollection } from 'meteor/ostrio:files';

if (Meteor.isServer) {
  var s3 = require('s3');
  var client = s3.createClient({
    s3Options: {
      region: 'sa-east-1',
      accessKeyId: Meteor.settings.credentials.S3.accessKeyId,
      secretAccessKey: Meteor.settings.credentials.S3.secretAccessKey,
    },
  });
}

FS.Images = new FilesCollection({
  storagePath: 'assets/app/uploads/images',
  collectionName: 'FS.Images',
  debug: true,
  onBeforeUpload: function (file) {
    if (file.size <= (50 * 1024 * 1024) && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 50MB';
    }
  },

  onAfterUpload: function (file) {
    var _this = this;
    var params = {
      localFile: file.path,
      s3Params: {
        Bucket: 'se-edu',
        Key: file._id,
      },
    };

    var uploader = client.uploadFile(params);
    uploader.on('error', function (err) {
      console.error('unable to upload:', err.stack);
    });
  },

  onAfterRemove: function (cursor) {
    if (cursor && cursor.length) {
      var params = {
        Bucket: 'se-edu',
        Delete: {
          Objects: [{
            Key: cursor[0]._id,
          },
          ],
        },
      };
      var remover = client.deleteObjects(params);
      remover.on('error', function (err) {
        console.error('unable to remove:', err.stack);
      });

      return true;
    }

    return false;
  },

});

if (Meteor.isServer) {
  FS.Images.deny({
    insert: function () {
      return false;
    },

    update: function () {
      return false;
    },

    remove: function () {
      return false;
    },
  });
}
