export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  console.log("signing up");
  return "Error creating an account";
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  console.log("resending verification code");
  const currentState = {
    ...prevState,
    message: "Code sent successfully",
  };

  return currentState;
}

export async function handleConfirmSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  console.log("confirming sign up");
  return "Invalid code";
}

export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
) {
  console.log("signing in");
  return "Error logging in";
}

export async function handleSignOut() {
  console.log("signing out");
}
