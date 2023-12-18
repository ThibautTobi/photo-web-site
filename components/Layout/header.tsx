import Navbar from "./navbar";

export default function Header () {

    return(
        <header className="w-100% h-auto bg-rose-300 opacity-60 text-white flex flex-row justify-around font-bold text-lg p-8 rounded-b-full">
            {/* shadow-lg shadow-white */}
            {/* <Image /> icone*/}
            <h2> Agence GirlyPhoto </h2>
            <Navbar />
        </header>
    )
}