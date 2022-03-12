import { toast, ToastPromiseParams } from 'react-toastify';

const position = toast.POSITION.TOP_CENTER;

const ToastError = (error: any) =>
    toast.error(error, {
        autoClose: false,
        closeButton: true,
        position,
    });

const ToastInfo = (info: any) =>
    toast.info(info, {
        closeButton: true,
        position,
    });

const ToastPromise = <T extends Object>({
    promise,
    pending,
    success,
    error,
}: Readonly<{
    pending: ToastPromiseParams['pending'];
    success: ToastPromiseParams['success'];
    error: ToastPromiseParams['error'];
    promise: Promise<T>;
}>) =>
    toast.promise(promise, {
        pending,
        success,
        error,
    });

export { ToastError, ToastInfo, ToastPromise };
