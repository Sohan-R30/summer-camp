const Button = ({children}) => {
    return (

        <button className=" bg-[#38ecd4] font-bold text-slate-600 py-2 px-3  hover:bg-[#7f9a9f] hover:text-white rounded-lg">{children}</button>

    );
};

export default Button;