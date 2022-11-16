import "../../styles/onlineuser.css"

interface onlineUserUI {
    userName: string
    cookie: string
}

export const OnlineUser = (props: onlineUserUI) => (
    <tr className="table-row">
            <td className="table-item">
            {props.userName}
            </td>

            <td className="table-item">
            <button className="join-request-button">Send Join Request</button>
            </td>
        </tr>
)