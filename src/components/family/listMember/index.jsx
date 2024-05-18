// MemberList.jsx

import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { doc, getDoc } from 'firebase/firestore';
import maleAvatar from '../../../assets/maleAvatar.jpg';
import { firestore } from '../../../firebase/firebase';

const MemberList = ({ members }) => {
    return (
        <div style={{ padding: '24px', backgroundColor: '#ffff' }}>
            <h3 style={{ marginBottom: '16px' }}>Members</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {members.map((memberId) => (
                    <Member key={memberId} memberId={memberId} />
                ))}
            </ul>
        </div>
    );
};

const Member = ({ memberId }) => {
    const [memberData, setMemberData] = useState(null);

    useEffect(() => {
        const getMemberData = async () => {
            try {
                const memberDocRef = doc(firestore, 'userData', memberId);
                const memberDoc = await getDoc(memberDocRef);
                if (memberDoc.exists()) {
                    setMemberData(memberDoc.data());
                }
            } catch (error) {
                console.error('Error fetching member data:', error);
            }
        };

        getMemberData();
    }, [memberId]);

    return memberData ? (
        <li style={{ marginBottom: '16px' }}>
            <Avatar src={memberData.photoURL || maleAvatar} size={48} style={{ marginRight: '8px' }} />
            <span>{`${memberData.firstName} ${memberData.lastName}`}</span>
        </li>
    ) : null;
};

export default MemberList;
