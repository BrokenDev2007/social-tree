import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { firestore } from '../../firebase/firebase';
import { setDoc, doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { PlusOutlined } from '@ant-design/icons';

const CreateFamily = ({ userData }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleOpen = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            // Ensure userData is available and contains the uid
            if (!userData || !userData.uid) {
                console.error('User data is invalid');
                return;
            }

            // Construct the document reference for the family
            const familyDocRef = doc(firestore, 'families', userData.uid);

            // Set the document data for the family
            await setDoc(familyDocRef, {
                name: values.familyName,
                createdBy: userData.uid,
            });

            // Construct the document reference for the members
            const membersCollectionRef = collection(familyDocRef, 'members');

            // Add the user's UID to the members collection and set isAdmin to true for the user who created the family
            await setDoc(doc(membersCollectionRef, userData.uid), {
                isAdmin: true,
            });

            // Update the userData collection to set familyCreated to true
            const userDocRef = doc(firestore, 'userData', userData.uid);
            await updateDoc(userDocRef, {
                familyCreated: true,
                family: userData.uid,
            });

            console.log('Family created successfully');

            // Display success message
            message.success('Family created successfully');

            // Reload the page for updating the components.
            window.location.reload();
        } catch (error) {
            console.error('Error creating family: ', error);
        }
    };

    return (
        <div style={{ marginBottom: '16px' }}>
            <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={handleOpen}
                style={{ width: '100%', color: '#1890ff', border: '1px solid #1890ff', backgroundColor: '#fff' }}
            >
                Create Family
            </Button>
            <Modal
                title="Create Family"
                visible={visible}
                onCancel={handleClose}
                footer={[
                    <Button key="back" onClick={handleClose}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Create
                    </Button>,
                ]}
            >
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item
                        name="familyName"
                        label="Family Name"
                        rules={[{ required: true, message: 'Please enter the family name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CreateFamily;
