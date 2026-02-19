import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { githubLogin, googleLogin } from "@/lib/actions/authActions";
import SubmitButton from "@/components/shared/SubmitButton";

const LoginPage = () => {
  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="border border-borderColor rounded-lg p-5 w-80">
        <form action={googleLogin}>
          <SubmitButton
            text="Signin with Google"
            icon={<FcGoogle size={20} />}
            className="bg-slate-100 dark:bg-slate-200 text-black rounded-md p-3 w-full flex items-center justify-center gap-2 cursor-pointer h-12 enabled:hover:bg-slate-200 enabled:dark:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </form>
        <form action={githubLogin} className="mt-3">
          <SubmitButton
            text="Signin with Github"
            icon={<FaGithub size={20} />}
            className="bg-slate-100 dark:bg-slate-200 text-black rounded-md p-3 w-full flex items-center justify-center gap-2 cursor-pointer h-12 enabled:hover:bg-slate-200 enabled:dark:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
