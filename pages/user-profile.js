import React from 'react';

export default function UserProfilePage(props) {
    return (
        <div>{props.username}</div>
    );
}

export async function getServerSideProps(context) {
    const { params, req, res } = context;
    console.log('Server Side Code')
    return {
        props: {
            username: 'Max'
        }
    }
}