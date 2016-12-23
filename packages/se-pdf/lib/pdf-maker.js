PDFMaker = {
  createPDF(test, options, cb) {
    const images = {};
    _.forEach(Fetch.General.images().fetch(), img => {
      images[_.get(img, '_id')] = {
        url: `${window.location.origin}${img.url()}`,
        name: _.get(img, 'original.name'),
      };
    });

    Meteor.call('testToUrl', test, images, options, cb);
  },

};
