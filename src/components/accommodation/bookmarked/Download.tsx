import * as React from 'react';
import { saveAs } from 'file-saver';
import styled from 'styled-components';
import { Button } from '../dropdown/Dropdown';
import { AccommodationType } from 'utari-common';
import { ToastError } from '../../toaser/Toaser';

type DownloadButtonProps = Readonly<{
    isEmpty: boolean;
}>;

const Download = ({
    isEmpty,
    stringifiedInfo,
    type,
}: Readonly<{
    stringifiedInfo: () => Promise<string | undefined>;
    type: AccommodationType;
}> &
    DownloadButtonProps) => (
    <DownloadButton
        isEmpty={isEmpty}
        onClick={() => {
            if (!isEmpty) {
                stringifiedInfo()
                    .then((info) => {
                        if (!info) {
                            return;
                        }
                        const blob = new Blob([info], {
                            type: 'text/plain;charset=utf-8',
                        });
                        saveAs(blob, `${type}.txt`);
                    })
                    .catch(ToastError);
            }
        }}
    >
        Download
    </DownloadButton>
);

const DownloadButton = styled(Button)`
    cursor: ${({ isEmpty }: DownloadButtonProps) =>
        isEmpty ? 'not-allowed' : 'pointer'} !important;
`;

export default Download;
