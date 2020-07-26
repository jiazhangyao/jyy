import React from 'react'
import './style.scss'

export default function Lists({ arr }) {
    return (
        <ul className="lists">
            {
                arr.map(ele => {
                    return (
                        <li>
                            {ele}
                        </li>
                    )
                })
            }
        </ul>
    )
}

