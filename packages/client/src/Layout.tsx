import { AppBar, Button, Container, Stack, Toolbar } from '@mui/material';
import { useSetAtom } from 'jotai';
import { Link, Outlet } from 'react-router';
import { usernameAtom, passwordAtom } from './atoms';

export function Layout() {
  const setUsername = useSetAtom(usernameAtom);
  const setPassword = useSetAtom(passwordAtom);

  return (
    <Stack sx={{ height: '100dvh', overflow: 'auto' }}>
      <AppBar position="sticky">
        <Container disableGutters>
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              ホーム
            </Button>
            <Button color="inherit" component={Link} to="/check">
              完了確認
            </Button>
            <Button color="inherit" component={Link} to="/edit">
              訂正
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                setUsername(window.prompt('username') ?? '');
                setPassword(window.prompt('password') ?? '');
              }}
            >
              ログイン
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Stack>
  );
}
