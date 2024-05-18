import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Layout, Menu, Button } from 'antd';
import {
    HomeOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import CreateFamily from '../components/createFamily';
import JoinFamily from '../components/joinFamily';
import ViewFamily from '../components/viewFamily';

const { Sider, Content } = Layout;

const Home = () => {
    const [userData, setUserData] = useState(null);
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

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate('/');
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
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        <h2>Home</h2>
                        {userData && (
                            <div>
                                <p>Welcome, {userData.firstName} {userData.lastName}!</p>
                                {/* Conditionally render the CreateFamily component */}
                                {!userData.familyCreated && <CreateFamily userData={userData} />}
                                {/* Conditionally render the JoinFamily component */}
                                {!userData.familyCreated && <JoinFamily userData={userData} />}
                                {/* Conditionally render the ViewFamily component */}
                                {userData.familyCreated && <ViewFamily userData={userData} />}
                            </div>
                        )}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Home;
