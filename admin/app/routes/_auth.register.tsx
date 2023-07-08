import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";
import { AppIcon } from "app/components/app-icon";

export default function Register() {
  return (
    <AuthPage
      type="register"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="refine Project"
          icon={<AppIcon />}
        />
      }
    />
  );
}
