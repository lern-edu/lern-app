# Student - Methods

Student methods are divided by:
- answer
- attempt
- profile
- test

## Profile:

### AddEmail
- How to use:
```js
Meteor.call('StudentAddEmail', userId, email, callback());
```
- Use Meteor method [`Accounts.addEmail`](http://docs.meteor.com/api/passwords.html#Accounts-addEmail)

### SendVerificationEmail
- How to use:
```js
Meteor.call('StudentSendVerificationEmail', userId, email, callback());
```
- Use Meteor method [`Accounts.sendVerificationEmail`](http://docs.meteor.com/api/passwords.html#Accounts-sendVerificationEmail)

### UserSave
- How to use:
```js
Meteor.call('StudentUserSave', Meteor.users.Schema, callback());
```
- Save user

### CourseIngress
- How to use:
```js
Meteor.call('StudentCourseIngress', courseId, callback());
```
- Insert current user on `course.students` field
- If course author is a school user will do:
  - Update field `profile.school` in current user to course author
  - Push course author to `profile.schools` in current user
