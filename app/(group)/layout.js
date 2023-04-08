import "../../styles/reboot.css";
import GithubCorner from "../../components/github-corner";

export const metadata = {
  title: "NextGram",
  description:
    "A sample Next.js app showing dynamic routing with modals as a route.",
  metadataBase: new URL("https://nextgram.vercel.app"),
};

export default function Layout(props) {
  return (
    <html>
      <body>
        <GithubCorner />
        {props.children}
        {props.modal}
      </body>
    </html>
  );
}
