import { Card, Typography, List } from 'antd';
import { ImportOutlined, UnorderedListOutlined, CheckCircleOutlined, BankOutlined, FileDoneOutlined } from '@ant-design/icons';
import LayoutContent from '../../../components/layoutContent';
import "./index.scss";

const { Title, Text } = Typography;

export default function DestinationHandling() {
  const services = [
    {
      icon: <ImportOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      title: 'Import Customs Clearance',
      description: 'Expert handling of import documentation and customs procedures'
    },
    {
      icon: <UnorderedListOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      title: 'Cargo Unloading',
      description: 'Professional unloading services with proper handling and care'
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      title: 'Inspection & Quality Check',
      description: 'Thorough inspection and verification of received goods'
    },
    {
      icon: <BankOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      title: 'Temporary Storage',
      description: 'Secure temporary storage facilities for incoming shipments'
    },
    {
      icon: <FileDoneOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      title: 'Documentation Processing',
      description: 'Complete management of arrival documentation and procedures'
    }
  ];

  return (
    <div className="destination-handling-container">
    <LayoutContent
      layoutType={1}
      content1={
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
          dataSource={services}
          renderItem={(item) => (
            <List.Item>
              <Card>
                <List.Item.Meta
                  avatar={item.icon}
                  title={<Title level={5}>{item.title}</Title>}
                  description={<Text type="secondary">{item.description}</Text>}
                />
              </Card>
            </List.Item>
          )}
        />
      }
    />
    </div>
  );
}
