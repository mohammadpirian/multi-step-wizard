import _STRINGS from "@/utils/LocalStrings";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <Link href={"/register/step-1"} className="link-outline">
        {_STRINGS.REGISTER}
      </Link>
    </main>
  );
}
