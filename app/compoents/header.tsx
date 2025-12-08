export default function Header() {
    return (
        <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
                <div className="w-2/3">
                    <h1 className="text-xl sm:text-9xl md:text-[140px] font-black tracking-tight">
                        <span className="block text-accent">DONNER VIE</span>
                        <div className="flex items-center gap-8">
                            <div className="text-white text-lg font-normal font-body">
                                <p>Bryan Parisot</p>
                                <p>Web Developer</p>
                            </div>
                            <span className="block text-accent">A VOTRE </span>
                        </div>
                        <span className="block text-accent">ENTREPRISE</span>
                        <span className="block text-gray-100">AVEC IMPACT</span>
                    </h1>
                </div>
                <div className="bg-right w-1/3 h-[600px] overflow-hidden relative z-10">
                    <div className="bg-[url('/profil_bryan.jpg')] bg-cover absolute inset-0 bg-black opacity-50"></div>
                </div>
            </div>
        </header>
    );
}
