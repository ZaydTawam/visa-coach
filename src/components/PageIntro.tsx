import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  heading: string;
  marginBottom?: string;
  width?: string;
}

const PageIntro = ({
  children,
  heading,
  marginBottom = '35rem',
  width = '800px',
}: Props) => {
  return (
    <div
      style={{ width, marginBottom, marginTop: '390px' }}
      className="main-heading"
    >
      <h1 style={{ marginBottom: '61px' }}>{heading}</h1>

      <p style={{ width: '350px', color: '#FFFFFF99' }}>{children}</p>
    </div>
  );
};

export default PageIntro;
