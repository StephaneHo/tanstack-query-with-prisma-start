export default function Header({ children }) {
  return (
    <>
      <header id="main-header">
        <div id="header-title">
          <h1 className="text-4xl font-bold my-10">
            Locations et ventes d equipements{" "}
          </h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
