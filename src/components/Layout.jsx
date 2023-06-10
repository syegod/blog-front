import Header from "./Header";

const Layout = (props) => {
    const { children } = props
    return (
        <div className="min-h-screen w-full flex flex-col bg-slate-200">
            <Header></Header>
            <main className="md:px-20 xl:px-52 2xl:px-[40ch] mb-10 mt-14">{children}</main>
        </div>
    );
}

export default Layout;
