import React, { useEffect, useState } from 'react';
import { Layout, Input, Button, List, Avatar } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { collection, addDoc, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import moment from 'moment';
import userAvatar from '../../../assets/maleAvatar.jpg';

const { Content } = Layout;

const Chatbox = ({ familyId, userId }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [senderInfo, setSenderInfo] = useState({});

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messagesQuery = query(collection(firestore, 'messages'), 
                    where('familyId', '==', familyId),
                    orderBy('createdAt', 'asc')
                );
                const messagesSnapshot = await getDocs(messagesQuery);
                const fetchedMessages = [];
                messagesSnapshot.forEach((doc) => {
                    const messageData = doc.data();
                    fetchedMessages.push(messageData);
                });
                setMessages(fetchedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [familyId]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (message.trim() !== '') {
            try {
                const messageData = {
                    familyId: familyId,
                    data: message,
                    createdBy: userId,
                    createdAt: new Date().toISOString()
                };

                const docRef = await addDoc(collection(firestore, 'messages'), messageData);
                messageData.messageId = docRef.id; // Set messageId in messageData

                setMessages([...messages, messageData]);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const renderSenderInfo = async (createdBy) => {
        try {
            // Fetch user data from Firestore based on createdBy user ID
            const userDocRef = doc(firestore, 'userData', createdBy);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                return userData;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching sender info:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchSenderInfo = async () => {
            const senderInfoList = [];
            for (const message of messages) {
                const senderInfo = await renderSenderInfo(message.createdBy);
                senderInfoList.push(senderInfo);
            }
            setSenderInfo(senderInfoList);
        };
        fetchSenderInfo();
    }, [messages]);

    return (
        <Content style={{ padding: '24px', minHeight: 360, background: '#fff', color: '#000' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '12px', marginBottom: '24px', maxHeight: '300px', overflowY: 'auto' }}>
                <List
                    dataSource={messages}
                    renderItem={(item, index) => (
                        <List.Item style={{ textAlign: item.createdBy === userId ? 'right' : 'left' }}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.createdBy === userId ? userAvatar : senderInfo[index]?.photoURL || userAvatar} />}
                                title={<span>{item.createdBy === userId ? 'You' : senderInfo[index]?.firstName + ' ' + senderInfo[index]?.lastName || 'Unknown User'}</span>}
                                description={<div>
                                    <div style={{ color: item.createdBy === userId ? '#1890ff' : '#000' }}>{item.data}</div>
                                    <div style={{ fontSize: '12px' }}>{moment(item.createdAt).fromNow()}</div>
                                </div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div style={{ display: 'flex' }}>
                <Input value={message} onChange={handleMessageChange} placeholder="Type a message..." style={{ flex: '1', marginRight: '12px', background: '#f0f2f5', color: '#000' }} />
                <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage}>
                    Send
                </Button>
            </div>
        </Content>
    );
};

export default Chatbox;
