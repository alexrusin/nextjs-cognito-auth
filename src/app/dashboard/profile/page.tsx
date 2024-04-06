import { lusitana } from "@/ui/fonts";
import UpdateProfileForm from "@/ui/profile-settings/update-profile-form";
import UpdatePasswordForm from "@/ui/profile-settings/update-password-form";
import UpdateEmailForm from "@/ui/profile-settings/update-email-form";

export default function Profile() {
  return (
    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className={`${lusitana.className} text-2xl`}>Profile Settings</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <UpdateProfileForm />
        <UpdatePasswordForm />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        <UpdateEmailForm />
      </div>
    </main>
  );
}
