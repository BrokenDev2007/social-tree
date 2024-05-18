import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
import JoinFamily from '../components/joinFamily';

const Invite = () => {
    const { inviteString } = useParams();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!inviteString) {
            // If there is no invite string, do nothing
            return;
        }
        // Show the modal
        setVisible(true);
    }, [inviteString]);

    const handleCancel = () => {
        // Hide the modal
        setVisible(false);
    };

    return (
        <Modal
            title="Join Family"
            visible={visible}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose
        >
            <JoinFamily preFilledCode={inviteString} />
        </Modal>
    );
};

export default Invite;
