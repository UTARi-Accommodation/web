import * as React from 'react';
import styled from 'styled-components';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import { AppContext } from '../../App';
import Switch from 'react-switch';

const ToggleTheme = () => {
    const { isDark, setIsDark } = React.useContext(AppContext);

    const ContainerMoonIcon = ({
        isHandler,
    }: Readonly<{
        isHandler: boolean;
    }>) => {
        const Icon = isHandler ? HandlerMoonIcon : MoonIcon;
        return (
            <Container>
                <Icon />
            </Container>
        );
    };

    const ContainerSunIcon = ({
        isHandler,
    }: Readonly<{
        isHandler: boolean;
    }>) => {
        const Icon = isHandler ? HandlerSunIcon : SunIcon;
        return (
            <Container>
                <Icon />
            </Container>
        );
    };

    return (
        <Toggle
            onChange={setIsDark}
            checked={!isDark}
            onColor="#888888"
            onHandleColor="#FEFEFE"
            checkedHandleIcon={<ContainerSunIcon isHandler={true} />}
            checkedIcon={<ContainerMoonIcon isHandler={false} />}
            uncheckedHandleIcon={<ContainerMoonIcon isHandler={true} />}
            uncheckedIcon={<ContainerSunIcon isHandler={false} />}
        />
    );
};

const MoonIcon = styled(MdOutlineNightlight)`
    color: ${({ theme }) => theme.primaryColor};
`;

const HandlerMoonIcon = styled(MdOutlineNightlight)`
    color: ${({ theme }) => theme.darkThemeToggle};
`;

const SunIcon = styled(MdOutlineLightMode)`
    color: ${({ theme }) => theme.darkThemeToggle};
`;

const HandlerSunIcon = styled(MdOutlineLightMode)`
    color: ${({ theme }) => theme.emptyAuthAndVisitCountIcon};
`;

const Toggle = styled(Switch)`
    margin: 0 8px;
`;

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`;

export default ToggleTheme;
