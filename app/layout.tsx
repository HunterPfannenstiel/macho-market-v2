import { WalletModal } from "../components/providers/Web3Config";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="modal"></div>
        {children}
        {/* <WalletModal /> */}
      </body>
    </html>
  );
}
