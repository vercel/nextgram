import "../styles/reboot.css";

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
