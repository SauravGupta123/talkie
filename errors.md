#### error 1
{

    error : cannot destructure fullName as it is undefined in req.body(),
    file : auth.controller.js
    function : signup
    solution : app.use(express.json()) above any api route.

}
#### error 2
{
    error : Error in signup controller Expected "payload" to be a plain object.,
    file : generateToken.js & auth.controller.js;
    function : token->jwt.sign
    solution : As we are passing newUser._id as a string we need to deconstruct the object when putting it in payload as it is expecting a plain object and not a string. 

}

## Front end errors 

#### error 3 : "A component is changing a controlled input to be uncontrolled,"
##### Mistake : inputs object ki jagah setinput function spread krdia .
##### AI Generated Solution :
The error message you're encountering, "A component is changing a controlled input to be uncontrolled," typically occurs when there's a mismatch between the initial value of an input field and how it's being updated in your React component. Let's take a closer look at your code to identify the issue.

1. **Initial State and Controlled Components**:
   In your `SignUp` component, you've initialized the `inputs` state using `useState`:

   ```javascript
   const [inputs, setInputs] = useState({
     fullName: "",
     username: "",
     password: "",
     comfirmPassword: "",
     gender: "",
   });
   ```

   The `value` properties of your input fields (`fullName` and `username`) are bound to the corresponding values in the `inputs` state. This makes them **controlled components** because their values are controlled by React state.

2. **Checkbox Handling**:
   You also have a `handleCheckBoxChange` function that updates the `gender` property in the `inputs` state:

   ```javascript
   const handleCheckBoxChange = (gender) => {
     setInputs({ ...inputs, gender: gender });
   };
   ```

   However, there's a small issue here. You're spreading the entire `inputs` object and then updating the `gender` property. This means that other properties (such as `fullName` and `username`) will be set to `undefined` when the checkbox changes. This mismatch between the initial value (defined) and the updated value (undefined) triggers the warning.

3. **Fixing the Issue**:
   To fix this, update your `handleCheckBoxChange` function to only modify the `gender` property without affecting other properties:

   ```javascript
   const handleCheckBoxChange = (gender) => {
     setInputs({ ...inputs, gender: gender });
   };
   ```

   Alternatively, you can use the functional update pattern to avoid the issue altogether:

   ```javascript
   const handleCheckBoxChange = (gender) => {
     setInputs((prevInputs) => ({ ...prevInputs, gender: gender }));
   };
   ```

   This ensures that other properties remain unchanged while only updating the `gender`.

4. **Summary**:
   Make sure that any changes to the state properties maintain consistency with their initial values. By following the suggestions above, you should be able to resolve the warning about controlled and uncontrolled components.

Remember that controlled components use state to manage their values, while uncontrolled components rely on DOM properties (such as `defaultValue`). 




#### error 4 : Error: Invalid hook call. Hooks can only be called inside of the body of a function component.
##### Solution : 

Possible solution: 
To fix this error, you need to identify which of the above causes is applicable to your case, and follow the corresponding suggestions1. In your code, it seems that you are calling the useAuthContext hook inside the logout function, which is a promise. This breaks the rule of calling hooks at the top level of your function component or custom hook1. To fix this, you need to move the useAuthContext hook outside the logout function, and pass the authContext as a parameter to the logout function. For example:
function LogoutBtn() {
  // ✅ Good: call the hook at the top level
  const authContext = useAuthContext();

  function logout(authContext) {
    // ... use authContext here
  }
}

#####