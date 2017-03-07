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

FS.Videos = new FilesCollection({
  storagePath: 'assets/app/uploads/videos',
  collectionName: 'FS.Videos',
  onBeforeUpload: function (file) {
    if (file.size <= (500 * 1024 * 1024) && /mp4/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload video, with size equal or less than 500MB';
    }
  },

  onAfterUpload: function (file) {
    var _this = this;
    var params = {
      localFile: file.path,
      s3Params: {
        Bucket: 'se-edu',
        Key: 'videos/' + file._id,
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
            Key: 'videos/' + cursor[0]._id,
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
  FS.Videos.allow({
    insert: function () {
      return true;
    },

    update: function () {
      return true;
    },

    remove: function () {
      return true;
    },
  });
}
