"use client";
import React from 'react';
import FriendPageComponent from '../../../components/Friend';
import { useParams, usePathname } from 'next/navigation';

const FriendPage = ({params}) => {
    console.log(params);
    const {friend: path} = useParams();
    console.log(path);
    // const path = usePathname();
    return (
        <div className="">
            <FriendPageComponent path={path} />
        </div>
    );
};

export default FriendPage;