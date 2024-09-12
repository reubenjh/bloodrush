import toast, { Toaster } from 'react-hot-toast';
import { IoCloseOutline } from 'react-icons/io5';
import { Notification } from './Notification';

export function notify({
  message,
  type,
}: {
  message: string;
  type?: 'info' | 'error';
}) {
  return toast.custom((t) => {
    return (
      <Notification
        className={t.visible ? 'animate-enter' : 'animate-leave'}
        type={type}
      >
        <span className="pr-2">{message}</span>
        <IoCloseOutline size={16} onClick={() => toast.remove(t.id)} />
      </Notification>
    );
  });
}

export const NotificationProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  );
};
