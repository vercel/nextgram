import "../styles/reboot.css";

export const metadata = {
  title: "NextGram",
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
