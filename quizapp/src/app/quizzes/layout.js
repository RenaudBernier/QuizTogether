export default function Layout({children}) {
    return (
        <main className="flex justify-center items-center flex-col min-h-screen pb-6 mx-auto">
            {children}
        </main>
    );
}