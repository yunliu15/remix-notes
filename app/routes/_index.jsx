import { Link } from "@remix-run/react";

import homestyle from '~/styles/home.css';

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links = () => [
  { rel: "stylesheet", href: homestyle }
];

export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of your notes</h1>
      <p>Try out early beta and nver loose track of your notes again!</p>
      <p id="cta">
        <Link to='/notes'>Try Now!</Link>
      </p>
    </main>
  );
}

