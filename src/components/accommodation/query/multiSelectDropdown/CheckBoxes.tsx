import * as React from 'react';
import styled from 'styled-components';

const CheckBoxes = <T extends string | number>({
    selectedValues,
    values,
    onClick,
}: Readonly<{
    selectedValues: ReadonlyArray<T>;
    values: ReadonlyArray<T>;
    onClick: (selectedValues: ReadonlyArray<T>, value: T) => void;
}>) => (
    <>
        {values.map((value) => (
            <CheckBoxContainer
                key={value}
                onClick={() => {
                    onClick(selectedValues, value);
                }}
            >
                {selectedValues.includes(value) ? (
                    <TickedCheckBox>
                        <Icon viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                        </Icon>
                    </TickedCheckBox>
                ) : (
                    <EmptyCheckBox />
                )}
                {value}
            </CheckBoxContainer>
        ))}
    </>
);

const CheckBox = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 3px;
    cursor: pointer;
    margin: 0 8px 0 0;
`;

const EmptyCheckBox = styled(CheckBox)`
    border: 1px solid ${({ theme }) => theme.border};
    &:hover {
        border: 1px solid ${({ theme }) => theme.secondaryColor};
    }
`;

const TickedCheckBox = styled(CheckBox)`
    background: black;
    border: 1px solid ${({ theme }) => theme.secondaryColor};
`;

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`;

const CheckBoxContainer = styled.div`
    cursor: pointer;
    &:hover ${CheckBox} {
        outline: 1px solid black;
    }
    display: flex;
    align-items: center;
    padding: 8px 0;
`;

export default CheckBoxes;
