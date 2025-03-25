import { ConfigProvider } from "antd";
import React from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const primaryColor = "#30314D"; // Your primary color
  const btnTextColor = "#000000"; // Black text for buttons
  const defaultTextColor = "#000000"; // Black text globally

  return (
    <ConfigProvider
      theme={{
        // ===== Global Settings =====
        token: {
          colorPrimary: primaryColor,
          colorBorder: primaryColor,
          colorBgContainer: primaryColor,
          borderRadius: 2,
          colorText: defaultTextColor, // Global text color
        },
        // ===== Component-Specific Overrides =====
        components: {
          // ===== Buttons =====
          Button: {
            colorText: btnTextColor, // Force black text in buttons
            colorBgContainer: primaryColor, // Your primary color background
            colorBorder: primaryColor,
            colorPrimaryHover: "#454772", // Hover state
            colorPrimaryActive: "#1E1F3A", // Active state
            // For outlined buttons
            defaultBorderColor: primaryColor,
            defaultColor: btnTextColor,
          },
          // ===== Inputs =====
          Input: {
            colorText: defaultTextColor, // Black input text
            colorBgContainer: "#FFFFFF", // White background
            colorBorder: primaryColor,
          },
          // ===== Other components =====
          Typography: {
            colorText: defaultTextColor, // Black text for headings/paragraphs
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
