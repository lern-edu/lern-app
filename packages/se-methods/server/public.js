const [prefix, protect] = ['Public', 'public'];

Helpers.Methods({ prefix, protect }, {
  SendEmail({ email, text }) {
    Email.send({
      from: email,
      to: Meteor.settings.emails.default,
      subject: 'Informação',
      text: text,
    });

  },

  StudentRegister({ name, email }) {
    const userId = Accounts.createUser({ email });
    const user = _.first(Fetch.General.users(userId).fetch());

    user.set('profile', new Meteor.users.ProfileSchema({
      name,
      schools: ['fFNyCwTZXy5Xff7Wr'],
      school: 'fFNyCwTZXy5Xff7Wr',
    }));
    user.set('roles', ['student']);

    Check.Astro(user).valid();
    user.save();

    Accounts.sendEnrollmentEmail(userId);

    return user;
  },
});
