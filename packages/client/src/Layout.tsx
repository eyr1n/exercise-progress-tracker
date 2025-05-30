import { AppBar, Button, Container, Stack, Toolbar } from '@mui/material';
import { Link, Outlet } from 'react-router';

export function Layout() {
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
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Stack>
  );
}
