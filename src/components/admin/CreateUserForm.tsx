"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { IoCloudUploadOutline } from "react-icons/io5";
import { createUser } from "@/lib/actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/validationSchemas";
import { CloudinaryResultInfo } from "@/types/types";

const CreateUserForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState<CloudinaryResultInfo | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [state, formAction, isPending] = useActionState(createUser, {
    success: false,
    message: "",
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const handleCreateUserForm: SubmitHandler<RegisterSchema> = (data) => {
    startTransition(() => {
      formAction({ ...data, image: file?.secure_url });
    });
  };

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      toast.success(state.message);
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router, setOpen]);

  return (
    <form
      onSubmit={handleSubmit(handleCreateUserForm)}
      className="flex flex-col gap-5 w-[280px] text-black"
    >
      <h1 className="text-lg font-medium text-center">Create User</h1>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          placeholder="username"
          {...register("username")}
          ref={(el) => {
            // console.log(el);
            inputRef.current = el;
            register("username").ref(el);
          }}
        />
        {errors.username?.message && (
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          type="email"
          placeholder="email"
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          placeholder="name"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        )}
      </div>
      <div>
        <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-black focus-within:ring-1">
          <input
            className="w-full ring-0"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            {...register("password")}
          />
          <span
            className="cursor-pointer dark:text-textSoft"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <MdOutlineVisibility size={20} />
            ) : (
              <MdOutlineVisibilityOff size={20} />
            )}
          </span>
        </div>
        {errors.password?.message && (
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        )}
      </div>
      <div>
        <select
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          {...register("isAdmin")}
        >
          <option value="false">Is Admin?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {errors.isAdmin?.message && (
          <p className="text-red-500 text-sm">{errors.isAdmin.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        {file?.secure_url && (
          <Image
            src={file.secure_url}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 object-cover rounded-full mb-1 self-center"
          />
        )}
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
          onSuccess={(result, { widget }) => {
            setFile(result.info as CloudinaryResultInfo);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="flex items-center gap-2 cursor-pointer text-gray-500 text-sm"
                onClick={() => open()}
              >
                <IoCloudUploadOutline size={20} />
                <span>Upload a photo</span>
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
      <button
        className="bg-blue-500 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? <div className="spinner" /> : "Create"}
      </button>
    </form>
  );
};

export default CreateUserForm;
