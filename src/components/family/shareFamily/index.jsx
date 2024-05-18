import React from 'react';
import { Card, Typography, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ShareFamily = ({ familyId }) => {
    const copyFamilyId = () => {
        // Copy family ID to clipboard
        navigator.clipboard.writeText(familyId);
        message.success('Family ID copied to clipboard');
    };

    return (
        <Card title="Share Family">
            <Text strong>Your Family ID:  </Text>
            <Text copyable>{familyId}</Text>
        </Card>
    );
};

export default ShareFamily;
