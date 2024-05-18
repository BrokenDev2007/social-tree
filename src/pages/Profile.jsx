import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Avatar, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, HomeOutlined, TeamOutlined, DeleteOutlined } from '@ant-design/icons';
import { doc, getDoc, updateDoc, collection, deleteDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';
import userAvatar from '../assets/maleAvatar.jpg';

const { Sider, Content } = Layout;

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [familyName, setFamilyName] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                // User not signed in, redirect to login page
                window.location.href = '/login';
            } else {
                fetchUserData(user.uid);
            }
        });

        return unsubscribe;
    }, []);

    const fetchUserData = async (userId) => {
        try {
            // Get user data
            const userDataDocRef = doc(firestore, 'userData', userId);
            const userDataDocSnapshot = await getDoc(userDataDocRef);
            if (userDataDocSnapshot.exists()) {
                const userData = userDataDocSnapshot.data();
                setUserData(userData);

                // Get family name
                const familyDocRef = doc(firestore, 'families', userData.family);
                const familyDocSnapshot = await getDoc(familyDocRef);
                if (familyDocSnapshot.exists()) {
                    setFamilyName(familyDocSnapshot.data().name);
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                // Sign-out successful.
                window.location.href = '/';
                console.log('Signed out successfully');
            })
            .catch((error) => {
                // An error happened.
                console.error('Error signing out:', error);
            });
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div className="logo" style={{ height: 32, margin: '16px' }}>
                    <h1 style={{ color: 'white' }}>Family Tree</h1>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline">
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
                <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <Button
                        type="primary"
                        style={{ width: '100%' }}
                        icon={<DeleteOutlined />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '16px' }}>
                    <Card style={{ width: 400, margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                            <Avatar size={100} src={userAvatar} />
                            <h2>{`${userData?.firstName} ${userData?.lastName}`}</h2>
                        </div>
                        <p><strong>Email:</strong> {userData?.email}</p>
                        <p><strong>Family:</strong> {familyName}</p>
            
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;
