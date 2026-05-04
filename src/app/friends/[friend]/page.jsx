"use client";
import React from 'react';
import FriendPageComponent from '../../../components/Friend';
import { useParams } from 'next/navigation';

const FriendPage = ({params}) => {
    const {friend: path} = useParams();
    return (
        <div className="">
            <FriendPageComponent path={path} />
        </div>
    );
};

export default FriendPage;