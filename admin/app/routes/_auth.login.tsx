import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";
import { AppIcon } from "app/components/app-icon";

export default function Login() {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: "demo@refine.dev", password: "demodemo" },
      }}
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
