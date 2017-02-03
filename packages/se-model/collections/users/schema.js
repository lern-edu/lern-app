Meteor.users.ProfileSchema = Astro.Class({
  name: 'UserProfile',
  fields: {
    name: {
      type: 'string',
      validator: Validators.UserName(),
    },
    profilePic: {
      type: 'string',
      optional: true,
    },
    gender: {
      type: 'string',
      optional: true,
    },
    firstName: {
      type: 'string',
      optional: true,
    },
    lastName: {
      type: 'string',
      optional: true,
    },
    schoolType: {
      type: 'string',
      validator: Validators.OneOf(SchoolTypes.all('keys')),
      optional: true,
    },
    cnpj: {
      type: 'string',
      validator: Validators.cnpj(),
      optional: true,
    },
    cpf: {
      type: 'string',
      validator: Validators.cpf(),
      optional: true,
    },
    school: {
      type: 'string',
      validator: Validators.Reference(),
      optional: true,
      default: 'fFNyCwTZXy5Xff7Wr',
    },
    schools: {
      type: 'array',
      validator: Validators.References(),
      optional: true,
      default() {
        return ['fFNyCwTZXy5Xff7Wr'];
      },
    },
    tutorial: {
      type: 'boolean',
      validator: Validators.boolean(),
      default: true,
    },
  },
});

Meteor.users.PlanProfileSchema = Astro.Class({
  name: 'UserPlanProfile',
  fields: {
    plan: {
      type: 'string',
      validator: Validators.Reference(),
      optional: true,
    },
    focusSubjects: {
      type: 'array',
      validator: Validators.References(),
      default: () => [],
    },
    getDaily: {
      type: 'boolean',
      default: true,
      immutable: true,
    },
    getFocus: {
      type: 'boolean',
      default: true,
      immutable: true,
    },
    getMock: {
      type: 'boolean',
      default: true,
      immutable: true,
    },
    getMisses: {
      type: 'boolean',
      default: true,
      immutable: true,
    },
  },
});

Meteor.users.FormSchema = Astro.Class({
  name: 'UserForm',
  fields: {
    email: {
      type: 'string',
      validator: Validators.and([Validators.required(), Validators.email()]),
    },
    role: {
      type: 'string',
      validator: Validators.OneOf(UserRoles.all('keys')),
      default: 'student',
    },
    name: {
      type: 'string',
      validator: Validators.UserName(),
    },
    schoolType: {
      type: 'string',
      validator: Validators.UserRoles({
        roles: ['school'],
        validator: Validators.OneOf(SchoolTypes.all('keys')),
      }),
    },
    cnpj: {
      type: 'string',
      validator: Validators.UserRoles({ roles: ['school'], validator: Validators.cnpj() }),
    },
    cpf: {
      type: 'string',
      validator: Validators.UserRoles({
        roles: ['student', 'teacher'],
        validator: Validators.cpf(),
      }),
    },
    school: {
      type: 'string',
      validator: Validators.UserRoles({
        roles: ['student', 'teacher'],
        validator: Validators.Reference(),
      }),
      optional: true,
      default: 'fFNyCwTZXy5Xff7Wr',
    },
    schools: {
      type: 'array',
      validator: Validators.UserRoles({
        roles: ['student', 'teacher'],
        validator: Validators.References(),
      }),
      optional: true,
      default() {
        return ['fFNyCwTZXy5Xff7Wr'];
      },
    },
  },
});

Meteor.users.Schema = Astro.Class({
  name: 'User',
  collection: Meteor.users,
  fields: {
    emails: 'array',
    services: 'object',
    preferences: 'object',
    createdAt: 'string',

    roles: {
      type: 'array',
      validator: Validators.and([Validators.SomeOf(UserRoles.all('keys')), Validators.length(1)]),
      default: 'student',
    },

    profile: {
      type: 'object',
      nested: 'UserProfile',
      validator: Validators.required(),
    },

    planProfile: {
      type: 'object',
      nested: 'UserPlanProfile',
      default: () => {},
    },
  },
});
