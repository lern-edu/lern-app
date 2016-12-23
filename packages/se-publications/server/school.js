const [prefix, protect] = ['School', 'school'];

Helpers.Publications({ type: 'plain', prefix, protect }, {
  Teachers() {
    const { userId } = this;
    return Fetch.School(userId).teachers();
  },

  Students() {
    const { userId } = this;
    return Fetch.School(userId).students();
  },

  Courses() {
    const { userId } = this;
    return Fetch.School(userId).courses();
  },
});
