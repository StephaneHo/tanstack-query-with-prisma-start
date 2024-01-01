export default function Header({ children }) {
  return (
    <>
      <header id="main-header">
        <div id="header-title">
          <h1>MAXOL</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
