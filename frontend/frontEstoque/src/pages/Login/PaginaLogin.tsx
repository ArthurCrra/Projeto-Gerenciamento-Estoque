import * as React from 'react';
import { CssVarsProvider, extendTheme, useColorScheme} from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import type { IconButtonProps } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';

import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext'


interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
}


function ColorSchemeToggle(props: IconButtonProps) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    return (
        <IconButton
            aria-label="toggle light/dark mode"
            size="sm"
            variant="outlined"
            disabled={!mounted}
            onClick={(event) => {
                setMode(mode === 'light' ? 'dark' : 'light');
                onClick?.(event);
            }}
            {...other}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}
const customTheme = extendTheme({ defaultColorScheme: 'dark' });


export default function PaginaDeLogin() {

    const navigate = useNavigate();
    const [erro, setErro] = useState('');
    const auth = useAuth();

    const [user, setUser] = useState<any>(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (auth?.user) {
            navigate('/tabelaItens');
        }
    }, [auth?.user]);

    return (

        <CssVarsProvider theme={customTheme} disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s', // set to `none` to disable transition
                    },
                }}
            />

            <Box
                sx={(theme) => ({
                    width: { xs: '100%', md: '50vw' },
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(255 255 255 / 0.2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'rgba(19 19 24 / 0.4)',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
                    >
                        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                            <IconButton variant="soft" color="neutral" size="lg">
                                <BadgeRoundedIcon />
                            </IconButton>
                            <Typography level="title-lg">Gerenciador de estoque</Typography>
                        </Box>
                        <ColorSchemeToggle />
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .MuiFormLabel-asterisk`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <Stack sx={{ gap: 4, mb: 2 }}>
                            <Stack sx={{ gap: 1 }}>
                                <Typography component="h1" level="h3">
                                    Bem vindo!
                                </Typography>
                                <Typography level="body-sm">
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack sx={{ gap: 4, mt: 2 }}>
                            <form
                                onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                                    event.preventDefault();
                                    const formElements = event.currentTarget.elements as typeof event.currentTarget.elements & {
                                        email: HTMLInputElement;
                                        senha: HTMLInputElement;
                                    };

                                    const email = formElements.email.value;
                                    const senha = formElements.senha.value;

                                    try {
                                        setErro('');
                                        await auth?.login(email, senha); // login via contexto
                                        // Redirecionamento já ocorre no useEffect do LoginPage
                                    } catch (err) {
                                        setErro('E-mail ou senha inválidos');
                                    }
                                }}
                            >
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Senha</FormLabel>
                                    <Input type="password" name="senha" />
                                </FormControl>
                                <Stack sx={{ gap: 4, mt: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                    </Box>
                                    {erro && <Typography color="danger">{erro}</Typography>}
                                    <Button type="submit" fullWidth>
                                        Entrar
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" sx={{ textAlign: 'center' }}>
                            © Gerenciador de Estoque {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: { xs: 0, md: '50vw' },
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                    },
                })}
            />
        </CssVarsProvider>
    );
}