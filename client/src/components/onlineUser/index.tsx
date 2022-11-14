import "../../styles/onlineuser.css"

interface onlineUserUI {
    Username: string
    Token: number
    Cookie: string
}

export const OnlineUser = (props: onlineUserUI) => (
    <tr className="table-row">
            <td className="table-item">
            {props.Username}
            </td>

            <td className="table-item">
            {props.Token}
            </td>

            <td className="table-item">
            <button className="join-request-button">Send Join Request</button>
            </td>
        </tr>
)