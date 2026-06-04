import { UpdatePasswordForm } from "@/components/admin/update-password-form";

export const metadata = {
  title: "Settings | Dashboard",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account settings</p>
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-6">
        <h3 className="text-lg font-medium mb-4">Update Password</h3>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
