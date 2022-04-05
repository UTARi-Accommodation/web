import * as React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

const OutsideClickHandlerContainer = ({
    children,
    buttonRef,
    setFalse: setShowFalse,
}: Readonly<{
    children: React.ReactNode;
    buttonRef?: React.RefObject<HTMLDivElement>;
    setFalse: (show: false) => void;
}>) => (
    <OutsideClickHandler
        display="contents"
        onOutsideClick={(event) => {
            if (
                !buttonRef ||
                !(
                    buttonRef.current &&
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    buttonRef.current.contains(event.target)
                )
            ) {
                setShowFalse(false);
            }
        }}
    >
        {children}
    </OutsideClickHandler>
);

export default OutsideClickHandlerContainer;
