"use client";

import { useAuthUser } from "@/lib/use-auth-user";
import Navbar from "./Navbar";

export default function SessionNavbar() {
  const { user } = useAuthUser();
  return <Navbar user={user} />;
}