import Players from "../components/multiplayer/Players"

// Need session id

export default function Page() {

    return (
        <main className="w-full flex items-center justify-center h-[400px] test flex-col">
            <h2 className="">Multiplayer Test</h2>
            <Players />
        </main>
    )
}