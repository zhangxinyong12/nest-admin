import { useIntl } from '@umijs/max';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '蚂蚁集团体验技术部出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <div
      style={{
        textAlign: 'center',
        margin: '0 0 12px 0',
      }}
    >
      <a
        style={{
          color: '#000',
        }}
        target="_blank"
        rel="noreferrer"
      >
        2022 &copy; xxxxxxxxxxx
      </a>
    </div>
  );
};

export default Footer;
