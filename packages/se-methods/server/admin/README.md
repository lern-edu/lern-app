# Admin - Methods

## CreateUser:
- How to use:
~~~js
  Meteor.call('AdminUserCreate', new Meteor.users.FormSchema(), callback);
~~~
- This method create users from all roles, each role has your own behavior:
  - **Admin**: Nothing special
  - **Teacher**: Nothing special
  - **School**: Nothing special
  - **Student**: If has school field, the course of this school will be added this new student
- After user create an enrollment email will be sent
___
## TestSave: (Default Save)
___
## PlanSave: (Default Save)
___
## QuestionSave: (Default Save)
___
## TagSave: (Default Save)
___
## UserSave: (Default Save)
___
## UserPassword
- This method will update user password and logout selected user
- How to use:
 ~~~js
   Meteor.call('AdminUserPassword', userId, password);
 ~~~
