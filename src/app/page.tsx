import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl my-10 md:my-25 px-5 md:px-3 ">
      <div className="flex justify-center w-full mb-7">
        <Image
          src={"/icon/logo_bigs_blue.png"}
          width={250}
          height={250}
          alt="빅스페이먼츠로고"
        />
      </div>
      <LoginForm />
      <div className="text-blue-400 text-center mt-5">
        회원이 아니신가요?
        <Link href="/signup" className="text-gray-500 hover:underline">
          가입하기
        </Link>
      </div>
    </main>
  );
}
