"use client";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import {
  handleConfirmUserAttribute,
  handleUpdateUserAttribute,
} from "@/lib/cognitoActions";
import useAuthUser from "@/app/hooks/use-auth-user";

export default function UpdateEmailForm() {
  const user = useAuthUser();
  const [status, dispatch] = useFormState(handleUpdateUserAttribute, "");
  const [confirmStatus, dispatchConfirm] = useFormState(
    handleConfirmUserAttribute,
    undefined
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                defaultValue={user?.email}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div>
              <input
                id="current_email"
                type="hidden"
                name="current_email"
                defaultValue={user?.email}
              />
            </div>
          </div>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "error" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                There was an error updating email.
              </p>
            </>
          )}
          {status === "success" && (
            <p className="text-sm text-green-500">
              Email has been updated successfully.
            </p>
          )}
        </div>
        {status?.includes("code") && (
          <>
            <div className="mb-1">
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium"
              >
                {status}
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="code"
                    type="text"
                    name="code"
                    placeholder="Enter code to verify email"
                    required
                    minLength={6}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {confirmStatus === "error" && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">
                    There was an error verifying your email
                  </p>
                </>
              )}
              {confirmStatus === "success" && (
                <p className="text-sm text-green-500">
                  Email verified successfully
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        {status?.includes("code") ? (
          <VerifyButton dispatch={dispatchConfirm} />
        ) : (
          <UpdateButton />
        )}
      </div>
    </form>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus();

  return <Button aria-disabled={pending}>Update Email</Button>;
}

function VerifyButton({ dispatch }: { dispatch: (payload: FormData) => void }) {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} formAction={dispatch}>
      Verify Email
    </Button>
  );
}
