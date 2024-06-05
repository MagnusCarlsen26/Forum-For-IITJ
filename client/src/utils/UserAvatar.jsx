import formattedDateTime from './formattedDateTime'
import { Link } from 'react-router-dom'

export default function UserAvatar({pfp,username,time}) {
    return (
            <>
            <img
            src={pfp}
            alt="User Avatar"
            className="rounded-circle m-2"
            style={{ width: '32px', height: '32px' }}
            />
            {
                time ?             <Link to="/profile" className='text-white-50' style={{ textDecoration: 'none' }}>
                {username} | {formattedDateTime(time)}
            </Link>:""
            }

        </>
    )
}