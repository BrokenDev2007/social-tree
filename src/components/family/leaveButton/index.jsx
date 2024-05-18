import React, { useState } from 'react';
import { Button } from 'antd';
import { doc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import { auth } from '../../../firebase/firebase';
import { DeleteOutlined } from '@ant-design/icons';

const LeaveButton = ({ familyId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLeaveFamily = async () => {
        setIsLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) {
                // User not signed in, do nothing
                return;
            }

            // Update userData document
            const userDataDocRef = doc(firestore, 'userData', user.uid);
            await updateDoc(userDataDocRef, {
                family: null,
                familyCreated: false
            });

            // Delete user from members collection in the family document
            const familyDocRef = doc(firestore, 'families', familyId);
            const memberDocRef = doc(collection(familyDocRef, 'members'), user.uid);
            await deleteDoc(memberDocRef);

            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error leaving family:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            type="primary"
            danger
            onClick={handleLeaveFamily}
            loading={isLoading}
            icon={<DeleteOutlined />}
            size="large"
            style={{ width: '80%' }}
        >
            Leave Family
        </Button>
    );
};

export default LeaveButton;
