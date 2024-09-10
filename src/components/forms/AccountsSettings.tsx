import { useState, FormEvent } from "react";
import "tailwindcss/tailwind.css";

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

interface TwoFactorAuth {
  isEnabled: boolean;
  phoneNumber: string;
}

const AccountSettings: React.FC = () => {
  const [email, setEmail] = useState<string>("user@example.com");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
    });
  const [twoFactorAuth, setTwoFactorAuth] = useState<TwoFactorAuth>({
    isEnabled: false,
    phoneNumber: "",
  });

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const toggleTwoFactorAuth = () => {
    setTwoFactorAuth((prev) => ({
      ...prev,
      isEnabled: !prev.isEnabled,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const accountSettingsData = {
      email,
      phone,
      password: password ? password : null,
      newPassword: newPassword === confirmPassword ? newPassword : null,
      notificationSettings,
      twoFactorAuth,
    };

    console.log(accountSettingsData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto"
    >
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

      <div>
        <label className="block text-gray-700">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Notification Settings */}
      <div>
        <h2 className="text-xl font-bold mb-2">Notification Settings</h2>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notificationSettings.emailNotifications}
              onChange={handleNotificationChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">Email Notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={notificationSettings.smsNotifications}
              onChange={handleNotificationChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">SMS Notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="pushNotifications"
              checked={notificationSettings.pushNotifications}
              onChange={handleNotificationChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">Push Notifications</span>
          </label>
        </div>
      </div>

      {/* Change Password */}
      <div>
        <h2 className="text-xl font-bold mb-2">Change Password</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Current Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
          />
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div>
        <h2 className="text-xl font-bold mb-2">Two-Factor Authentication</h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={twoFactorAuth.isEnabled}
            onChange={toggleTwoFactorAuth}
            className="form-checkbox text-blue-600"
          />
          <span className="ml-2">Enable Two-Factor Authentication (2FA)</span>
        </label>

        {twoFactorAuth.isEnabled && (
          <div className="mt-4">
            <label className="block text-gray-700">Phone Number for 2FA</label>
            <input
              type="tel"
              value={twoFactorAuth.phoneNumber}
              onChange={(e) =>
                setTwoFactorAuth({
                  ...twoFactorAuth,
                  phoneNumber: e.target.value,
                })
              }
              className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number for 2FA"
            />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2 text-red-600">Danger Zone</h2>
        <button
          type="button"
          className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
              )
            ) {
              console.log("Account deletion initiated.");
            }
          }}
        >
          Delete Account
        </button>
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </form>
  );
};

export default AccountSettings;
