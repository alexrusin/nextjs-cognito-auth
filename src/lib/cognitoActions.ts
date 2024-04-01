export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  console.log("signing up");
  return "Error creating an account";
}

export async function confirmSignUp(
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
