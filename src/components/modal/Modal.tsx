"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    // errors in mobile browsers if not checked
    if(!dialogRef.current?.open) dialogRef.current?.showModal();
  }, []);

  const overlayClick: MouseEventHandler = useCallback(
    (event) => {
      const element = wrapper?.current;
      if(!element || element.contains(event.target as Node)) return;
      onDismiss()
    },
    [onDismiss, wrapper]
  );
  
  return (
    <dialog onClick={overlayClick} ref={dialogRef} onClose={onDismiss}
    className={`backdrop:bg-black backdrop:bg-opacity-50 backdrop:backdrop-blur-sm 
    p-0 w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/5 2xl:w-2/6`}
    >
      <div ref={wrapper} >{children}</div>
    </dialog>
  );
};

export default Modal;