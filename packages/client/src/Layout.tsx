import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { Link, Outlet } from 'react-router';

export function Layout() {
  return (
    <>
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
      <Container sx={{ marginY: 2 }}>
        <Outlet />
      </Container>
    </>
  );
}
