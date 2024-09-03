import { getServerSession } from "next-auth";
import { authOptions } from "next-auth";

export default function Layout({ children }) {
  return (
    <div>
      <header>
      </header>
      <main>{children}</main>
    </div>
  );
}