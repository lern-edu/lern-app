AstroForm = function (AstroClass, submitMethod) {
  const restoreFields = AstroClass.getFieldsNames();

  return {

    /* Methods
    */

    updateValidation(error) {
      const valid = !error && this.doc.validate(false);
      if (error) this.doc.catchValidationException(error);
      const errors = this.doc.getValidationErrors();
      this.setState({ errors, valid });
    },

    restoreFields(restore) {
      const values = _.map(restoreFields, field => restore[field]);
      const obj = _.zipObject(restoreFields, values);
      const cleanObj = _.omit(obj, _.isUndefined);
      this.doc.set(cleanObj);
    },

    callback(key, ...args) {
      if (key === 'success') {
        if (_.isFunction(this.handleSubmitSuccess))
          this.handleSubmitSuccess(...args);
        else console.info(args);
      } else if (key === 'error') {
        if (_.isFunction(this.handleSubmitError))
          this.handleSubmitError(...args);
        else console.warn(args);
      } else throw new Meteor.Error('astroform.callback: wrong type');
    },

    /* Lifecycle
    */

    getInitialState() {
      return {
        errors: undefined,
        valid: undefined,
      };
    },

    componentWillMount() {
      const { doc, restore } = this.props;
      this.doc = doc || new AstroClass();
      if (restore) this.restoreFields(restore);
      this.updateValidation();
    },

    componentWillReceiveProps(props) {
      const { doc, restore } = props;
      if (doc) this.doc = doc;
      if (restore) this.restoreFields(restore);
      this.updateValidation();
    },

    /* Handlers
    */

    defaultHandler(arg, opts) {
      if (_.isObject(arg)) {
        if (opts.doc) this.doc.set(arg);
        if (opts.query) FlowRouter.withReplaceState(() => FlowRouter.setQueryParams(arg));
        this.updateValidation();
      } else if (_.isString(arg)) {
        return value => {
          if (opts.doc) this.doc.set(arg, value);
          if (opts.query) FlowRouter.withReplaceState(() =>
            FlowRouter.setQueryParams({ [arg]: value }));
          this.updateValidation();
        };
      } else throw new Meteor.Error('astroform.defaulthandler: wrong param');
    },

    defaultSubmit(event) {
      if (event && event.preventDefault) event.preventDefault();
      if (!submitMethod) this.callback('error', new Meteor.Error('no submit method set'));
      else if (!this.state.valid)
        this.callback('error', new Meteor.Error('invalid state: submit aborted'));
      else Meteor.call(submitMethod, this.doc, (err, res) => {
        if (err) {
          this.updateValidation(err);
          this.callback('error', err);
        } else this.callback('success', res);
      });
    },

  };
};
