import "./Footer.css"; // Import CSS

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} FullStackApp. All Rights Reserved.</p>
    </footer>
  );
}

