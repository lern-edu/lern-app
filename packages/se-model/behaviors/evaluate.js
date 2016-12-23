Astro.createBehavior({
  name: 'evaluate',
  createSchemaDefinition() {
    return {
      fields: {
        like: {
          type: 'array',
          validator: Validators.References(),
          optional: true,
        },
        useless: {
          type: 'array',
          validator: Validators.References(),
          optional: true,
        },
      },
      events: {
        beforeInsert() {
          // TODO Update user score
        },
      },
      methods: {
        findEvaluators() {
          return Fetch.General.users(_.union(
              this.get('like'), this.get('useless')));
        },
      },
    };
  },
});
