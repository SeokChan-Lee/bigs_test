import SignupForm from "@/components/SignupForm";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-3xl my-10 md:my-25 px-5 md:px-3 ">
      <div className="flex justify-center w-full mb-7">
        <Link href="/">
          <Image
            src={"/icon/logo_bigs_blue.png"}
            width={250}
            height={250}
            alt="빅스페이먼츠로고"
          />
        </Link>
      </div>
      <SignupForm />
    </main>
  );
}
