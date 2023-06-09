import moment from 'moment';


const HistoryTableRow = ({ SingleClass, index }) => {
    const { className, classPhoto, instructorEmail, price } = SingleClass.storedClass || {}
    
    const date = new Date(SingleClass?.date)
    const actualDate = moment(date).format('llll');
    return (
        <>
        <tr className="text-center divide-x divide-slate-300 divide-y divide-y-reverse divide-x-reverse shadow-sm">
            <td>{index + 1}</td>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-14">
                        <img src={classPhoto} alt="user picture" />
                    </div>
                </div>
            </td>
            <td>{className}</td>
            <td>{instructorEmail}</td>
            <td>{price}</td>
            <td>{SingleClass?.transactionId}</td>
            <td>{actualDate && actualDate}</td>
        
        </tr>
        
    </>
    );
};

export default HistoryTableRow;