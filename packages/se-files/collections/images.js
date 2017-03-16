import { FilesCollection } from 'meteor/ostrio:files';
import Grid from 'gridfs-stream'; // We'll use this package to work with GridFS
import fs from 'fs';              // Required to read files initially uploaded via Meteor-Files
import { MongoInternals } from 'meteor/mongo';

// Set up gfs instance
let gfs;
if (Meteor.isServer) {
  gfs = Grid(
    MongoInternals.defaultRemoteCollectionDriver().mongo.db,
    MongoInternals.NpmModule
  );
}

FS.Images = new FilesCollection({
  storagePath: 'assets/app/uploads/images',
  collectionName: 'GRID.Images',
  onBeforeUpload: function (file) {
    if (file.size <= (50 * 1024 * 1024) && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 50MB';
    }
  },

  onAfterUpload(image) {
    // Move file to GridFS
    Object.keys(image.versions).forEach(versionName => {
      const metadata = { versionName, imageId: image._id, storedAt: new Date() }; // Optional
      const writeStream = gfs.createWriteStream({ filename: image.name, metadata });

      fs.createReadStream(image.versions[versionName].path).pipe(writeStream);

      writeStream.on('close', Meteor.bindEnvironment(file => {
        const property = `versions.${versionName}.meta.gridFsFileId`;

        // Convert ObjectID to String. Because Meteor (EJSON?) seems to convert it to a
        // LocalCollection.ObjectID, which GFS doesn't understand.
        this.collection.update(image._id, { $set: { [property]: file._id.toString() } });

        // Unlink file by version from FS
        this.unlink(this.collection.findOne(image._id), versionName);
      }));
    });
  },

  interceptDownload(http, image, versionName) {
    const _id = (image.versions[versionName].meta || {}).gridFsFileId;
    if (_id) {
      const readStream = gfs.createReadStream({ _id });
      readStream.on('error', err => { throw err; });
      readStream.pipe(http.response);
    }

    return Boolean(_id); // Serve file from either GridFS or FS if it wasn't uploaded yet
  },

  onAfterRemove(images) {
    images.forEach(image => {
      Object.keys(image.versions).forEach(versionName => {
        const _id = (image.versions[versionName].meta || {}).gridFsFileId;
        if (_id) gfs.remove({ _id }, err => { if (err) throw err; });
      });
    });
  },

});

if (Meteor.isServer) {
  FS.Images.allow({
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
