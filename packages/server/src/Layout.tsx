import type { PropsWithChildren } from 'hono/jsx';

export function Layout(props: PropsWithChildren) {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Exercise Progress Tracker</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
}
