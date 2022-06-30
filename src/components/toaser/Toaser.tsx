import { toast, ToastPromiseParams } from 'react-toastify';

const position = toast.POSITION.TOP_CENTER;

const toastError = (error: any) =>
    toast.error(error, {
        autoClose: false,
        closeButton: true,
        position,
    });

const ToastError = (error: any, stringCallBack?: (s: string) => string) => {
    const errorMessage = (message: string) =>
        !stringCallBack
            ? toastError(message)
            : toastError(stringCallBack(message));
    if (error instanceof Error) {
        return errorMessage(error.message);
    }
    if (typeof error === 'string') {
        return errorMessage(error);
    }
    return errorMessage(JSON.stringify(error));
};

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
