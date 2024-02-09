import {Home, People, Person, SwapHoriz} from '@mui/icons-material'
import {User} from "../../context/auth.context.ts";
import React from "react";
import {Badge} from "@mui/material";

export interface Destination {
    label: string,
    icon: React.ReactNode,
    path: string
}

export const getDestinations = (user: User): Destination[] => [
    {
        path: '/',
        label: 'Очередь',
        icon: <Home/>
    },
    {
        path: '/users_list',
        label: 'Сотрудники',
        icon: <People/>
    },
    ...user.queueUser ? [
            {
                label: 'Обмен',
                path: '/swap_requests',
                icon: <SwapHoriz/>
            }
        ]
        : [],
    {
        path: '/user_profile',
        label: 'Профиль',
        icon: user.changedPassword ? <Person/> : <Badge overlap="circular" variant="dot" color="error">
            <Person/>
        </Badge>
    }
]