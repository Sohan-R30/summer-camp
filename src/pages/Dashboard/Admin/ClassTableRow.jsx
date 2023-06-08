

const ClassTableRow = ({SingleClass,index}) => {
    const {availableSeats,className,classPhoto,instructorEmail,instructorName,price,status} = SingleClass.storedClass    || {}
    return (
        <tr className="text-center divide-x divide-slate-300 divide-y divide-y-reverse divide-x-reverse shadow-sm">
            <td>{index + 1}</td>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-14">
                        <img src={classPhoto} alt="user picture" />
                    </div>
                </div>
            </td>
            <td>{instructorName}</td>
            <td>{instructorEmail}</td>
            <td>{className}</td>
            <td>{availableSeats}</td>
            <td>{price}</td>
            <td>{status}</td>
            <th>
                <button
                 className={`${"bg-[#83e0f5] font-bold   hover:bg-[#7f9a9f] hover:text-white "}  py-2 px-3 rounded-lg` }
                 >Aprroved</button>
            </th>
            <th>
                <button  
                className={`bg-[#83e0f5] font-bold  hover:bg-[#7f9a9f] hover:text-white"}  py-2 px-3 rounded-lg`}
                >Deny</button>
            </th>
            <th>
                <button  
                className={`bg-[#83e0f5] font-bold  hover:bg-[#7f9a9f] hover:text-white"}  py-2 px-3 rounded-lg`}
                >Send Feedback</button>
            </th>
        </tr>
    );
};

export default ClassTableRow;