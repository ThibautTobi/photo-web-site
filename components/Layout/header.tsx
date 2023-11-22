import Navbar from "./navbar";

export default function Header () {

    return(
        <header className="w-100% h-auto bg-rose-300 text-white flex flex-row justify-around font-bold text-lg p-6">
            {/* <Image /> */}
            <h2> header </h2>
            <Navbar />
        </header>
    )
}