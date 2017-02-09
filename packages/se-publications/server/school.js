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

  Courses({ courseIds }={}) {
    const { userId } = this;
    const selector = courseIds ? { _id: courseIds } : null;
    return Fetch.School(userId).courses(selector);
  },
});
