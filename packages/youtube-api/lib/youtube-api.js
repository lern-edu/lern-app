Youtube = {
  video: {
    list(id, cb) {
      Meteor.call('searchVideo', id, cb);
    },
  },

  url: {
    getId(url) {
      return url.replace(regex, '');
    },

    isYoutubeUrl(url) {
      return url.match(regex) ? true : false;
    },
  },
};
