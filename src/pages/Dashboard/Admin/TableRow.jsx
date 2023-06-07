
const TableRow = () => {
    return (
        <tr>
            <td>index 1</td>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src="/tailwind-css-component-profile-2@56w.png" alt="user picture" />
                    </div>
                </div>
            </td>
            <td>shohan name</td>
            <td>sohan@gmail.com</td>
            <td>Address</td>
            <th>
                <button className="btn btn-ghost btn-xs">Make Instructor</button>
            </th>
            <th>
                <button className="btn btn-ghost btn-xs">Make Admin</button>
            </th>
        </tr>
    );
};

export default TableRow;