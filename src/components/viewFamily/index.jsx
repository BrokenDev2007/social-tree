import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const { Title } = Typography;

const ViewFamily = ({ userData }) => {
    const navigate = useNavigate();
    const [familyName, setFamilyName] = useState('');

    useEffect(() => {
        const fetchFamilyName = async () => {
            try {
                // Ensure userData is available and contains the family ID
                if (!userData || !userData.family) {
                    console.error('User data is invalid or family ID not found');
                    return;
                }

                // Retrieve the family name from Firestore using the family ID
                const familyDocRef = doc(firestore, 'families', userData.family);
                const familyDocSnap = await getDoc(familyDocRef);

                if (familyDocSnap.exists()) {
                    setFamilyName(familyDocSnap.data().name);
                } else {
                    console.error('Family document not found');
                }
            } catch (error) {
                console.error('Error fetching family name: ', error);
            }
        };

        fetchFamilyName();
    }, [userData]);

    const handleViewFamily = () => {
        navigate('/your-family');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <Title level={4}>{familyName}</Title>
            <Button type="primary" onClick={handleViewFamily}>View Family</Button>
        </div>
    );
};

export default ViewFamily;
