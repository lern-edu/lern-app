Meteor.users.Schema.extend({
  methods: {
    getName() {
      return this.get('profile.name');
    },

    getRole() {
      return _.first(this.get('roles'));
    },

    getEmail() {
      return _.get(_.first(this.emails), 'address');
    },

    hasRole(r) {
      const role = this.getRole();
      return r === role;
    },

    getSettingsRoute() {
      const role = this.getRole();
      return _.capitalize(role) + 'Settings';
    },

    getHomeRoute() {
      const role = this.getRole();
      return _.capitalize(role) + 'Home';
    },

    getPlan() {
      return this.get('planProfile.plan');
    },
  },
});
