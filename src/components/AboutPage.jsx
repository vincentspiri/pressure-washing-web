export default function AboutPage() {
    return (
        <div className=" mx-4 text-center lg:mx-40">
            <div className="my-12">
                <p className="text-white font-iosevka font-semibold text-[32px]">
                    We are a locally owned and operated business that provides <span className="gradient-text">high-quality</span> pressure washing services for
                    residential and commercial properties. We are committed to delivering <span className="gradient-text">exceptional</span> customer setvice and
                    ensuring your complete satisfaction with our work.
                </p>
            </div>
            <div className="my-12 flex flex-col">
                <p className="text-white font-iosevka font-semibold text-[32px] my-8 bg-clip-text mx-auto">
                    We offer a variety of pressure washing services, including:
                </p>
                <ul className="text-white list-disc list-inside align-middle font-iosevka text-xl lg:text-3xl text-left 
                                lg:w-4/5 columns-2 lg:mx-auto lg:pl-24">
                    <li className="mb-4">Exterior House Washing</li>
                    <li className="my-4">Roof Cleaning</li>
                    <li className="my-4">Concrete Cleaning</li>
                    <li className="my-4">Deck and Patio Cleaning</li>
                    <li className="my-4">Fense Cleaning</li>
                    <li className="my-4">Gutter Cleaning</li>
                </ul>
            </div>
        </div>
    )
}