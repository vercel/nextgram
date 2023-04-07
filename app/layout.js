import "../styles/reboot.css";

export const metadata = {
  title: "NextGram",
  description: "A sample Next.js app showing dynamic routing with modals as a route.",
  metadataBase: new URL("https://nextgram.vercel.app"),
};

export default function Layout(props) {
  return (
    <html>
      <body>
        {props.children}
        {props.modal}
      </body>
    </html>
  );
}
