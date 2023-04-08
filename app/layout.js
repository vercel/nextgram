import "./global.css";

export const metadata = {
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
