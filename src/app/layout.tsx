import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "빅스페이먼츠 프론트엔드 사전 테스트",
  description: "빅스페이먼츠 프론트엔드 사전 테스트 페이지입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
