import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import MemberList from '../components/family/listMember';
import Chatbox from '../components/family/chatBox';
import LeaveButton from '../components/family/leaveButton/index';

const { Sider, Content } = Layout;

const YourFamily = () => {
    const [userData, setUserData] = useState(null);
    const [familyName, setFamilyName] = useState('');
    const [members, setMembers] = useState([]);
    const [familyId, setFamilyId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const uid = user.uid;
                    const sessionData = doc(firestore, 'userData', uid);
                    const userDoc = await getDoc(sessionData);
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                        if (!userDoc.data().familyCreated) {
                            navigate('/home');
                            return;
                        }
                        const fetchedFamilyId = userDoc.data().family;
                        setFamilyId(fetchedFamilyId); // Set the familyId from userData
                        const familyDocRef = doc(firestore, 'families', fetchedFamilyId);
                        const familyDoc = await getDoc(familyDocRef);
                        if (familyDoc.exists()) {
                            setFamilyName(familyDoc.data().name);
                            const membersCollectionRef = collection(familyDocRef, 'members');
                            const membersSnapshot = await getDocs(membersCollectionRef);
                            const memberIds = [];
                            membersSnapshot.forEach((doc) => {
                                memberIds.push(doc.id);
                            });
                            setMembers(memberIds);
                        }
                        console.log('UserData', userDoc.data());
                        console.log('uid', uid);
                    } else {
                        console.log('User data not found');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                // If user not signed in, refer back to login!
                navigate('/');
            }
        });

        return unsubscribe;
    }, [navigate]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div className="logo" style={{ height: 32, margin: '16px' }}>
                    <h1 style={{ color: 'white' }}>Family Tree</h1>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <NavLink to="/home">Home</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                        <NavLink to="/your-family">Your Family</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                        <NavLink to="/profile">Profile</NavLink>
                    </Menu.Item>
                </Menu>
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '100%' }}>
                    {familyId && <LeaveButton familyId={familyId} />} {/* Add LeaveButton component */}
                </div>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        <h2>{familyName}</h2>
                        {familyId && <Chatbox familyId={familyId} userId={userData.uid} />}
                    </div>
                </Content>
            </Layout>
            <Sider width={200} theme="light">
                {members && <MemberList members={members} />}
            </Sider>
        </Layout>
    );
};

export default YourFamily;
