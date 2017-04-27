if (Meteor.isServer) {
  Meteor.methods({
    SearchVideo(videoId) {
      const future = new Future();
      YoutubeApi.videos.list({
        part: 'id, contentDetails, player, status, snippet',
        id: videoId,
      }, (err, res) => {
        if (err) future.throw(err);
        else future.return(res);
      });
      return future.wait();
    },
  });
};
