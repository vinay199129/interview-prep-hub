import type { Metadata } from "next";
import { ProfileClient } from "@/components/ProfileClient";
import { getTracks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Profile · Interview Prep Hub",
  description:
    "Personalize Interview Prep Hub and manage all locally-stored data.",
};

export default function ProfilePage() {
  const tracks = getTracks();
  return <ProfileClient tracks={tracks} />;
}
