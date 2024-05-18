import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
import { firestore } from '../../firebase/firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { TeamOutlined } from '@ant-design/icons'; // Import the icon from Ant Design

const JoinFamily = ({ userData }) => {
    const [visible, setVisible] = useState(false);
    const [familyId, setFamilyId] = useState('');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        try {
            if (!familyId) {
                console.error('Family ID is required');
                return;
            }

            const familyDocRef = doc(firestore, 'families', familyId);
            const familyDocSnapshot = await getDoc(familyDocRef);
            if (!familyDocSnapshot.exists()) {
                message.error('Family ID is incorrect');
                return;
            }

            const userDocRef = doc(firestore, 'userData', userData.uid);
            await updateDoc(userDocRef, {
                family: familyId,
                familyCreated: true,
            });

            const membersCollectionRef = doc(firestore, 'families', familyId, 'members', userData.uid);
            await setDoc(membersCollectionRef, { isAdmin: false });

            console.log('Joined family successfully');

            window.location.reload();
        } catch (error) {
            console.error('Error joining family:', error);
        } finally {
            setVisible(false);
            setFamilyId('');
        }
    };

    const handleCancel = () => {
        setVisible(false);
        setFamilyId('');
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={showModal}
                size="large"
                icon={<TeamOutlined />} // Use the TeamOutlined icon from Ant Design
                style={{ width: '100%' }} // Set the button width to 100%
            >
                Join Family
            </Button>
            <Modal
                title="Join Family"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Join"
            >
                <p>Please enter the unique family ID</p>
                <Input
                    value={familyId}
                    onChange={(e) => setFamilyId(e.target.value)}
                    placeholder="Family ID"
                />
            </Modal>
        </div>
    );
};

export default JoinFamily;
