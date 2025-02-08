import { ConfigProvider } from "antd";
import React from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#30314D",
          borderRadius: 2,
        },
        component: {
          colorBgContainer: "#30314D",
          colorBgPrimary: "#30314D",
          borderColorBase: "#30314D",
          colorPrimaryHover: "#30314D",
          colorPrimaryBgHover: "#30314D",
          colorOutline: "none",
          colorBorder: "#30314D",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
