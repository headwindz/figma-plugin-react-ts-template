import React, { useState, useCallback } from 'react';
import { Typography, Button, InputNumber, Space } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';
import { CLOSE, CREATE } from '@constants';

const { Title, Text } = Typography;
export default function App() {
  const [count, setCount] = useState(1);
  const onCreate = useCallback(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: CREATE,
          payload: count,
        },
      },
      '*'
    );
  }, [count]);

  const onCancel = useCallback(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: CLOSE,
        },
      },
      '*'
    );
  }, []);

  return (
    <Space style={{ paddingLeft: 20, paddingRight: 20 }} direction="vertical">
      <Title heading={3}> Rectangle Creator </Title>
      <Space style={{ marginBottom: 20 }}>
        <Text> Count: </Text>
        <InputNumber min={0} max={100} value={count} onChange={setCount} />
      </Space>
      <Space>
        <Button type="primary" onClick={onCreate}>
          Create
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Space>
    </Space>
  );
}
